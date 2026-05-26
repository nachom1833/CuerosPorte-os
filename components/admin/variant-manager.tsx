"use client"

import { useState } from "react"
import type { ProductVariant } from "@/types/database"
import { db, storage } from "@/lib/firebase"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { collection, addDoc, doc, deleteDoc } from "firebase/firestore"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Plus, Image as ImageIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface VariantManagerProps {
    productId: string
    variants: ProductVariant[]
}

export function VariantManager({ productId, variants }: VariantManagerProps) {
    const router = useRouter()
    const [isUploading, setIsUploading] = useState(false)

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

                    const storageRef = ref(storage, `products/${fileName}`)
                    await uploadBytes(storageRef, file)
                    const publicUrl = await getDownloadURL(storageRef)

                    imageUrls.push(publicUrl)
                }
            }

            // 2. Insert Variant
            await addDoc(collection(db, "product_variants"), {
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
            await deleteDoc(doc(db, "product_variants", id))
            toast.success("Variante eliminada")
            router.refresh()
        } catch (error: any) {
            toast.error("Error al eliminar variante", { description: error.message })
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
                            <div key={variant.id} className="flex items-center justify-between p-3 border rounded-md">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-8 h-8 rounded-full border shadow-sm"
                                        style={{ backgroundColor: variant.color_hex }}
                                    />
                                    <div>
                                        <p className="font-medium">{variant.color_name}</p>
                                        <p className="text-xs text-muted-foreground">{variant.images?.length || 0} imágenes</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => handleDelete(variant.id)}>
                                    <Trash2 className="w-4 h-4 text-destructive" />
                                </Button>
                            </div>
                        ))}
                        {variants.length === 0 && <p className="text-sm text-muted-foreground">No hay variantes.</p>}
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
