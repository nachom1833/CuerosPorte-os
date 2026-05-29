import { db } from "@/lib/firebase"
import { ref, get } from "firebase/database"
import { notFound } from "next/navigation"
import { ProductForm } from "@/components/admin/product-form"
import { VariantManager } from "@/components/admin/variant-manager"
import { Product, ProductVariant } from "@/types/database"
import { getCategories } from "@/lib/categories"

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    const [productSnap, categories] = await Promise.all([
        get(ref(db, `products/${id}`)),
        getCategories()
    ])

    if (!productSnap.exists()) notFound()

    const product = { id: productSnap.key!, ...productSnap.val() } as Product

    const variantsSnap = await get(ref(db, "product_variants"))
    const variantsVal = variantsSnap.val() || {}
    const variants = Object.keys(variantsVal)
        .map(key => ({
            id: key,
            ...variantsVal[key]
        }))
        .filter(v => v.product_id === id)
        .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()) as ProductVariant[]

    return (
        <div className="max-w-4xl mx-auto grid md:grid-cols-[1fr_350px] gap-6">
            <div className="space-y-6">
                <ProductForm product={product} categories={categories} />
            </div>
            <div>
                <VariantManager productId={product.id} variants={variants || []} />
            </div>
        </div>
    )
}
