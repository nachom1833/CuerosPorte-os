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

export function getProductVariantImages(variant?: any): string[] {
    if (!variant) return [];

    const list: string[] = [];

    // 1. Check if "images" array or string exists
    if (variant.images) {
        if (Array.isArray(variant.images)) {
            list.push(...variant.images);
        } else if (typeof variant.images === "string") {
            list.push(variant.images);
        }
    }

    // 2. Check if singular "image" string exists
    if (variant.image && typeof variant.image === "string") {
        list.push(variant.image);
    }

    // 3. For each image, if it's just a raw filename (e.g. "billetera.jpeg"), prepend "/images/products/"
    return list
        .map(img => {
            const trimmed = img.trim();
            if (!trimmed) return "";
            if (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("/")) {
                return trimmed;
            }
            return `/images/products/${trimmed}`;
        })
        .filter(img => img.length > 0);
}

export function ProductCard({ product, variant }: ProductCardProps) {
    const images = getProductVariantImages(variant)

    return (
        <Link href={`/producto/${product.slug}`} className="group">
            <Card className="h-full border-0 shadow-none bg-transparent overflow-hidden">
                <CardContent className="p-0 relative aspect-[4/5] bg-secondary/50 rounded-xl overflow-hidden mb-4">
                    {images[0] ? (
                        <>
                            {/* Primera imagen principal */}
                            <Image
                                src={images[0]}
                                alt={product.name}
                                fill
                                className={`object-cover transition-all duration-700 ease-in-out ${
                                    images[1] 
                                        ? "group-hover:opacity-0 scale-100 group-hover:scale-105" 
                                        : "group-hover:scale-105"
                                }`}
                            />
                            {/* Segunda imagen alternativa revelada al hacer hover */}
                            {images[1] && (
                                <Image
                                    src={images[1]}
                                    alt={`${product.name} - Vista Alternativa`}
                                    fill
                                    className="object-cover absolute inset-0 opacity-0 group-hover:opacity-100 scale-105 group-hover:scale-100 transition-all duration-700 ease-in-out"
                                />
                            )}
                        </>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-secondary/30">
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
