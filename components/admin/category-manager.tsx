"use client"

import { useState, useTransition } from "react"
import { Category } from "@/lib/categories"
import { createCategory, updateCategory, deleteCategory } from "@/app/admin/categories/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit2, Trash2, X, RefreshCw } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface CategoryManagerProps {
    initialCategories: Category[]
}

export function CategoryManager({ initialCategories }: CategoryManagerProps) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [editingCategory, setEditingCategory] = useState<Category | null>(null)
    const [name, setName] = useState("")
    const [slug, setSlug] = useState("")

    // Handle Edit Click
    function handleEdit(category: Category) {
        setEditingCategory(category)
        setName(category.name)
        setSlug(category.slug)
    }

    // Cancel Edit
    function handleCancel() {
        setEditingCategory(null)
        setName("")
        setSlug("")
    }

    // Submit Form
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData()
        formData.append("name", name)
        formData.append("slug", slug)

        startTransition(async () => {
            let result
            if (editingCategory) {
                result = await updateCategory(editingCategory.id, formData)
            } else {
                result = await createCategory(formData)
            }

            if (result?.error) {
                toast.error("Error al guardar categoría", { description: result.error })
            } else {
                toast.success(editingCategory ? "Categoría actualizada" : "Categoría creada")
                handleCancel()
                router.refresh()
            }
        })
    }

    // Handle Delete
    async function handleDelete(id: string) {
        if (!confirm("¿Estás seguro de que deseas eliminar esta categoría? Los productos asociados podrían quedar sin categoría.")) {
            return
        }

        startTransition(async () => {
            const result = await deleteCategory(id)
            if (result?.error) {
                toast.error("Error al eliminar categoría", { description: result.error })
            } else {
                toast.success("Categoría eliminada exitosamente")
                router.refresh()
            }
        })
    }

    return (
        <div className="grid md:grid-cols-[1fr_350px] gap-6 items-start">
            {/* Categories Table Card */}
            <Card className="bg-background">
                <CardHeader>
                    <CardTitle>Listado de Categorías</CardTitle>
                    <CardDescription>
                        Visualiza y gestiona las categorías disponibles para tu catálogo de productos.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nombre</TableHead>
                                    <TableHead>Slug (Filtro URL)</TableHead>
                                    <TableHead className="text-right">Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {initialCategories && initialCategories.length > 0 ? (
                                    initialCategories.map((category) => (
                                        <TableRow key={category.id} className={editingCategory?.id === category.id ? "bg-muted/40" : ""}>
                                            <TableCell className="font-semibold text-foreground">{category.name}</TableCell>
                                            <TableCell className="text-muted-foreground font-mono text-xs">{category.slug}</TableCell>
                                            <TableCell className="text-right space-x-1">
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    onClick={() => handleEdit(category)}
                                                    title="Editar"
                                                >
                                                    <Edit2 className="h-4 w-4 text-foreground/80" />
                                                </Button>
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    onClick={() => handleDelete(category.id)}
                                                    title="Eliminar"
                                                    disabled={isPending}
                                                >
                                                    <Trash2 className="h-4 w-4 text-destructive" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={3} className="h-24 text-center">
                                            No hay categorías registradas.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            {/* Add / Edit Form Card */}
            <Card className="bg-background sticky top-28">
                <CardHeader>
                    <CardTitle>
                        {editingCategory ? "Editar Categoría" : "Nueva Categoría"}
                    </CardTitle>
                    <CardDescription>
                        {editingCategory ? "Modifica los datos de la categoría seleccionada." : "Registra una nueva categoría en el sistema."}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nombre</Label>
                            <Input 
                                id="name" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                placeholder="ej: Mochilas" 
                                required 
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="slug">Slug (Opcional)</Label>
                            <Input 
                                id="slug" 
                                value={slug} 
                                onChange={(e) => setSlug(e.target.value)} 
                                placeholder="ej: mochilas (auto)" 
                            />
                        </div>

                        <div className="flex gap-2 pt-2">
                            {editingCategory && (
                                <Button 
                                    type="button" 
                                    variant="outline" 
                                    className="flex-1"
                                    onClick={handleCancel}
                                >
                                    <X className="mr-2 h-4 w-4" /> Cancelar
                                </Button>
                            )}
                            <Button 
                                type="submit" 
                                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/95" 
                                disabled={isPending}
                            >
                                {isPending ? (
                                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                                ) : editingCategory ? (
                                    <Plus className="mr-2 h-4 w-4" />
                                ) : (
                                    <Plus className="mr-2 h-4 w-4" />
                                )}
                                {editingCategory ? "Guardar" : "Crear"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
