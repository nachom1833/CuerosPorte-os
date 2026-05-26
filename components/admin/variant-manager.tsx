"use client"

import { useState } from "react"
import type { ProductVariant } from "@/types/database"
import { db, storage } from "@/lib/firebase"
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage"
import { ref as dbRef, push, set } from "firebase/database"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Plus, Image as ImageIcon, X, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import Image from "next/image"

interface VariantManagerProps {
    productId: string
    variants: ProductVariant[]
}

export function VariantManager({ productId, variants }: VariantManagerProps) {
    const router = useRouter()
    const [isUploading, setIsUploading] = useState(false)
    const [uploadingVariantId, setUploadingVariantId] = useState<string | null>(null)

    // New Variant State
    const [colorName, setColorName] = useState("")
    const [colorHex, setColorHex] = useState("#000000")
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)

    async function handleAddVariant() {
        setIsUploading(true)
        const imageUrls: string[] = []

        try {
            // 1. Upload Images
            if (selectedFiles) {
                for (let i = 0; i < selectedFiles.length; i++) {
                    const file = selectedFiles[i]
                    const fileExt = file.name.split('.').pop()
                    const fileName = `${productId}/${Date.now()}-${i}.${fileExt}`

                    const sRef = storageRef(storage, `products/${fileName}`)
                    await uploadBytes(sRef, file)
                    const publicUrl = await getDownloadURL(sRef)

                    imageUrls.push(publicUrl)
                }
            }

            // 2. Insert Variant
            const newRef = push(dbRef(db, "product_variants"))
            await set(newRef, {
                product_id: productId,
                color_name: colorName,
                color_hex: colorHex,
                images: imageUrls,
                is_active: true,
                created_at: new Date().toISOString()
            })

            // Reset Form
            setColorName("")
            setColorHex("#000000")
            setSelectedFiles(null)
            toast.success("Variante agregada")
            router.refresh() // Refresh server data

        } catch (error: any) {
            toast.error("Error al agregar variante", { description: error.message })
        } finally {
            setIsUploading(false)
        }
    }

    async function handleDelete(id: string) {
        if (!confirm("¿Seguro que deseas eliminar esta variante?")) return;
        try {
            await set(dbRef(db, `product_variants/${id}`), null)
            toast.success("Variante eliminada")
            router.refresh()
        } catch (error: any) {
            toast.error("Error al eliminar variante", { description: error.message })
        }
    }

    // Eliminar una imagen individual de la variante
    async function handleDeleteImage(variantId: string, currentImages: string[], indexToRemove: number) {
        if (!confirm("¿Deseas eliminar esta imagen de la variante?")) return;
        try {
            const updatedImages = currentImages.filter((_, idx) => idx !== indexToRemove)
            await set(dbRef(db, `product_variants/${variantId}/images`), updatedImages)
            toast.success("Imagen eliminada de la variante")
            router.refresh()
        } catch (error: any) {
            toast.error("Error al eliminar imagen", { description: error.message })
        }
    }

    // Agregar una imagen individual a la variante existente
    async function handleAddImageToVariant(variantId: string, currentImages: string[], e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return

        setUploadingVariantId(variantId)
        try {
            const fileExt = file.name.split('.').pop()
            const fileName = `${productId}/${variantId}/${Date.now()}.${fileExt}`
            const sRef = storageRef(storage, `products/${fileName}`)
            
            await uploadBytes(sRef, file)
            const publicUrl = await getDownloadURL(sRef)

            const updatedImages = [...(currentImages || []), publicUrl]
            await set(dbRef(db, `product_variants/${variantId}/images`), updatedImages)

            toast.success("Imagen agregada con éxito")
            router.refresh()
        } catch (error: any) {
            toast.error("Error al subir imagen", { description: error.message })
        } finally {
            setUploadingVariantId(null)
        }
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Variantes de Color</CardTitle>
                </CardHeader>
                <CardContent>
                    {/* List */}
                    <div className="space-y-4 mb-6">
                        {variants.map((variant) => (
                            <div key={variant.id} className="p-4 border rounded-lg bg-background space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-6 h-6 rounded-full border shadow-sm"
                                            style={{ backgroundColor: variant.color_hex }}
                                        />
                                        <p className="font-semibold text-sm">{variant.color_name}</p>
                                    </div>
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        onClick={() => handleDelete(variant.id)}
                                        className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10 cursor-pointer"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>

                                {/* Thumbnail grid with Delete option and Inline Uploader */}
                                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                                    {variant.images?.map((img, idx) => (
                                        <div key={idx} className="relative aspect-[3/4] bg-secondary/50 rounded-md overflow-hidden group/img border">
                                            <Image
                                                src={img}
                                                alt={`Imagen ${idx + 1} de color ${variant.color_name}`}
                                                fill
                                                className="object-cover"
                                            />
                                            {/* Overlaid delete button shown on hover */}
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteImage(variant.id, variant.images, idx)}
                                                className="absolute top-1 right-1 w-5 h-5 rounded-full bg-destructive text-white flex items-center justify-center shadow-md opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 hover:bg-destructive/90 cursor-pointer"
                                                title="Eliminar esta foto"
                                            >
                                                <X className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    ))}

                                    {/* Upload slot for another photo */}
                                    <label className="relative aspect-[3/4] rounded-md border-2 border-dashed flex flex-col items-center justify-center cursor-pointer hover:bg-muted/10 transition-all border-muted hover:border-primary">
                                        {uploadingVariantId === variant.id ? (
                                            <Loader2 className="w-4 h-4 text-primary animate-spin" />
                                        ) : (
                                            <>
                                                <Plus className="w-4 h-4 text-muted-foreground" />
                                                <span className="text-[10px] text-muted-foreground mt-1 font-semibold">Subir</span>
                                            </>
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            disabled={uploadingVariantId === variant.id}
                                            onChange={(e) => handleAddImageToVariant(variant.id, variant.images, e)}
                                        />
                                    </label>
                                </div>
                            </div>
                        ))}
                        {variants.length === 0 && <p className="text-sm text-muted-foreground">Aún no hay variantes de color creadas.</p>}
                    </div>

                    {/* Add New */}
                    <div className="bg-secondary/20 p-4 rounded-lg space-y-4 border border-dashed">
                        <h4 className="font-medium text-sm flex items-center gap-2"><Plus className="w-4 h-4" /> Agregar Variante</h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>Nombre del Color</Label>
                                <Input
                                    value={colorName}
                                    onChange={(e) => setColorName(e.target.value)}
                                    placeholder="Ej: Negro Mate"
                                />
                            </div>
                            <div>
                                <Label>Hex Color</Label>
                                <div className="flex gap-2">
                                    <Input
                                        type="color"
                                        className="w-12 p-1"
                                        value={colorHex}
                                        onChange={(e) => setColorHex(e.target.value)}
                                    />
                                    <Input
                                        value={colorHex}
                                        onChange={(e) => setColorHex(e.target.value)}
                                        placeholder="#000000"
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <Label>Imágenes (Seleccionar varias)</Label>
                            <Input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={(e) => setSelectedFiles(e.target.files)}
                            />
                        </div>
                        <Button onClick={handleAddVariant} disabled={isUploading || !colorName} className="w-full">
                            {isUploading ? "Subiendo..." : "Guardar Variante"}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
