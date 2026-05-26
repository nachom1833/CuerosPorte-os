"use server"

import { db } from "@/lib/firebase"
import { ref, push, set, update } from "firebase/database"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

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
        const newRef = push(ref(db, "products"))
        generatedId = newRef.key || ""
        await set(newRef, {
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
        await update(ref(db, `products/${id}`), product)
    } catch (error: any) {
        return { error: error.message }
    }

    revalidatePath("/admin")
    revalidatePath("/catalogo")
    revalidatePath(`/admin/products/${id}`)
    redirect("/admin")
}
