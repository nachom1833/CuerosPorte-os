"use server"

import { db } from "@/lib/firebase"
import { ref, push, set, update } from "firebase/database"
import { revalidatePath } from "next/cache"

function slugify(text: string): string {
    return text
        .toString()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // remove accents
        .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
        .replace(/\s+/g, "-") // collapse whitespace and replace by -
        .replace(/-+/g, "-") // collapse dashes
        .trim()
}

export async function createCategory(formData: FormData) {
    const name = (formData.get("name") as string || "").trim()
    let slug = (formData.get("slug") as string || "").trim()

    if (!name) {
        return { error: "El nombre de la categoría es requerido." }
    }

    if (!slug) {
        slug = slugify(name)
    } else {
        slug = slugify(slug)
    }

    try {
        const newRef = push(ref(db, "categories"))
        await set(newRef, {
            name,
            slug,
            created_at: new Date().toISOString()
        })
    } catch (error: any) {
        return { error: error.message }
    }

    revalidatePath("/admin/categories")
    revalidatePath("/catalogo")
    return { success: true }
}

export async function updateCategory(id: string, formData: FormData) {
    const name = (formData.get("name") as string || "").trim()
    let slug = (formData.get("slug") as string || "").trim()

    if (!name) {
        return { error: "El nombre de la categoría es requerido." }
    }

    if (!slug) {
        slug = slugify(name)
    } else {
        slug = slugify(slug)
    }

    try {
        await update(ref(db, `categories/${id}`), {
            name,
            slug,
            updated_at: new Date().toISOString()
        })
    } catch (error: any) {
        return { error: error.message }
    }

    revalidatePath("/admin/categories")
    revalidatePath("/catalogo")
    return { success: true }
}

export async function deleteCategory(id: string) {
    try {
        await set(ref(db, `categories/${id}`), null)
    } catch (error: any) {
        return { error: error.message }
    }

    revalidatePath("/admin/categories")
    revalidatePath("/catalogo")
    return { success: true }
}
