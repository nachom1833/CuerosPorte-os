import { ProductForm } from "@/components/admin/product-form"
import { getCategories } from "@/lib/categories"

export default async function NewProductPage() {
    const categories = await getCategories()

    return (
        <div className="max-w-2xl mx-auto">
            <ProductForm categories={categories} />
        </div>
    )
}
