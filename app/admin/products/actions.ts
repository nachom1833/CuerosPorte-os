"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { serverDbSet, serverDbUpdate, serverDbPush } from "@/lib/db-server"

export async function createProduct(formData: FormData) {
    const product = {
        name: formData.get("name") as string,
        slug: formData.get("slug") as string,
        category: formData.get("category") as string,
        material: formData.get("material") as string,
        dimensions: formData.get("dimensions") as string,
        description: formData.get("description") as string,
    }

    let generatedId = ""

    try {
        generatedId = await serverDbPush("products", {
            ...product,
            created_at: new Date().toISOString(),
        })
    } catch (error: any) {
        return { error: error.message }
    }

    revalidatePath("/admin")
    revalidatePath("/catalogo")
    redirect(`/admin/products/${generatedId}`)
}

export async function updateProduct(id: string, formData: FormData) {
    const product = {
        name: formData.get("name") as string,
        slug: formData.get("slug") as string,
        category: formData.get("category") as string,
        material: formData.get("material") as string,
        dimensions: formData.get("dimensions") as string,
        description: formData.get("description") as string,
    }

    try {
        await serverDbUpdate(`products/${id}`, product)
    } catch (error: any) {
        return { error: error.message }
    }

    revalidatePath("/admin")
    revalidatePath("/catalogo")
    revalidatePath(`/admin/products/${id}`)
    redirect("/admin")
}

export async function addVariant(productId: string, variantData: { color_name: string, color_hex: string, images: string[] }) {
    try {
        await serverDbPush("product_variants", {
            product_id: productId,
            color_name: variantData.color_name,
            color_hex: variantData.color_hex,
            images: variantData.images,
            is_active: true,
            created_at: new Date().toISOString()
        })
        revalidatePath(`/admin/products/${productId}`)
        return { success: true }
    } catch (error: any) {
        console.error("Error adding variant:", error)
        return { error: error.message }
    }
}

export async function deleteVariant(productId: string, variantId: string) {
    try {
        await serverDbSet(`product_variants/${variantId}`, null)
        revalidatePath(`/admin/products/${productId}`)
        return { success: true }
    } catch (error: any) {
        console.error("Error deleting variant:", error)
        return { error: error.message }
    }
}

export async function updateVariantImages(productId: string, variantId: string, images: string[]) {
    try {
        await serverDbSet(`product_variants/${variantId}/images`, images)
        revalidatePath(`/admin/products/${productId}`)
        return { success: true }
    } catch (error: any) {
        console.error("Error updating variant images:", error)
        return { error: error.message }
    }
}

