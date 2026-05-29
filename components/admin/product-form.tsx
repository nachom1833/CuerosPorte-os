"use client"

import { useTransition } from "react" // Next.js 15 uses useTransition for server actions
import { Product } from "@/types/database"
import { Category } from "@/lib/categories"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea" 
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createProduct, updateProduct } from "@/app/admin/products/actions"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface ProductFormProps {
    product?: Product
    categories: Category[]
}

export function ProductForm({ product, categories }: ProductFormProps) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    const isEditing = !!product

    async function handleSubmit(formData: FormData) {
        startTransition(async () => {
            let result;
            if (isEditing && product) {
                result = await updateProduct(product.id, formData)
            } else {
                result = await createProduct(formData)
            }

            if (result?.error) {
                toast.error("Error al guardar", { description: result.error })
            } else {
                toast.success("Producto guardado exitosamente")
                router.push("/admin")
            }
        })
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{isEditing ? "Editar Producto" : "Nuevo Producto"}</CardTitle>
            </CardHeader>
            <CardContent>
                <form action={handleSubmit} className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nombre</Label>
                        <Input id="name" name="name" defaultValue={product?.name} required />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="slug">Slug (URL)</Label>
                        <Input id="slug" name="slug" defaultValue={product?.slug} required placeholder="ej: bolso-cuero-negro" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="category">Categoría</Label>
                        <select
                            id="category"
                            name="category"
                            defaultValue={product?.category || ""}
                            required
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <option value="" disabled>Selecciona una categoría</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.name}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="material">Material</Label>
                        <Input id="material" name="material" defaultValue={product?.material || ""} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="dimensions">Dimensiones</Label>
                        <Input id="dimensions" name="dimensions" defaultValue={product?.dimensions || ""} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="description">Descripción</Label>
                        <textarea
                            id="description"
                            name="description"
                            defaultValue={product?.description || ""}
                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            rows={4}
                        />
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                        <Button type="button" variant="outline" onClick={() => router.back()}>Cancelar</Button>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Guardando..." : "Guardar Producto"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
