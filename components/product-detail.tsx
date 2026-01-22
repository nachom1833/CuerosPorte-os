"use client"

import { useState } from "react"
import Image from "next/image"
import { Product, ProductVariant } from "@/types/database"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { MessageCircle } from "lucide-react"

interface ProductDetailProps {
    product: Product
    variants: ProductVariant[]
}

export function ProductDetail({ product, variants }: ProductDetailProps) {
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
        variants.find(v => v.is_active) || variants[0]
    )

    const currentImages = selectedVariant?.images?.length
        ? selectedVariant.images
        : ["/images/hero.png"] // Fallback

    const whatsappMessage = encodeURIComponent(
        `Hola, me interesa el producto: ${product.name} (Color: ${selectedVariant?.color_name || 'N/A'})`
    )
    const whatsappLink = `https://wa.me/5491112345678?text=${whatsappMessage}`

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            {/* Gallery Section */}
            <div className="space-y-4">
                <Carousel className="w-full">
                    <CarouselContent>
                        {currentImages.map((img, idx) => (
                            <CarouselItem key={idx}>
                                <div className="relative aspect-[4/5] bg-secondary/30 rounded-xl overflow-hidden">
                                    <Image
                                        src={img}
                                        alt={`${product.name} view ${idx + 1}`}
                                        fill
                                        className="object-cover"
                                        priority={idx === 0}
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    {currentImages.length > 1 && (
                        <>
                            <CarouselPrevious className="left-4" />
                            <CarouselNext className="right-4" />
                        </>
                    )}
                </Carousel>
                {/* Thumbnails */}
                {currentImages.length > 1 && (
                    <div className="flex gap-4 overflow-x-auto pb-2">
                        {currentImages.map((img, idx) => (
                            <div
                                key={idx}
                                className="relative w-20 h-24 flex-shrink-0 rounded-md overflow-hidden cursor-pointer opacity-70 hover:opacity-100 transition-opacity border border-transparent hover:border-primary"
                            >
                                <Image
                                    src={img}
                                    alt={`Thumbnail ${idx}`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Info Section */}
            <div className="flex flex-col justify-center space-y-8">
                <div>
                    <Badge variant="outline" className="mb-4">{product.category}</Badge>
                    <h1 className="text-4xl font-bold tracking-tight text-foreground">{product.name}</h1>
                    <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                        {product.description}
                    </p>
                </div>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-sm font-medium mb-3">Color</h3>
                        <div className="flex flex-wrap gap-3">
                            {variants.map((variant) => (
                                <button
                                    key={variant.id}
                                    onClick={() => setSelectedVariant(variant)}
                                    className={cn(
                                        "w-10 h-10 rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all",
                                        selectedVariant?.id === variant.id
                                            ? "border-primary scale-110"
                                            : "border-transparent hover:scale-110"
                                    )}
                                    style={{ backgroundColor: variant.color_hex }}
                                    title={variant.color_name}
                                    aria-label={`Select color ${variant.color_name}`}
                                />
                            ))}
                        </div>
                        {selectedVariant && (
                            <p className="mt-2 text-sm text-muted-foreground">
                                Seleccionado: <span className="font-medium text-foreground">{selectedVariant.color_name}</span>
                            </p>
                        )}
                    </div>

                    <div className="space-y-4 pt-6 border-t">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="block text-muted-foreground">Material</span>
                                <span className="font-medium">{product.material || "Cuero Genuino"}</span>
                            </div>
                            <div>
                                <span className="block text-muted-foreground">Dimensiones</span>
                                <span className="font-medium">{product.dimensions || "Consultar"}</span>
                            </div>
                        </div>
                    </div>

                    <Button asChild size="lg" className="w-full sm:w-auto mt-8 gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white border-none">
                        <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                            <MessageCircle className="w-5 h-5" />
                            Consultar por WhatsApp
                        </a>
                    </Button>
                </div>
            </div>
        </div>
    )
}
