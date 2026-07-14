import { db } from "@/lib/firebase"
import { ref, get } from "firebase/database"
import { ProductCard } from "@/components/product-card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getCategories } from "@/lib/categories"
import { Send } from "lucide-react"
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
    let rawProducts = Object.keys(productsVal)
        .map(key => ({
            id: key,
            ...productsVal[key]
        }))
        .filter(p => p.category !== "Cinturones")

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

    const categoriesList = await getCategories()
    const categories = categoriesList.map(c => c.name)

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

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-6 border-b border-[#DDC8A6]/20">
                <div className="space-y-1">
                    <h1 className="text-3xl sm:text-4xl font-bold font-serif tracking-tight text-[#251D13] dark:text-[#DDC8A6]">Catálogo</h1>
                    <p className="text-muted-foreground text-sm sm:text-base">Explora nuestra colección completa.</p>
                </div>
                {/* B2B Adaptability Disclaimer Banner */}
                <div className="max-w-md bg-[#F5EFE6]/50 dark:bg-[#2e261a]/30 border border-[#DDC8A6]/40 dark:border-[#57472B]/60 p-4 rounded-xl flex items-start gap-3 shadow-sm">
                    <div className="text-[#92764D] shrink-0 mt-0.5">
                        <Send className="h-4 w-4 stroke-1.5" />
                    </div>
                    <div className="text-xs sm:text-sm text-[#251D13]/85 dark:text-[#DDC8A6]/85 leading-relaxed font-sans">
                        <span className="font-bold text-[#92764D] block uppercase tracking-wider text-[10px] mb-0.5">Propuesta Empresarial</span>
                        Estos modelos son un punto de partida. Los adaptamos a los colores, medidas y logo de tu marca.
                    </div>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-8">
                {/* Sidebar Filters */}
                <aside className="w-full sm:w-64 flex-shrink-0 space-y-8">
                    <div>
                        <h2 className="font-semibold mb-4">Categorías</h2>
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
