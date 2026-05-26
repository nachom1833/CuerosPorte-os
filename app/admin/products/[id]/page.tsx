import { db } from "@/lib/firebase"
import { doc, getDoc, collection, query, where, orderBy, getDocs } from "firebase/firestore"
import { notFound } from "next/navigation"
import { ProductForm } from "@/components/admin/product-form"
import { VariantManager } from "@/components/admin/variant-manager"
import { Product, ProductVariant } from "@/types/database"

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    const productRef = doc(db, "products", id)
    const productSnap = await getDoc(productRef)

    if (!productSnap.exists()) notFound()

    const product = { id: productSnap.id, ...productSnap.data() } as Product

    const vQ = query(
        collection(db, "product_variants"),
        where("product_id", "==", id),
        orderBy("created_at")
    )
    const variantsSnap = await getDocs(vQ)
    const variants = variantsSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    })) as ProductVariant[]

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
