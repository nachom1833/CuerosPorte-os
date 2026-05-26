"use server"

import { db } from "@/lib/firebase"
import { ref, get, push, set } from "firebase/database"
import { revalidatePath } from "next/cache"

interface RawImportItem {
    Nombre: string
    Slug?: string
    Categoría: string
    Material?: string
    Dimensiones?: string
    Descripción?: string
    "Color Nombre"?: string
    "Color Hex"?: string
}

export async function importBulkProducts(items: RawImportItem[]) {
    try {
        let importedCount = 0
        let variantsCreated = 0

        // 1. Obtener listados actuales de productos y variantes para validar duplicados
        const productsSnap = await get(ref(db, "products"))
        const productsVal = productsSnap.val() || {}
        
        const variantsSnap = await get(ref(db, "product_variants"))
        const variantsVal = variantsSnap.val() || {}

        for (const item of items) {
            if (!item.Nombre || !item.Categoría) {
                continue // Omitir filas sin datos obligatorios
            }

            // Autogenerar Slug si está vacío
            let slug = (item.Slug || "").trim()
            if (!slug) {
                slug = item.Nombre
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "") // Eliminar tildes/acentos
                    .replace(/[^a-z0-9 -]/g, "") // Eliminar caracteres no permitidos
                    .replace(/\s+/g, "-") // Cambiar espacios por guiones
                    .replace(/-+/g, "-") // Colapsar guiones repetidos
                    .trim()
            }

            const productData = {
                name: item.Nombre.trim(),
                slug: slug,
                category: item.Categoría.trim(),
                material: item.Material ? item.Material.trim() : null,
                dimensions: item.Dimensiones ? item.Dimensiones.trim() : null,
                description: item.Descripción ? item.Descripción.trim() : null,
            }

            // 2. Comprobar si el producto ya existe en base al slug único
            const existingProductKey = Object.keys(productsVal).find(
                key => productsVal[key].slug === slug
            )
            
            let productId = ""

            if (existingProductKey) {
                // Si existe, lo actualizamos
                productId = existingProductKey
                await set(ref(db, `products/${productId}`), {
                    ...productData,
                    created_at: productsVal[productId].created_at || new Date().toISOString()
                })
                // Actualizar caché local
                productsVal[productId] = { ...productsVal[productId], ...productData }
            } else {
                // Si no existe, creamos uno nuevo
                const newRef = push(ref(db, "products"))
                productId = newRef.key || ""
                const newProduct = {
                    ...productData,
                    created_at: new Date().toISOString(),
                }
                await set(newRef, newProduct)
                // Agregar al caché local
                productsVal[productId] = newProduct
            }

            importedCount++

            // 3. Crear variante de color inicial si contiene información válida
            const colorName = item["Color Nombre"] ? item["Color Nombre"].trim() : ""
            const colorHex = item["Color Hex"] ? item["Color Hex"].trim() : ""

            if (colorName && colorHex) {
                // Validar que no exista previamente esta variante en base al product_id y color_name
                const existingVariantKey = Object.keys(variantsVal).find(
                    key => variantsVal[key].product_id === productId && variantsVal[key].color_name === colorName
                )

                if (!existingVariantKey) {
                    const newVRef = push(ref(db, "product_variants"))
                    const variantId = newVRef.key || ""
                    const newVariant = {
                        product_id: productId,
                        color_name: colorName,
                        color_hex: colorHex,
                        images: [],
                        is_active: true,
                        created_at: new Date().toISOString(),
                    }
                    await set(newVRef, newVariant)
                    // Agregar al caché local
                    variantsVal[variantId] = newVariant
                    variantsCreated++
                }
            }
        }

        revalidatePath("/admin")
        revalidatePath("/catalogo")

        return { success: true, importedCount, variantsCreated }
    } catch (error: any) {
        console.error("Error en la importación masiva:", error)
        return { success: false, error: error.message }
    }
}
