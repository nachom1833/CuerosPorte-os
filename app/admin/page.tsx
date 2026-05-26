import { db } from "@/lib/firebase"
import { collection, query, orderBy, getDocs } from "firebase/firestore"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, FileSpreadsheet } from "lucide-react"
import { Product } from "@/types/database"

export default async function AdminDashboard() {
    const q = query(collection(db, "products"), orderBy("created_at", "desc"))
    const productsSnap = await getDocs(q)
    const products = productsSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    })) as Product[]

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
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products && products.length > 0 ? (
                            products.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell className="font-medium">{product.name}</TableCell>
                                    <TableCell>{product.slug}</TableCell>
                                    <TableCell>{product.category}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm" asChild>
                                            <Link href={`/admin/products/${product.id}`}>Editar</Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center">
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
