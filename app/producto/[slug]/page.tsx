import { createClient } from "@/utils/supabase/server"
import { ProductDetail } from "@/components/product-detail"
import { notFound } from "next/navigation"
import { Metadata } from "next"
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
    const supabase = await createClient()

    const { data: product } = await supabase
        .from("products")
        .select("name, description")
        .eq("slug", slug)
        .single()

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
    const supabase = await createClient()

    // Fetch product and its variants
    const { data: product } = await supabase
        .from("products")
        .select("*")
        .eq("slug", slug)
        .single()

    if (!product) {
        notFound()
    }

    const { data: variants } = await supabase
        .from("product_variants")
        .select("*")
        .eq("product_id", product.id)
        .eq("is_active", true)

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
