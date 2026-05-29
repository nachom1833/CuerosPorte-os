import { getCategories } from "@/lib/categories"
import { CategoryManager } from "@/components/admin/category-manager"

export const revalidate = 0 // Disable cache for admin page

export default async function AdminCategoriesPage() {
    const categories = await getCategories()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Categorías</h1>
            </div>
            <CategoryManager initialCategories={categories} />
        </div>
    )
}
