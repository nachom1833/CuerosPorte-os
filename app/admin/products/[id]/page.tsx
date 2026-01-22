import { createClient } from "@/utils/supabase/server"
import { notFound } from "next/navigation"
import { ProductForm } from "@/components/admin/product-form"
import { VariantManager } from "@/components/admin/variant-manager"

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const supabase = await createClient()

    const { data: product } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single()

    if (!product) notFound()

    const { data: variants } = await supabase
        .from("product_variants")
        .select("*")
        .eq("product_id", id)
        .order("created_at")

    return (
        <div className="max-w-4xl mx-auto grid md:grid-cols-[1fr_350px] gap-6">
            <div className="space-y-6">
                <ProductForm product={product} />
            </div>
            <div>
                <VariantManager productId={product.id} variants={variants || []} />
            </div>
        </div>
    )
}
