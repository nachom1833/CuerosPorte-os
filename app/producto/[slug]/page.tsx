import { db } from "@/lib/firebase"
import { collection, query, where, getDocs, limit } from "firebase/firestore"
import { ProductDetail } from "@/components/product-detail"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import { Product, ProductVariant } from "@/types/database"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params

    const q = query(collection(db, "products"), where("slug", "==", slug), limit(1))
    const productsSnap = await getDocs(q)
    const productDoc = productsSnap.docs[0]
    const product = productDoc ? (productDoc.data() as Product) : null

    if (!product) {
        return {
            title: "Producto no encontrado",
        }
    }

    return {
        title: `${product.name} | Cueros Porteños`,
        description: product.description || `Detalles de ${product.name}`,
    }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    // Fetch product by slug
    const q = query(collection(db, "products"), where("slug", "==", slug), limit(1))
    const productsSnap = await getDocs(q)
    const productDoc = productsSnap.docs[0]

    if (!productDoc) {
        notFound()
    }

    const product = { id: productDoc.id, ...productDoc.data() } as Product

    // Fetch its variants
    const vQ = query(
        collection(db, "product_variants"),
        where("product_id", "==", product.id),
        where("is_active", "==", true)
    )
    const variantsSnap = await getDocs(vQ)
    const variants = variantsSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    })) as ProductVariant[]

    return (
        <div className="container px-4 sm:px-8 py-16">
            <Breadcrumb className="mb-8">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/catalogo">Catálogo</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{product.name}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <ProductDetail
                product={product}
                variants={variants || []}
            />
        </div>
    )
}
