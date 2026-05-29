import { db } from "./firebase"
import { ref, get, set } from "firebase/database"

export interface Category {
    id: string
    name: string
    slug: string
}

const DEFAULT_CATEGORIES: Omit<Category, "id">[] = [
    { name: "Bolsos", slug: "bolsos" },
    { name: "Carteras", slug: "carteras" },
    { name: "Billeteras", slug: "billeteras" },
    { name: "Accesorios", slug: "accesorios" }
]

export async function getCategories(): Promise<Category[]> {
    try {
        const categoriesRef = ref(db, "categories")
        const snapshot = await get(categoriesRef)

        if (snapshot.exists()) {
            const val = snapshot.val()
            return Object.keys(val).map(key => ({
                id: key,
                ...val[key]
            })) as Category[]
        }

        // Seeder: populate with default categories if empty
        console.log("Categories empty in Firebase. Seeding default categories...")
        const seededCategories: Category[] = []
        for (let i = 0; i < DEFAULT_CATEGORIES.length; i++) {
            const catId = `cat_${i + 1}`
            const catData = DEFAULT_CATEGORIES[i]
            await set(ref(db, `categories/${catId}`), catData)
            seededCategories.push({ id: catId, ...catData })
        }

        return seededCategories
    } catch (error) {
        console.error("Error fetching or seeding categories:", error)
        return DEFAULT_CATEGORIES.map((cat, i) => ({ id: `cat_${i + 1}`, ...cat }))
    }
}
