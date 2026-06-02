"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { Product, ProductVariant } from "@/types/database"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { MessageCircle, ChevronLeft, ChevronRight, Send, X, Check, Loader2, UploadCloud, File } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { getProductVariantImages } from "@/components/product-card"
import { toast } from "sonner"

interface ProductDetailProps {
    product: Product
    variants: ProductVariant[]
}

export function ProductDetail({ product, variants }: ProductDetailProps) {
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
        variants.find(v => v.is_active) || variants[0]
    )
    const [activeIdx, setActiveIdx] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false)

    // Modal Form States
    const [modalName, setModalName] = useState("")
    const [modalCompany, setModalCompany] = useState("")
    const [modalEmail, setModalEmail] = useState("")
    const [modalPhone, setModalPhone] = useState("")
    const [modalQuantity, setModalQuantity] = useState("200")
    const [modalMessage, setModalMessage] = useState(
        `Hola, me interesa solicitar una cotización por un desarrollo similar al modelo "${product.name}"${selectedVariant ? ` en color ${selectedVariant.color_name}` : ""}.`
    )
    const [modalFiles, setModalFiles] = useState<File[]>([])
    const [modalDragOver, setModalDragOver] = useState(false)
    const [modalSubmitting, setModalSubmitting] = useState(false)
    const [modalSuccess, setModalSuccess] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const images = getProductVariantImages(selectedVariant)
    const currentImages = images.length
        ? images
        : ["/images/hero.png"] // Fallback

    const handlePrev = () => {
        setActiveIdx((prev) => (prev === 0 ? currentImages.length - 1 : prev - 1))
    }

    const handleNext = () => {
        setActiveIdx((prev) => (prev === currentImages.length - 1 ? 0 : prev + 1))
    }

    const whatsappMessage = encodeURIComponent(
        `Hola Cueros Porteños. Me interesa realizar una consulta corporativa para un desarrollo a medida inspirado en el producto: ${product.name} (Color: ${selectedVariant?.color_name || 'N/A'}).`
    )
    const whatsappLink = `https://wa.me/541140240594?text=${whatsappMessage}`

    // Modal Handlers
    const handleOpenModal = () => {
        setModalMessage(
            `Hola, me interesa solicitar una cotización por un desarrollo similar al modelo "${product.name}"${selectedVariant ? ` en color ${selectedVariant.color_name}` : ""}.`
        )
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setModalSuccess(false)
    }

    const handleModalSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!modalName || !modalCompany || !modalEmail || !modalPhone || !modalQuantity || !modalMessage) {
            toast.error("Por favor completa los campos requeridos.")
            return
        }

        setModalSubmitting(true)
        await new Promise(resolve => setTimeout(resolve, 1500))
        setModalSubmitting(false)
        setModalSuccess(true)
        toast.success(`¡Consulta enviada para el desarrollo ${product.name}!`)

        // Reset
        setModalName("")
        setModalCompany("")
        setModalEmail("")
        setModalPhone("")
        setModalFiles([])
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setModalDragOver(true)
    }

    const handleDragLeave = () => {
        setModalDragOver(false)
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setModalDragOver(false)
        if (e.dataTransfer.files) {
            const newFiles = Array.from(e.dataTransfer.files)
            setModalFiles(prev => [...prev, ...newFiles])
        }
    }

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files)
            setModalFiles(prev => [...prev, ...newFiles])
        }
    }

    const removeFile = (index: number) => {
        setModalFiles(prev => prev.filter((_, idx) => idx !== index))
    }

    const formatBytes = (bytes: number, decimals = 2) => {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const dm = decimals < 0 ? 0 : decimals
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
    }

    return (
        <div className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                {/* Gallery Section */}
                <div className="space-y-4">
                    <div className="relative aspect-[4/5] bg-[#F5EFE6] border border-[#DDC8A6]/40 rounded-2xl overflow-hidden group">
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

                        {/* Navigation Arrows */}
                        {currentImages.length > 1 && (
                            <>
                                <button
                                    onClick={handlePrev}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm border flex items-center justify-center shadow-md hover:bg-background transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 z-10 cursor-pointer border-[#DDC8A6]/30 text-[#251D13]"
                                    aria-label="Anterior imagen"
                                >
                                    <ChevronLeft className="w-5 h-5 text-foreground" />
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm border flex items-center justify-center shadow-md hover:bg-background transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 z-10 cursor-pointer border-[#DDC8A6]/30 text-[#251D13]"
                                    aria-label="Siguiente imagen"
                                >
                                    <ChevronRight className="w-5 h-5 text-foreground" />
                                </button>
                            </>
                        )}

                        {/* Image dots */}
                        {currentImages.length > 1 && (
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 bg-background/80 backdrop-blur-sm px-2.5 py-1.5 rounded-full z-10 border border-[#DDC8A6]/30">
                                {currentImages.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveIdx(idx)}
                                        className={cn(
                                            "w-2 h-2 rounded-full transition-all duration-300 cursor-pointer",
                                            activeIdx === idx 
                                                ? "bg-[#251D13] w-4" 
                                                : "bg-[#251D13]/40 hover:bg-[#251D13]/60"
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
                                        "relative w-20 h-24 flex-shrink-0 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 border-2",
                                        activeIdx === idx
                                            ? "border-[#92764D] scale-[1.03] shadow-sm opacity-100"
                                            : "border-[#DDC8A6]/60 opacity-60 hover:opacity-100 hover:scale-[1.02]"
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
                        <Badge variant="outline" className="mb-4 text-xs font-bold uppercase tracking-wider rounded-md text-[#92764D] border-[#DDC8A6]/60 bg-[#F5EFE6]/50">
                            {product.category}
                        </Badge>
                        <h1 className="text-4xl font-bold font-serif tracking-tight text-[#251D13]">{product.name}</h1>
                        <p className="mt-4 text-base text-[#251D13]/70 leading-relaxed font-sans">
                            {product.description}
                        </p>
                    </div>

                    {/* B2B Adaptability Disclaimer Banner */}
                    <div className="bg-[#F5EFE6]/50 border border-[#DDC8A6]/40 p-4 sm:p-5 rounded-2xl flex items-start gap-3">
                        <div className="text-[#92764D] shrink-0 mt-0.5">
                            <Send className="h-4 w-4 stroke-1.5" />
                        </div>
                        <p className="text-sm text-[#251D13]/85 leading-relaxed font-sans">
                            Este modelo es un punto de partida. Lo adaptamos a los colores, medidas y logo de tu marca.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-wider text-[#92764D] mb-3 font-sans">Colores Ilustrativos</h3>
                            <div className="flex flex-wrap gap-3">
                                {variants.map((variant) => (
                                    <button
                                        key={variant.id}
                                        onClick={() => {
                                            setSelectedVariant(variant)
                                            setActiveIdx(0)
                                        }}
                                        className={cn(
                                            "w-9 h-9 rounded-full border-2 focus:outline-none focus:ring-1 focus:ring-[#92764D] focus:ring-offset-2 transition-all cursor-pointer",
                                            selectedVariant?.id === variant.id
                                                ? "border-[#251D13] scale-110 shadow-sm"
                                                : "border-transparent hover:scale-110"
                                        )}
                                        style={{ backgroundColor: variant.color_hex }}
                                        title={variant.color_name}
                                        aria-label={`Select color ${variant.color_name}`}
                                    />
                                ))}
                            </div>
                            {selectedVariant && (
                                <p className="mt-2.5 text-xs text-[#251D13]/70">
                                    Ejemplo en: <span className="font-semibold text-[#251D13]">{selectedVariant.color_name}</span>
                                </p>
                            )}
                        </div>

                        <div className="space-y-4 pt-6 border-t border-[#DDC8A6]/40">
                            <div className="grid grid-cols-2 gap-4 text-xs font-sans">
                                <div>
                                    <span className="block text-[#92764D] uppercase tracking-wider font-bold mb-0.5">Material Base</span>
                                    <span className="font-bold text-sm text-[#251D13]">{product.material || "Cuero Genuino Argentino"}</span>
                                </div>
                                <div>
                                    <span className="block text-[#92764D] uppercase tracking-wider font-bold mb-0.5">Dimensiones Originales</span>
                                    <span className="font-bold text-sm text-[#251D13]">{product.dimensions || "100% Personalizable"}</span>
                                </div>
                            </div>
                        </div>

                        {/* CTA Conversion Block */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-[#DDC8A6]/40">
                            <Button 
                                onClick={handleOpenModal}
                                size="lg" 
                                className="flex-1 rounded-full bg-[#251D13] text-[#DDC8A6] hover:bg-[#251D13]/90 hover:text-white font-bold uppercase tracking-wider text-xs py-6 cursor-pointer transition-all shadow-md border-none"
                            >
                                Consultar por este desarrollo
                            </Button>
                            <Button 
                                asChild
                                variant="outline"
                                size="lg" 
                                className="rounded-full border-[#251D13] text-[#251D13] hover:bg-[#DDC8A6]/20 font-bold uppercase tracking-wider text-xs py-6 cursor-pointer flex items-center justify-center gap-2"
                            >
                                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                                    <MessageCircle className="w-4 h-4" />
                                    Consultar por WhatsApp
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* B2B Consultation Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        {/* Overlay backdrop */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleCloseModal}
                            className="absolute inset-0 bg-[#251D13]/40 backdrop-blur-md cursor-pointer"
                        />

                        {/* Modal Container */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="relative w-full max-w-xl bg-[#FBF8F3] border border-[#DDC8A6]/40 rounded-2xl shadow-2xl p-6 sm:p-8 overflow-y-auto max-h-[90vh] z-10"
                        >
                            {/* Close button */}
                            <button 
                                onClick={handleCloseModal}
                                className="absolute right-4 top-4 text-[#92764D] hover:text-[#251D13] p-1 transition-colors cursor-pointer"
                                aria-label="Cerrar modal"
                            >
                                <X className="h-5 w-5" />
                            </button>

                            <div className="mb-6 space-y-1">
                                <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-[#92764D]">Cotización B2B</span>
                                <h2 className="text-xl font-bold font-serif text-[#251D13]">
                                    Consultar Desarrollo: <span className="text-[#92764D]">{product.name}</span>
                                </h2>
                                <p className="text-xs text-[#251D13]/70 leading-relaxed font-sans">
                                    Déjanos los requerimientos preliminares del proyecto y te cotizaremos un modelo adaptado a tus necesidades corporativas.
                                </p>
                            </div>

                            <AnimatePresence mode="wait">
                                {!modalSuccess ? (
                                    <motion.form 
                                        key="modalForm"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onSubmit={handleModalSubmit}
                                        className="space-y-4 font-sans"
                                    >
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <Label htmlFor="modalName" className="text-[10px] font-bold uppercase tracking-wider text-[#251D13]/80">Nombre de Contacto *</Label>
                                                <Input 
                                                    id="modalName"
                                                    type="text"
                                                    required
                                                    placeholder="Ej. Juan Pérez"
                                                    value={modalName}
                                                    onChange={e => setModalName(e.target.value)}
                                                    className="rounded-lg border-[#DDC8A6] focus:border-[#92764D] text-xs focus:ring-1 focus:ring-[#92764D]"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <Label htmlFor="modalCompany" className="text-[10px] font-bold uppercase tracking-wider text-[#251D13]/80">Empresa *</Label>
                                                <Input 
                                                    id="modalCompany"
                                                    type="text"
                                                    required
                                                    placeholder="Ej. Valois Group"
                                                    value={modalCompany}
                                                    onChange={e => setModalCompany(e.target.value)}
                                                    className="rounded-lg border-[#DDC8A6] focus:border-[#92764D] text-xs focus:ring-1 focus:ring-[#92764D]"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <Label htmlFor="modalEmail" className="text-[10px] font-bold uppercase tracking-wider text-[#251D13]/80">Email Corporativo *</Label>
                                                <Input 
                                                    id="modalEmail"
                                                    type="email"
                                                    required
                                                    placeholder="ejemplo@empresa.com"
                                                    value={modalEmail}
                                                    onChange={e => setModalEmail(e.target.value)}
                                                    className="rounded-lg border-[#DDC8A6] focus:border-[#92764D] text-xs focus:ring-1 focus:ring-[#92764D]"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <Label htmlFor="modalPhone" className="text-[10px] font-bold uppercase tracking-wider text-[#251D13]/80">Teléfono de Contacto *</Label>
                                                <Input 
                                                    id="modalPhone"
                                                    type="tel"
                                                    required
                                                    placeholder="Ej. +54 11 1234 5678"
                                                    value={modalPhone}
                                                    onChange={e => setModalPhone(e.target.value)}
                                                    className="rounded-lg border-[#DDC8A6] focus:border-[#92764D] text-xs focus:ring-1 focus:ring-[#92764D]"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <Label htmlFor="modalQuantity" className="text-[10px] font-bold uppercase tracking-wider text-[#251D13]/80">Cantidad Estimada de Unidades *</Label>
                                            <Input 
                                                id="modalQuantity"
                                                type="number"
                                                required
                                                min="1"
                                                placeholder="Ej. 200"
                                                value={modalQuantity}
                                                onChange={e => setModalQuantity(e.target.value)}
                                                className="rounded-lg border-[#DDC8A6] focus:border-[#92764D] text-xs focus:ring-1 focus:ring-[#92764D]"
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <Label htmlFor="modalMessage" className="text-[10px] font-bold uppercase tracking-wider text-[#251D13]/80">Especificaciones del Proyecto</Label>
                                            <Textarea 
                                                id="modalMessage"
                                                rows={3}
                                                required
                                                placeholder="Ej. Colores específicos, tamaño modificado, estampado de logo corporativo en bajo relieve..."
                                                value={modalMessage}
                                                onChange={e => setModalMessage(e.target.value)}
                                                className="rounded-lg border-[#DDC8A6] focus:border-[#92764D] text-xs focus:ring-1 focus:ring-[#92764D] resize-none"
                                            />
                                        </div>

                                        {/* Modal File Upload Drag & Drop */}
                                        <div className="space-y-1">
                                            <Label className="text-[10px] font-bold uppercase tracking-wider text-[#251D13]/80">Manual de Marca o Logotipos (Opcional)</Label>
                                            <div 
                                                onDragOver={handleDragOver}
                                                onDragLeave={handleDragLeave}
                                                onDrop={handleDrop}
                                                onClick={() => fileInputRef.current?.click()}
                                                className={cn(
                                                    "border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors duration-200 flex flex-col items-center justify-center space-y-1 bg-[#F5EFE6]/30",
                                                    modalDragOver ? "border-[#251D13] bg-[#DDC8A6]/20" : "border-[#DDC8A6] hover:border-[#92764D]"
                                                )}
                                            >
                                                <input 
                                                    type="file"
                                                    ref={fileInputRef}
                                                    onChange={handleFileSelect}
                                                    multiple
                                                    className="hidden"
                                                    accept=".pdf,.png,.jpg,.jpeg,.svg,.ai,.eps,.zip"
                                                />
                                                <UploadCloud className="h-5 w-5 text-[#92764D]" />
                                                <p className="text-[11px] font-bold text-[#251D13]">Arrastra logos o haz clic para subir</p>
                                            </div>

                                            {/* File List */}
                                            {modalFiles.length > 0 && (
                                                <div className="pt-2 space-y-1 max-h-24 overflow-y-auto pr-1">
                                                    {modalFiles.map((file, idx) => (
                                                        <div key={idx} className="flex items-center justify-between p-1.5 bg-[#F5EFE6]/50 border border-[#DDC8A6]/30 rounded-lg text-[10px]">
                                                            <div className="flex items-center gap-1.5 truncate max-w-[85%] text-[#251D13]">
                                                                <File className="h-3 w-3 shrink-0 text-[#92764D]" />
                                                                <span className="truncate font-semibold">{file.name}</span>
                                                                <span className="text-[9px] text-[#251D13]/60 shrink-0">({formatBytes(file.size)})</span>
                                                            </div>
                                                            <button 
                                                                type="button"
                                                                onClick={(e) => {
                                                                    e.stopPropagation()
                                                                    removeFile(idx)
                                                                }}
                                                                className="text-[#92764D] hover:text-[#251D13] p-0.5 cursor-pointer"
                                                            >
                                                                <X className="h-3 w-3" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <Button 
                                            type="submit"
                                            disabled={modalSubmitting}
                                            className="w-full rounded-full bg-[#251D13] text-[#DDC8A6] hover:bg-[#251D13]/90 hover:text-white text-xs font-bold uppercase tracking-wider py-5 cursor-pointer flex items-center justify-center gap-2 border-none"
                                        >
                                            {modalSubmitting ? (
                                                <>
                                                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                                    Enviando Consulta...
                                                </>
                                            ) : (
                                                "Enviar Solicitud de Cotización"
                                            )}
                                        </Button>
                                    </motion.form>
                                ) : (
                                    <motion.div 
                                        key="modalSuccess"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="py-10 text-center flex flex-col items-center justify-center space-y-4"
                                    >
                                        <div className="h-14 w-14 rounded-full bg-[#F5EFE6] text-[#92764D] border border-[#DDC8A6]/20 flex items-center justify-center">
                                            <Check className="h-7 w-7" />
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="font-bold font-serif text-lg text-[#251D13]">¡Solicitud Enviada!</h3>
                                            <p className="text-xs text-[#251D13]/70 max-w-sm leading-relaxed font-sans">
                                                Tu consulta para cotizar un modelo similar a "{product.name}" ha sido recibida. Analizaremos los plazos y la cantidad requerida ({modalQuantity} unidades) y te responderemos por correo electrónico con una propuesta técnico-comercial.
                                            </p>
                                        </div>
                                        <Button 
                                            onClick={handleCloseModal}
                                            className="rounded-full px-6 py-4 cursor-pointer mt-4"
                                        >
                                            Cerrar
                                        </Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}
