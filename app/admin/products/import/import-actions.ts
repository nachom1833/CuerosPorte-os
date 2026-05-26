"use server"

import { db } from "@/lib/firebase"
import { collection, addDoc, doc, updateDoc, getDocs, query, where, limit } from "firebase/firestore"
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

        for (const item of items) {
            if (!item.Nombre || !item.Categoría) {
                continue // Omitir filas sin datos obligatorios
            }

            // 1. Autogenerar Slug si está vacío
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
            const q = query(collection(db, "products"), where("slug", "==", slug), limit(1))
            const existingSnap = await getDocs(q)
            
            let productId = ""

            if (!existingSnap.empty) {
                // Si existe, lo actualizamos
                const existingDoc = existingSnap.docs[0]
                productId = existingDoc.id
                await updateDoc(doc(db, "products", productId), productData)
            } else {
                // Si no existe, creamos uno nuevo
                const docRef = await addDoc(collection(db, "products"), {
                    ...productData,
                    created_at: new Date().toISOString(),
                })
                productId = docRef.id
            }

            importedCount++

            // 3. Crear variante de color inicial si contiene información válida
            const colorName = item["Color Nombre"] ? item["Color Nombre"].trim() : ""
            const colorHex = item["Color Hex"] ? item["Color Hex"].trim() : ""

            if (colorName && colorHex) {
                // Validar que no exista previamente esta variante
                const vQ = query(
                    collection(db, "product_variants"),
                    where("product_id", "==", productId),
                    where("color_name", "==", colorName),
                    limit(1)
                )
                const existingVSnap = await getDocs(vQ)

                if (existingVSnap.empty) {
                    await addDoc(collection(db, "product_variants"), {
                        product_id: productId,
                        color_name: colorName,
                        color_hex: colorHex,
                        images: [],
                        is_active: true,
                        created_at: new Date().toISOString(),
                    })
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
