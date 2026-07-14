import { getDb } from "@/lib/firebase"
import { ref, get } from "firebase/database"
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

    const productsSnap = await get(ref(getDb(), "products"))
    const productsVal = productsSnap.val() || {}
    const products = Object.keys(productsVal).map(key => ({
        id: key,
        ...productsVal[key]
    })) as Product[]
    
    const product = products.find(p => p.slug === slug)

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
    const productsSnap = await get(ref(getDb(), "products"))
    const productsVal = productsSnap.val() || {}
    const products = Object.keys(productsVal).map(key => ({
        id: key,
        ...productsVal[key]
    })) as Product[]
    
    const product = products.find(p => p.slug === slug)

    if (!product) {
        notFound()
    }

    // Fetch its variants
    const variantsSnap = await get(ref(getDb(), "product_variants"))
    const variantsVal = variantsSnap.val() || {}
    const variants = Object.keys(variantsVal)
        .map(key => ({
            id: key,
            ...variantsVal[key]
        }))
        .filter(v => v.product_id === product.id && v.is_active) as ProductVariant[]

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
