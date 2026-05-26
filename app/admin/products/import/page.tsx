"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import * as XLSX from "xlsx"
import { importBulkProducts } from "./import-actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Download, Upload, FileSpreadsheet, Check, AlertTriangle, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface ValidatedItem {
    Nombre: string
    Slug?: string
    Categoría: string
    Material?: string
    Dimensiones?: string
    Descripción?: string
    "Color Nombre"?: string
    "Color Hex"?: string
}

export default function ExcelImportPage() {
    const router = useRouter()
    const [previewData, setPreviewData] = useState<ValidatedItem[]>([])
    const [isProcessing, setIsProcessing] = useState(false)
    const [dragActive, setDragActive] = useState(false)

    // Generar plantilla de Excel con datos de muestra dinamicos
    const handleDownloadTemplate = () => {
        const headers = [
            ["Nombre", "Slug", "Categoría", "Material", "Dimensiones", "Descripción", "Color Nombre", "Color Hex"]
        ]
        const sampleRows = [
            ["Bolso Portafolio Vintage", "bolso-portafolio-vintage", "Bolsos", "Cuero Vacuno Rústico", "40cm x 30cm x 10cm", "Portafolio de diseño elegante ideal para oficina y viajes de negocios.", "Marrón Caramelo", "#8b5a2b"],
            ["Billetera Tríptica Clásica", "", "Billeteras", "Cuero Nobuck", "11cm x 8.5cm", "Billetera ultra compacta con tarjetero de seguridad.", "Negro Mate", "#111111"]
        ]

        const ws = XLSX.utils.aoa_to_sheet([...headers, ...sampleRows])
        
        // Ajustar anchos de columnas
        const wscols = [
            { wch: 30 }, // Nombre
            { wch: 25 }, // Slug
            { wch: 15 }, // Categoría
            { wch: 25 }, // Material
            { wch: 20 }, // Dimensiones
            { wch: 40 }, // Descripción
            { wch: 18 }, // Color Nombre
            { wch: 15 }  // Color Hex
        ]
        ws["!cols"] = wscols

        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, "Plantilla de Productos")
        XLSX.writeFile(wb, "plantilla_productos_cueros.xlsx")
        toast.success("Plantilla descargada con éxito. Utilízala de referencia.")
    }

    // Procesar archivo cargado
    const processFile = (file: File) => {
        const reader = new FileReader()
        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target?.result as ArrayBuffer)
                const workbook = XLSX.read(data, { type: "array" })
                const sheetName = workbook.SheetNames[0]
                const worksheet = workbook.Sheets[sheetName]
                
                // Convertir hoja a JSON
                const json: any[] = XLSX.utils.sheet_to_json(worksheet)
                
                if (json.length === 0) {
                    toast.error("El archivo está vacío.")
                    return
                }

                // Normalización de llaves tolerante a faltas de ortografía o variaciones
                const normalizedItems: ValidatedItem[] = json.map((row) => {
                    const findValue = (keys: string[]) => {
                        const matchedKey = Object.keys(row).find(
                            k => keys.includes(k.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
                        )
                        return matchedKey ? row[matchedKey] : undefined
                    }

                    return {
                        Nombre: findValue(["nombre", "name", "nombre del producto"]) || "",
                        Slug: findValue(["slug", "url"]) || "",
                        Categoría: findValue(["categoria", "category", "grupo"]) || "",
                        Material: findValue(["material", "cuero", "tipo de cuero"]) || "",
                        Dimensiones: findValue(["dimensiones", "medidas", "talle", "tamano"]) || "",
                        Descripción: findValue(["descripcion", "detalle", "description", "resumen"]) || "",
                        "Color Nombre": findValue(["color nombre", "color", "variante color", "color_nombre"]) || "",
                        "Color Hex": findValue(["color hex", "hex", "codigo de color", "color_hex"]) || ""
                    }
                })

                // Filtrar los registros requeridos validos
                const validItems = normalizedItems.filter(item => item.Nombre && item.Categoría)

                if (validItems.length === 0) {
                    toast.error("No se encontraron productos válidos. Comprueba que las columnas 'Nombre' y 'Categoría' contengan datos.")
                    return
                }

                setPreviewData(validItems)
                toast.success(`Se cargaron ${validItems.length} productos válidos para importar.`)
            } catch (err: any) {
                console.error("Error al leer el archivo:", err)
                toast.error("Error al procesar el archivo. Comprueba que sea un formato Excel o CSV correcto.")
            }
        }
        reader.readAsArrayBuffer(file)
    }

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) processFile(file)
    }

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            processFile(e.dataTransfer.files[0])
        }
    }

    // Ejecutar importación a la Base de Datos
    const handleConfirmImport = async () => {
        setIsProcessing(true)
        try {
            const result = await importBulkProducts(previewData)
            
            if (result.success) {
                toast.success("¡Importación masiva completada!", {
                    description: `Se crearon/actualizaron ${result.importedCount} productos y se añadieron ${result.variantsCreated} variantes de color.`
                })
                router.push("/admin")
                router.refresh()
            } else {
                toast.error("Error al importar productos", { description: result.error })
            }
        } catch (error: any) {
            toast.error("Error inesperado en el servidor", { description: error.message })
        } finally {
            setIsProcessing(false)
        }
    }

    return (
        <div className="space-y-8 max-w-6xl mx-auto py-4">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" asChild className="rounded-full">
                            <Link href="/admin">
                                <ArrowLeft className="w-5 h-5" />
                            </Link>
                        </Button>
                        <h1 className="text-3xl font-bold tracking-tight">Importar Productos</h1>
                    </div>
                    <p className="text-muted-foreground ml-10">Carga tu inventario completo de manera ágil usando archivos Excel o CSV.</p>
                </div>
                <Button variant="outline" className="sm:self-end gap-2" onClick={handleDownloadTemplate}>
                    <Download className="w-4 h-4" /> Descargar Plantilla Excel
                </Button>
            </div>

            {/* Drag & Drop Area */}
            <Card className="border-dashed border-2 relative overflow-hidden bg-background">
                <CardContent className="p-0">
                    <label
                        onDragEnter={handleDrag}
                        onDragOver={handleDrag}
                        onDragLeave={handleDrag}
                        onDrop={handleDrop}
                        htmlFor="excel-upload"
                        className={`flex flex-col items-center justify-center py-12 px-6 text-center cursor-pointer transition-colors duration-200 ${
                            dragActive ? "bg-muted/50 border-primary" : "hover:bg-muted/10 border-muted"
                        }`}
                    >
                        <div className="p-4 rounded-full bg-secondary mb-4">
                            <FileSpreadsheet className="w-10 h-10 text-primary animate-pulse" />
                        </div>
                        <h3 className="font-semibold text-lg mb-1">Arrastra tu planilla de Excel aquí</h3>
                        <p className="text-sm text-muted-foreground mb-4">O haz clic para explorar en tus archivos de la computadora</p>
                        <span className="text-xs text-muted-foreground bg-muted/60 px-3 py-1.5 rounded-full">
                            Formatos soportados: .xlsx, .xls, .csv
                        </span>
                        <input
                            id="excel-upload"
                            type="file"
                            accept=".xlsx, .xls, .csv"
                            className="hidden"
                            onChange={handleFileInput}
                        />
                    </label>
                </CardContent>
            </Card>

            {/* Preview Section */}
            <AnimatePresence>
                {previewData.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                    >
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                                <div>
                                    <CardTitle>Vista Previa de Productos ({previewData.length})</CardTitle>
                                    <CardDescription>
                                        Revisa las filas detectadas. Los slugs en blanco serán autogenerados.
                                    </CardDescription>
                                </div>
                                <div className="flex gap-3">
                                    <Button variant="outline" onClick={() => setPreviewData([])} disabled={isProcessing}>
                                        Limpiar
                                    </Button>
                                    <Button onClick={handleConfirmImport} disabled={isProcessing} className="gap-2">
                                        {isProcessing ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" /> Procesando...
                                            </>
                                        ) : (
                                            <>
                                                <Check className="w-4 h-4" /> Confirmar e Importar
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0 border-t overflow-x-auto max-h-[500px] overflow-y-auto">
                                <Table>
                                    <TableHeader className="bg-muted/50 sticky top-0 backdrop-blur-sm">
                                        <TableRow>
                                            <TableHead className="w-[180px]">Nombre</TableHead>
                                            <TableHead className="w-[180px]">Slug</TableHead>
                                            <TableHead className="w-[120px]">Categoría</TableHead>
                                            <TableHead className="w-[150px]">Material</TableHead>
                                            <TableHead className="w-[120px]">Dimensiones</TableHead>
                                            <TableHead className="w-[250px]">Descripción</TableHead>
                                            <TableHead className="w-[150px]">Variante Color</TableHead>
                                            <TableHead className="w-[100px]">Muestra Hex</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {previewData.map((item, idx) => (
                                            <TableRow key={idx}>
                                                <TableCell className="font-medium">{item.Nombre}</TableCell>
                                                <TableCell>
                                                    {item.Slug ? (
                                                        <code className="text-xs">{item.Slug}</code>
                                                    ) : (
                                                        <span className="text-xs text-amber-500 flex items-center gap-1">
                                                            <AlertTriangle className="w-3.5 h-3.5" /> Autogenerado
                                                        </span>
                                                    )}
                                                </TableCell>
                                                <TableCell>{item.Categoría}</TableCell>
                                                <TableCell className="text-muted-foreground text-xs">{item.Material || "—"}</TableCell>
                                                <TableCell className="text-muted-foreground text-xs">{item.Dimensiones || "—"}</TableCell>
                                                <TableCell className="text-muted-foreground text-xs max-w-[250px] truncate" title={item.Descripción}>
                                                    {item.Descripción || "—"}
                                                </TableCell>
                                                <TableCell className="text-xs">
                                                    {item["Color Nombre"] ? (
                                                        <span className="bg-secondary/40 px-2 py-0.5 rounded border">
                                                            {item["Color Nombre"]}
                                                        </span>
                                                    ) : (
                                                        <span className="text-muted-foreground">—</span>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {item["Color Hex"] ? (
                                                        <div className="flex items-center gap-2 text-xs">
                                                            <div
                                                                className="w-4 h-4 rounded-full border shadow-sm flex-shrink-0"
                                                                style={{ backgroundColor: item["Color Hex"] }}
                                                            />
                                                            <code>{item["Color Hex"]}</code>
                                                        </div>
                                                    ) : (
                                                        <span className="text-muted-foreground">—</span>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
