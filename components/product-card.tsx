import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import { Product, ProductVariant } from "@/types/database"

interface ProductCardProps {
    product: Product
    variant?: ProductVariant
}

export function ProductCard({ product, variant }: ProductCardProps) {
    // Use first image of variant or placeholder
    const imageUrl = variant?.images?.[0] || "/placeholder-bag.png" // We will need a placeholder if no image

    return (
        <Link href={`/producto/${product.slug}`} className="group">
            <Card className="h-full border-0 shadow-none bg-transparent overflow-hidden">
                <CardContent className="p-0 relative aspect-[4/5] bg-secondary/50 rounded-xl overflow-hidden mb-4">
                    {variant?.images?.[0] ? (
                        <>
                            {/* Primera imagen principal */}
                            <Image
                                src={variant.images[0]}
                                alt={product.name}
                                fill
                                className={`object-cover transition-all duration-700 ease-in-out ${
                                    variant.images[1] 
                                        ? "group-hover:opacity-0 scale-100 group-hover:scale-105" 
                                        : "group-hover:scale-105"
                                }`}
                            />
                            {/* Segunda imagen alternativa revelada al hacer hover */}
                            {variant.images[1] && (
                                <Image
                                    src={variant.images[1]}
                                    alt={`${product.name} - Vista Alternativa`}
                                    fill
                                    className="object-cover absolute inset-0 opacity-0 group-hover:opacity-100 scale-105 group-hover:scale-100 transition-all duration-700 ease-in-out"
                                />
                            )}
                        </>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                            No Image
                        </div>
                    )}
                    <div className="absolute top-4 left-4">
                        <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm text-xs font-normal">
                            {product.category}
                        </Badge>
                    </div>
                </CardContent>
                <CardFooter className="p-0 flex flex-col items-start gap-1">
                    <h3 className="font-medium text-lg leading-none group-hover:underline decoration-1 underline-offset-4">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.material}</p>
                    <div className="flex items-center text-sm font-medium mt-1 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                        Ver detalle <ArrowRight className="ml-1 h-3 w-3" />
                    </div>
                </CardFooter>
            </Card>
        </Link>
    )
}
