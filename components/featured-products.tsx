import { getDb } from "@/lib/firebase"
import { ref, get } from "firebase/database"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Product, ProductVariant } from "@/types/database"

export async function FeaturedProducts() {
    // 1. Fetch products (max 4)
    const productsSnap = await get(ref(getDb(), "products"))
    const productsVal = productsSnap.val() || {}
    const products: Product[] = Object.keys(productsVal)
        .map(key => ({
            id: key,
            ...productsVal[key]
        } as Product))
        .filter(p => p.category !== "Cinturones")
        .slice(0, 4)

    // 2. Fetch active variants
    const variantsSnap = await get(ref(getDb(), "product_variants"))
    const variantsVal = variantsSnap.val() || {}
    const variants: ProductVariant[] = Object.keys(variantsVal).map(key => ({
        id: key,
        ...variantsVal[key]
    } as ProductVariant))

    // 3. Map variants to products
    const productsWithVariants = products.map(p => ({
        ...p,
        product_variants: variants.filter(v => v.product_id === p.id && v.is_active)
    })) 

    return (
        <section className="py-24 bg-background">
            <div className="container px-4 sm:px-8 mx-auto">
                {/* Centered Premium Header */}
                <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center justify-center space-y-3">
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-secondary">
                        Nuestra Selección
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-display">
                        Destacados
                    </h2>
                    <p className="text-muted-foreground text-sm sm:text-base max-w-md">
                        Piezas favoritas de nuestra colección hechas para perdurar.
                    </p>
                </div>

                {productsWithVariants && productsWithVariants.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                        {productsWithVariants.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                variant={product.product_variants?.[0]}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 border border-dashed rounded-xl">
                        <p className="text-muted-foreground">Aún no hay productos destacados.</p>
                    </div>
                )}

                {/* Unified Centered CTA Button for all screens */}
                <div className="mt-16 flex justify-center">
                    <Button 
                        asChild 
                        variant="outline" 
                        className="rounded-full px-8 py-6 border-border/60 hover:bg-secondary/10 hover:text-foreground transition-all duration-300 group shadow-sm text-sm font-semibold uppercase tracking-wider font-sans"
                    >
                        <Link href="/catalogo" className="flex items-center gap-2">
                            Ver Todo el Catálogo 
                            <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
