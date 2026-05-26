"use client"

import { useState } from "react"
import Image from "next/image"
import { Product, ProductVariant } from "@/types/database"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { MessageCircle, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface ProductDetailProps {
    product: Product
    variants: ProductVariant[]
}

export function ProductDetail({ product, variants }: ProductDetailProps) {
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
        variants.find(v => v.is_active) || variants[0]
    )
    const [activeIdx, setActiveIdx] = useState(0)

    const currentImages = selectedVariant?.images?.length
        ? selectedVariant.images
        : ["/images/hero.png"] // Fallback

    const handlePrev = () => {
        setActiveIdx((prev) => (prev === 0 ? currentImages.length - 1 : prev - 1))
    }

    const handleNext = () => {
        setActiveIdx((prev) => (prev === currentImages.length - 1 ? 0 : prev + 1))
    }

    const whatsappMessage = encodeURIComponent(
        `Hola, me interesa el producto: ${product.name} (Color: ${selectedVariant?.color_name || 'N/A'})`
    )
    const whatsappLink = `https://wa.me/+541140240594?text=${whatsappMessage}`

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            {/* Gallery Section */}
            <div className="space-y-4">
                <div className="relative aspect-[4/5] bg-secondary/30 rounded-xl overflow-hidden group">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIdx}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="absolute inset-0 w-full h-full"
                        >
                            <Image
                                src={currentImages[activeIdx]}
                                alt={`${product.name} vista ${activeIdx + 1}`}
                                fill
                                className="object-cover"
                                priority
                            />
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Arrows (Visible on hover inside the main container) */}
                    {currentImages.length > 1 && (
                        <>
                            <button
                                onClick={handlePrev}
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border flex items-center justify-center shadow-md hover:bg-background transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 z-10 cursor-pointer"
                                aria-label="Anterior imagen"
                            >
                                <ChevronLeft className="w-5 h-5 text-foreground" />
                            </button>
                            <button
                                onClick={handleNext}
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border flex items-center justify-center shadow-md hover:bg-background transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 z-10 cursor-pointer"
                                aria-label="Siguiente imagen"
                            >
                                <ChevronRight className="w-5 h-5 text-foreground" />
                            </button>
                        </>
                    )}

                    {/* Image indicator dots (pill slider animation) */}
                    {currentImages.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 bg-background/30 backdrop-blur-sm px-2.5 py-1.5 rounded-full z-10">
                            {currentImages.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveIdx(idx)}
                                    className={cn(
                                        "w-2 h-2 rounded-full transition-all duration-300 cursor-pointer",
                                        activeIdx === idx 
                                            ? "bg-foreground w-4" 
                                            : "bg-foreground/40 hover:bg-foreground/60"
                                    )}
                                    aria-label={`Ir a imagen ${idx + 1}`}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Thumbnails */}
                {currentImages.length > 1 && (
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-muted">
                        {currentImages.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveIdx(idx)}
                                className={cn(
                                    "relative w-20 h-24 flex-shrink-0 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 border-2",
                                    activeIdx === idx
                                        ? "border-primary scale-[1.03] shadow-md opacity-100"
                                        : "border-transparent opacity-60 hover:opacity-100 hover:scale-[1.02]"
                                )}
                            >
                                <Image
                                    src={img}
                                    alt={`Miniatura ${idx + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </button>
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
                                    onClick={() => {
                                        setSelectedVariant(variant)
                                        setActiveIdx(0)
                                    }}
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
