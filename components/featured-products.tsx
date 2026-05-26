import { db } from "@/lib/firebase"
import { collection, query, limit, getDocs } from "firebase/firestore"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Product, ProductVariant } from "@/types/database"

export async function FeaturedProducts() {
    // 1. Fetch products (max 4)
    const productsSnap = await getDocs(query(collection(db, "products"), limit(4)))
    const products: Product[] = productsSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    } as Product))

    // 2. Fetch active variants
    const variantsSnap = await getDocs(collection(db, "product_variants"))
    const variants: ProductVariant[] = variantsSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    } as ProductVariant))

    // 3. Map variants to products
    const productsWithVariants = products.map(p => ({
        ...p,
        product_variants: variants.filter(v => v.product_id === p.id && v.is_active)
    })) 

    return (
        <section className="py-24 bg-background">
            <div className="container px-4 sm:px-8">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight mb-2">Destacados</h2>
                        <p className="text-muted-foreground">Piezas favoritas de nuestra colección.</p>
                    </div>
                    <Button variant="ghost" asChild className="hidden sm:inline-flex group">
                        <Link href="/catalogo">
                            Ver todo <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                    </Button>
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

                <div className="mt-12 text-center sm:hidden">
                    <Button variant="outline" asChild className="w-full">
                        <Link href="/catalogo">Ver Todo el Catálogo</Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
