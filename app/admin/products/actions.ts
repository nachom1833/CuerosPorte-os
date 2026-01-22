"use server"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createProduct(formData: FormData) {
    const supabase = await createClient()

    const product = {
        name: formData.get("name") as string,
        slug: formData.get("slug") as string,
        category: formData.get("category") as string,
        material: formData.get("material") as string,
        dimensions: formData.get("dimensions") as string,
        description: formData.get("description") as string,
    }

    const { data, error } = await supabase.from("products").insert(product).select().single()

    if (error) {
        return { error: error.message }
    }

    revalidatePath("/admin")
    revalidatePath("/catalogo")
    redirect(`/admin/products/${data.id}`)
}

export async function updateProduct(id: string, formData: FormData) {
    const supabase = await createClient()

    const product = {
        name: formData.get("name") as string,
        slug: formData.get("slug") as string,
        category: formData.get("category") as string,
        material: formData.get("material") as string,
        dimensions: formData.get("dimensions") as string,
        description: formData.get("description") as string,
    }

    const { error } = await supabase.from("products").update(product).eq("id", id)

    if (error) {
        return { error: error.message }
    }

    revalidatePath("/admin")
    revalidatePath("/catalogo")
    revalidatePath(`/admin/products/${id}`)
    redirect("/admin")
}
