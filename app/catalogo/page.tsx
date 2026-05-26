import { db } from "@/lib/firebase"
import { ref, get } from "firebase/database"
import { ProductCard } from "@/components/product-card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default async function CatalogPage({
    searchParams
}: {
    searchParams: Promise<{ category?: string }>
}) {
    const params = await searchParams; // Await params in Next.js 15
    const category = params.category;

    const productsSnap = await get(ref(db, "products"))
    const productsVal = productsSnap.val() || {}
    let rawProducts = Object.keys(productsVal).map(key => ({
        id: key,
        ...productsVal[key]
    }))

    if (category) {
        rawProducts = rawProducts.filter(p => p.category === category)
    }

    const variantsSnap = await get(ref(db, "product_variants"))
    const variantsVal = variantsSnap.val() || {}
    const rawVariants = Object.keys(variantsVal).map(key => ({
        id: key,
        ...variantsVal[key]
    })) as any[]

    const products = rawProducts.map(p => ({
        ...p,
        product_variants: rawVariants.filter(v => v.product_id === p.id && v.is_active)
    })) as any[]

    const categories = ["Bolsos", "Carteras", "Cinturones", "Billeteras", "Accesorios"]

    return (
        <div className="container px-4 sm:px-8 py-12">
            <Breadcrumb className="mb-6">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Catálogo</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="flex flex-col gap-4 mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Catálogo</h1>
                <p className="text-muted-foreground">Explora nuestra colección completa.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-8">
                {/* Sidebar Filters */}
                <aside className="w-full sm:w-64 flex-shrink-0 space-y-8">
                    <div>
                        <h3 className="font-semibold mb-4">Categorías</h3>
                        <div className="flex flex-wrap sm:flex-col gap-2">
                            <Button
                                asChild
                                variant={!category ? "secondary" : "ghost"}
                                className="justify-start w-full sm:w-auto"
                            >
                                <Link href="/catalogo">Todos</Link>
                            </Button>
                            {categories.map((c) => (
                                <Button
                                    key={c}
                                    asChild
                                    variant={category === c ? "secondary" : "ghost"}
                                    className="justify-start w-full sm:w-auto"
                                >
                                    <Link href={`/catalogo?category=${c}`}>{c}</Link>
                                </Button>
                            ))}
                        </div>
                    </div>
                    <Separator className="hidden sm:block" />
                </aside>

                {/* Product Grid */}
                <div className="flex-1">
                    {products && products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                            {products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    variant={product.product_variants?.[0]}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center border rounded-xl bg-secondary/20">
                            <p className="text-muted-foreground">No se encontraron productos en esta categoría.</p>
                            {category && (
                                <Button variant="link" asChild className="mt-2">
                                    <Link href="/catalogo">Ver todos los productos</Link>
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
