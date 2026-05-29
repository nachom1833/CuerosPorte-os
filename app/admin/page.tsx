import { db } from "@/lib/firebase"
import { ref, get } from "firebase/database"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, FileSpreadsheet } from "lucide-react"
import { Product } from "@/types/database"

export default async function AdminDashboard() {
    const [productsSnap, variantsSnap] = await Promise.all([
        get(ref(db, "products")),
        get(ref(db, "product_variants"))
    ])

    const productsVal = productsSnap.val() || {}
    const variantsVal = variantsSnap.val() || {}

    const rawVariants = Object.keys(variantsVal).map(key => ({
        id: key,
        ...variantsVal[key]
    }))

    const products = Object.keys(productsVal)
        .map(key => {
            const productVariants = rawVariants.filter(v => v.product_id === key && v.is_active)
            return {
                id: key,
                ...productsVal[key],
                variants: productVariants
            }
        })
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()) as any[]

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Productos</h1>
                <div className="flex gap-3">
                    <Button variant="outline" asChild>
                        <Link href="/admin/products/import">
                            <FileSpreadsheet className="mr-2 h-4 w-4" /> Importar Excel
                        </Link>
                    </Button>
                    <Button asChild>
                        <Link href="/admin/products/new">
                            <Plus className="mr-2 h-4 w-4" /> Nuevo Producto
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="rounded-md border bg-background">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Slug</TableHead>
                            <TableHead>Categoría</TableHead>
                            <TableHead>Colores</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products && products.length > 0 ? (
                            products.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell className="font-medium">{product.name}</TableCell>
                                    <TableCell className="font-mono text-xs opacity-75">{product.slug}</TableCell>
                                    <TableCell>{product.category}</TableCell>
                                    <TableCell>
                                        <div className="flex -space-x-1.5 overflow-hidden py-1">
                                            {product.variants && product.variants.length > 0 ? (
                                                product.variants.map((v: any) => (
                                                    <div 
                                                        key={v.id} 
                                                        className="inline-block h-6 w-6 rounded-full ring-2 ring-background border border-black/10 shadow-sm cursor-help"
                                                        style={{ backgroundColor: v.color_hex }}
                                                        title={v.color_name}
                                                    />
                                                ))
                                            ) : (
                                                <span className="text-xs text-muted-foreground italic">Sin colores</span>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm" asChild>
                                            <Link href={`/admin/products/${product.id}`}>Editar</Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">
                                    No hay productos registrados.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
