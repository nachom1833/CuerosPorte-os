"use server"

import { getDb } from "@/lib/firebase"
import { ref, get, push, set } from "firebase/database"
import { revalidatePath } from "next/cache"
import fs from "fs"
import path from "path"

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

function normalizeString(str: string): string {
    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Eliminar acentos
        .replace(/[^a-z0-9]/g, " ")     // Mantener solo alfanuméricos, cambiar otros por espacios
        .replace(/\s+/g, " ")           // Colapsar espacios consecutivos
        .trim();
}

function findMatchingImages(productName: string, availableFiles: string[]): string[] {
    const normProdName = normalizeString(productName);
    if (!normProdName) return [];

    const exactMatches: string[] = [];
    const prefixMatches: string[] = [];

    for (const file of availableFiles) {
        if (file.startsWith(".")) continue;

        const ext = path.extname(file).toLowerCase();
        // Solo permitir formatos de imagen comunes
        if (![".jpg", ".jpeg", ".png", ".webp", ".gif"].includes(ext)) continue;

        const nameWithoutExt = path.basename(file, ext);
        // Eliminar sufijos numéricos con paréntesis tipo (1), (2), etc. y recortar espacios
        const baseNoSuffix = nameWithoutExt.replace(/\s*\(\d+\)\s*$/, "").trim();
        const normFileBase = normalizeString(baseNoSuffix);

        if (normFileBase === normProdName) {
            exactMatches.push(`/images/products/${file}`);
        } else if (normFileBase.startsWith(normProdName)) {
            prefixMatches.push(`/images/products/${file}`);
        }
    }

    if (exactMatches.length > 0) {
        return exactMatches.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
    }

    return prefixMatches.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
}

export async function importBulkProducts(items: RawImportItem[]) {
    try {
        let importedCount = 0
        let variantsCreated = 0

        // Escanear el directorio local public/images/products
        let availableFiles: string[] = []
        try {
            const productsDir = path.join(process.cwd(), "public", "images", "products")
            if (fs.existsSync(productsDir)) {
                availableFiles = fs.readdirSync(productsDir)
            } else {
                console.warn(`El directorio de imágenes no existe en: ${productsDir}`)
            }
        } catch (e) {
            console.error("Error al leer el directorio de imágenes:", e)
        }

        // 1. Obtener listados actuales de productos y variantes para validar duplicados
        const productsSnap = await get(ref(getDb(), "products"))
        const productsVal = productsSnap.val() || {}
        
        const variantsSnap = await get(ref(getDb(), "product_variants"))
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
                await set(ref(getDb(), `products/${productId}`), {
                    ...productData,
                    created_at: productsVal[productId].created_at || new Date().toISOString()
                })
                // Actualizar caché local
                productsVal[productId] = { ...productsVal[productId], ...productData }
            } else {
                // Si no existe, creamos uno nuevo
                const newRef = push(ref(getDb(), "products"))
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

            // 3. Crear o actualizar variante de color si contiene información válida
            const colorName = item["Color Nombre"] ? item["Color Nombre"].trim() : ""
            const colorHex = item["Color Hex"] ? item["Color Hex"].trim() : ""

            if (colorName && colorHex) {
                // Validar si ya existe previamente esta variante
                const existingVariantKey = Object.keys(variantsVal).find(
                    key => variantsVal[key].product_id === productId && variantsVal[key].color_name === colorName
                )

                // Encontrar imágenes locales usando coincidencia por nombre
                const matchedImages = findMatchingImages(item.Nombre, availableFiles)

                if (!existingVariantKey) {
                    const newVRef = push(ref(getDb(), "product_variants"))
                    const variantId = newVRef.key || ""
                    const newVariant = {
                        product_id: productId,
                        color_name: colorName,
                        color_hex: colorHex,
                        images: matchedImages,
                        is_active: true,
                        created_at: new Date().toISOString(),
                    }
                    await set(newVRef, newVariant)
                    // Agregar al caché local
                    variantsVal[variantId] = newVariant
                    variantsCreated++
                } else {
                    // Si ya existe pero no tiene imágenes asociadas, asignarle las imágenes detectadas
                    const existingVariant = variantsVal[existingVariantKey]
                    if (!existingVariant.images || existingVariant.images.length === 0) {
                        await set(ref(getDb(), `product_variants/${existingVariantKey}/images`), matchedImages)
                        existingVariant.images = matchedImages
                    }
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
