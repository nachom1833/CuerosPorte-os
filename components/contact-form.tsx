"use client"

import React, { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { UploadCloud, File, X, CheckCircle, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"
import { getDb } from "@/lib/firebase"
import { ref, push, set } from "firebase/database"

interface ContactFormProps {
    id?: string
}

export function ContactForm({ id }: ContactFormProps) {
    const [name, setName] = useState("")
    const [company, setCompany] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [projectDetails, setProjectDetails] = useState("")
    const [files, setFiles] = useState<File[]>([])
    const [isDragOver, setIsDragOver] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDragOver(true)
    }

    const handleDragLeave = () => {
        setIsDragOver(false)
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDragOver(false)
        if (e.dataTransfer.files) {
            const newFiles = Array.from(e.dataTransfer.files)
            setFiles(prev => [...prev, ...newFiles])
        }
    }

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files)
            setFiles(prev => [...prev, ...newFiles])
        }
    }

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, idx) => idx !== index))
    }

    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!name || !company || !email || !phone || !projectDetails) {
            toast.error("Por favor, completa todos los campos obligatorios.")
            return
        }

        setIsSubmitting(true)
        
        try {
            // Guardar en la base de datos de Firebase
            const contactRef = ref(getDb(), "contact_messages")
            const newContactRef = push(contactRef)
            await set(newContactRef, {
                name,
                company,
                email,
                phone,
                projectDetails,
                createdAt: new Date().toISOString(),
                status: "nuevo"
            })

            // Crear link de mailto
            const mailtoSubject = `Nueva consulta de desarrollo - ${company}`
            const mailtoBody = `Hola Cueros Porteños,\n\nHas recibido una nueva consulta de desarrollo desde el formulario de contacto del sitio web:\n\n` +
                `- Nombre: ${name}\n` +
                `- Empresa: ${company}\n` +
                `- Email de contacto: ${email}\n` +
                `- Teléfono: ${phone}\n\n` +
                `Detalles del proyecto:\n${projectDetails}\n\n` +
                `Saludos.`;

            const mailtoUrl = `mailto:cuerosport@ciudad.com.ar?subject=${encodeURIComponent(mailtoSubject)}&body=${encodeURIComponent(mailtoBody)}`
            
            // Redireccionar al link de correo
            window.location.href = mailtoUrl

            setIsSubmitting(false)
            setSubmitted(true)
            toast.success("¡Solicitud generada con éxito! Se abrirá tu aplicación de correo para enviar el mail a cuerosport@ciudad.com.ar.")

            // Limpiar campos
            setName("")
            setCompany("")
            setEmail("")
            setPhone("")
            setProjectDetails("")
            setFiles([])
        } catch (error: any) {
            console.error("Error al procesar la solicitud:", error)
            toast.error("Ocurrió un error al procesar tu solicitud, por favor intenta nuevamente.")
            setIsSubmitting(false)
        }
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
        <section id={id} className="py-24 bg-[#F5EFE6]/60 border-t border-[#DDC8A6]/30 scroll-mt-20">
            <div className="container px-4 sm:px-8 mx-auto">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12 space-y-3">
                        <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#856a43]">
                            Contacto Corporativo
                        </span>
                        <h2 className="text-3xl font-bold font-serif tracking-tight text-[#251D13]">
                            Desarrollemos tu Próximo Proyecto
                        </h2>
                        <p className="text-[#251D13]/70 text-sm sm:text-base max-w-lg mx-auto">
                            Coméntanos las características de tu lanzamiento o idea y co-creemos una solución de marroquinería fina que represente con excelencia a tu empresa.
                        </p>
                    </div>

                    <div className="bg-[#FBF8F3] border border-[#DDC8A6]/40 rounded-2xl p-6 sm:p-10 shadow-md">
                        <AnimatePresence mode="wait">
                            {!submitted ? (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onSubmit={handleSubmit}
                                    className="space-y-6"
                                >
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-[#251D13]/85">
                                                Nombre de Contacto *
                                            </Label>
                                            <Input
                                                id="name"
                                                type="text"
                                                required
                                                placeholder="Ej. Juan Pérez"
                                                value={name}
                                                onChange={e => setName(e.target.value)}
                                                className="rounded-lg border-[#DDC8A6] focus:border-[#856a43] focus:ring-1 focus:ring-[#856a43] transition-all bg-[#FBF8F3] text-sm text-[#251D13] placeholder:text-[#251D13]/30"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="company" className="text-xs font-bold uppercase tracking-wider text-[#251D13]/85">
                                                Empresa / Marca *
                                            </Label>
                                            <Input
                                                id="company"
                                                type="text"
                                                required
                                                placeholder="Ej. Valois Group"
                                                value={company}
                                                onChange={e => setCompany(e.target.value)}
                                                className="rounded-lg border-[#DDC8A6] focus:border-[#856a43] focus:ring-1 focus:ring-[#856a43] transition-all bg-[#FBF8F3] text-sm text-[#251D13] placeholder:text-[#251D13]/30"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-[#251D13]/85">
                                                Email Corporativo *
                                            </Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                autoComplete="email"
                                                required
                                                placeholder="Ej. jperez@empresa.com"
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                                className="rounded-lg border-[#DDC8A6] focus:border-[#856a43] focus:ring-1 focus:ring-[#856a43] transition-all bg-[#FBF8F3] text-sm text-[#251D13] placeholder:text-[#251D13]/30"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-[#251D13]/85">
                                                Teléfono / WhatsApp *
                                            </Label>
                                            <Input
                                                id="phone"
                                                type="tel"
                                                autoComplete="tel"
                                                required
                                                placeholder="Ej. +54 11 1234 5678"
                                                value={phone}
                                                onChange={e => setPhone(e.target.value)}
                                                className="rounded-lg border-[#DDC8A6] focus:border-[#856a43] focus:ring-1 focus:ring-[#856a43] transition-all bg-[#FBF8F3] text-sm text-[#251D13] placeholder:text-[#251D13]/30"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="projectDetails" className="text-xs font-bold uppercase tracking-wider text-[#251D13]/85">
                                            Cuéntanos sobre tu lanzamiento o idea *
                                        </Label>
                                        <Textarea
                                            id="projectDetails"
                                            required
                                            rows={4}
                                            placeholder="Detalla el artículo que deseas desarrollar, cantidades estimadas (ej. 200 unidades), plazos y cualquier idea o requerimiento de diseño corporativo que tengas en mente..."
                                            value={projectDetails}
                                            onChange={e => setProjectDetails(e.target.value)}
                                            className="rounded-lg border-[#DDC8A6] focus:border-[#856a43] focus:ring-1 focus:ring-[#856a43] transition-all bg-[#FBF8F3] text-sm text-[#251D13] placeholder:text-[#251D13]/30 resize-none"
                                        />
                                    </div>

                                    {/* Drag & Drop File Upload Field */}
                                    <div className="space-y-2">
                                        <Label className="text-xs font-bold uppercase tracking-wider text-[#251D13]/85">
                                            Adjuntar logotipo, manual de marca o referencias (Opcional)
                                        </Label>
                                        <div
                                            onDragOver={handleDragOver}
                                            onDragLeave={handleDragLeave}
                                            onDrop={handleDrop}
                                            onClick={triggerFileInput}
                                            className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center space-y-2 bg-[#F5EFE6]/40 ${
                                                isDragOver 
                                                    ? "border-[#251D13] bg-[#DDC8A6]/20" 
                                                    : "border-[#DDC8A6] hover:border-[#856a43]"
                                            }`}
                                        >
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                onChange={handleFileSelect}
                                                multiple
                                                className="hidden"
                                                accept=".pdf,.png,.jpg,.jpeg,.svg,.ai,.eps,.zip"
                                            />
                                            <UploadCloud className={`h-8 w-8 transition-colors ${isDragOver ? 'text-[#251D13]' : 'text-[#856a43]'}`} />
                                            <div className="space-y-1">
                                                <p className="text-sm font-bold text-[#251D13]">Arrastra archivos aquí o haz clic para subir</p>
                                                <p className="text-xs text-[#251D13]/60">Soporta logos vectoriales, manuales o referencias (SVG, AI, PDF, PNG, JPG, ZIP)</p>
                                            </div>
                                        </div>

                                        {/* File list preview */}
                                        <AnimatePresence>
                                            {files.length > 0 && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="pt-3 space-y-2 overflow-hidden"
                                                >
                                                    <p className="text-xs font-bold uppercase tracking-wider text-[#251D13]">Archivos Seleccionados ({files.length}):</p>
                                                    <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                                                        {files.map((file, index) => (
                                                            <motion.div
                                                                key={index}
                                                                initial={{ opacity: 0, x: -10 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                exit={{ opacity: 0, x: 10 }}
                                                                className="flex items-center justify-between p-2.5 bg-[#F5EFE6]/50 border border-[#DDC8A6]/40 rounded-lg text-xs"
                                                            >
                                                                <div className="flex items-center gap-2 truncate max-w-[85%]">
                                                                    <File className="h-4 w-4 text-[#856a43] shrink-0" />
                                                                    <span className="font-semibold truncate text-[#251D13]">{file.name}</span>
                                                                    <span className="text-[10px] text-[#251D13]/60 shrink-0">({formatBytes(file.size)})</span>
                                                                </div>
                                                                <button
                                                                    type="button"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation()
                                                                        removeFile(index)
                                                                    }}
                                                                    className="text-[#856a43] hover:text-[#251D13] p-1 rounded-full transition-colors cursor-pointer"
                                                                    aria-label="Remover archivo"
                                                                >
                                                                    <X className="h-3.5 w-3.5" />
                                                                </button>
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full rounded-full bg-[#251D13] text-[#DDC8A6] hover:bg-[#251D13]/90 hover:text-white py-6 text-base font-semibold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer border-none"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                Procesando Solicitud...
                                            </>
                                        ) : (
                                            "Enviar Consulta de Desarrollo"
                                        )}
                                    </Button>
                                </motion.form>
                            ) : (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="py-12 flex flex-col items-center justify-center text-center space-y-5"
                                >
                                    <div className="p-4 bg-[#F5EFE6] text-[#856a43] rounded-full border border-[#DDC8A6]/20">
                                        <CheckCircle className="h-16 w-16 stroke-1.5" />
                                    </div>
                                    <div className="space-y-2 max-w-md">
                                        <h3 className="text-2xl font-bold font-serif text-[#251D13]">
                                            ¡Solicitud Recibida!
                                        </h3>
                                        <p className="text-sm text-[#251D13]/70 leading-relaxed font-sans">
                                            Agradecemos tu interés en desarrollar tu proyecto de marroquinería corporativa con nosotros. Un especialista de nuestro equipo evaluará los detalles técnicos de tu propuesta y se contactará contigo en las próximas 24 horas hábiles.
                                        </p>
                                    </div>
                                    <Button
                                        onClick={() => setSubmitted(false)}
                                        variant="outline"
                                        className="rounded-full px-6 py-5 cursor-pointer mt-4 border-[#251D13] text-[#251D13]"
                                    >
                                        Enviar otra consulta
                                    </Button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    )
}
