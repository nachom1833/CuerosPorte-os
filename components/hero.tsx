"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ShieldCheck, ArrowRight, Layers, Award, Box } from "lucide-react"

export function Hero() {
    const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        const element = document.getElementById("contacto")
        if (element) {
            element.scrollIntoView({ behavior: "smooth" })
        }
    };

    return (
        <section className="relative w-full min-h-[85vh] flex items-center bg-[#FBF8F3] py-16 lg:py-0 overflow-hidden border-b border-[#DDC8A6]/30">
            {/* Subtle warm architectural pattern */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#92764D_1px,transparent_1px)] [background-size:24px_24px]" />

            <div className="container relative z-10 px-4 sm:px-8 mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    
                    {/* Left Column: B2B Brand Pitch */}
                    <div className="lg:col-span-7 space-y-8 flex flex-col justify-center text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-4"
                        >
                            <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#92764D]">
                                Marroquinería Fina para Empresas
                            </span>
                            <h1 className="text-4xl sm:text-5xl lg:text-6.5xl font-serif font-bold tracking-tight text-[#251D13] leading-[1.1]">
                                Acompañamiento y <br />
                                <span className="text-[#92764D] italic font-normal font-serif">desarrollo de marroquinería</span> <br />
                                para empresas.
                            </h1>
                        </motion.div>

                        <motion.p
                            className="text-base sm:text-lg text-[#251D13]/80 leading-relaxed max-w-xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.15 }}
                        >
                            Con 31 años de experiencia en la industria, materializamos tus ideas con productos exclusivos y totalmente personalizables para potenciar tu equipo de ventas.
                        </motion.p>

                        {/* CTA Buttons - High Contrast B2B Conversion */}
                        <motion.div
                            className="flex flex-wrap gap-4 pt-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            <Button asChild size="lg" className="rounded-full px-8 text-base shadow-lg transition-all duration-300 bg-[#251D13] text-[#DDC8A6] hover:bg-[#251D13]/90 hover:text-white group cursor-pointer border-none">
                                <a href="#contacto" onClick={handleScrollToContact} className="flex items-center gap-2">
                                    Desarrollar un Proyecto
                                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </a>
                             </Button>
                             <Button asChild variant="outline" size="lg" className="rounded-full px-8 text-base bg-transparent border-[#251D13] text-[#251D13] hover:bg-[#DDC8A6]/20 transition-all">
                                 <Link href="/catalogo">Ver Catálogo de Inspiración</Link>
                             </Button>
                         </motion.div>
 
                         {/* B2B Trust Credentials Block */}
                         <motion.div
                             className="pt-8 border-t border-[#DDC8A6]/40 grid grid-cols-1 sm:grid-cols-3 gap-6"
                             initial={{ opacity: 0 }}
                             animate={{ opacity: 1 }}
                             transition={{ duration: 1, delay: 0.45 }}
                         >
                             {/* Credential 1 */}
                             <div className="flex gap-3 items-start">
                                 <div className="p-2 bg-[#F5EFE6] rounded-full text-[#92764D] shrink-0 border border-[#DDC8A6]/30">
                                     <Box className="h-4 w-4" />
                                 </div>
                                 <div className="flex flex-col">
                                     <span className="text-xs font-bold uppercase tracking-wider text-[#251D13]">Taller de Alta Gama</span>
                                     <span className="text-[11px] text-[#251D13]/70">Manufactura propia en Buenos Aires</span>
                                 </div>
                             </div>
 
                             {/* Credential 2 */}
                             <div className="flex gap-3 items-start">
                                 <div className="p-2 bg-[#F5EFE6] rounded-full text-[#92764D] shrink-0 border border-[#DDC8A6]/30">
                                     <Layers className="h-4 w-4" />
                                 </div>
                                 <div className="flex flex-col">
                                     <span className="text-xs font-bold uppercase tracking-wider text-[#251D13]">Diseños a Medida</span>
                                     <span className="text-[11px] text-[#251D13]/70">Grabados de logo y medidas personalizadas</span>
                                 </div>
                             </div>
 
                             {/* Credential 3 */}
                             <div className="flex gap-3 items-start">
                                 <div className="p-2 bg-[#F5EFE6] rounded-full text-[#92764D] shrink-0 border border-[#DDC8A6]/30">
                                     <Award className="h-4 w-4" />
                                 </div>
                                 <div className="flex flex-col">
                                     <span className="text-xs font-bold uppercase tracking-wider text-[#251D13]">31 Años de Experiencia</span>
                                     <span className="text-[11px] text-[#251D13]/70">Garantía total en costura y terminaciones</span>
                                 </div>
                             </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Stunning overlapping image collage using real product images */}
                    <div className="lg:col-span-5 relative w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5] flex items-center justify-center">
                        <motion.div 
                            className="relative w-full h-full max-w-[420px] lg:max-w-none"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.3 }}
                        >
                            {/* Main product image: Portafolio 3 fuelles */}
                            <div className="absolute top-0 right-0 w-[82%] h-[78%] rounded-2xl overflow-hidden shadow-2xl border border-[#DDC8A6]/20 z-10 group bg-[#F5EFE6]">
                                <Image
                                    src="/images/products/portafolio 3 fuelles.jpeg"
                                    alt="Desarrollo corporativo Cueros Porteños"
                                    fill
                                    className="object-cover group-hover:scale-102 transition-transform duration-700 ease-out transition-all"
                                    priority
                                />
                            </div>

                            {/* Overlapping product image: Necesaire */}
                            <div className="absolute bottom-0 left-0 w-[55%] h-[50%] rounded-2xl overflow-hidden shadow-2xl border-4 border-[#FBF8F3] z-20 group bg-[#F5EFE6]">
                                <Image
                                    src="/images/products/carpeta con cierre(1).jpeg"
                                    alt="Carpeta con cierre Cueros Porteños"
                                    fill
                                    className="object-cover group-hover:scale-102 transition-transform duration-700 ease-out transition-all"
                                />
                            </div>

                            {/* Handmade Floating Badge - Monochromatic and Sleek */}
                            <motion.div 
                                className="absolute -bottom-4 right-10 bg-[#92764D] text-white px-5 py-3 shadow-lg z-30 flex flex-col items-center justify-center rounded-lg border border-[#DDC8A6]"
                                style={{ transform: "rotate(3deg)" }}
                                whileHover={{ scale: 1.05, rotate: "0deg" }}
                                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                            >
                                <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-90 leading-none">Trayectoria Premium</span>
                                <span className="text-sm font-serif font-semibold mt-1">Garantía Porteña</span>
                            </motion.div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    )
}
