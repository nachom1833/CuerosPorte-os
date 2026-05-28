"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { MapPin, Mail, Instagram, Star, ShieldCheck, ArrowRight } from "lucide-react"

export function Hero() {
    return (
        <section className="relative w-full min-h-[90vh] lg:min-h-[85vh] flex items-center bg-[#FBF8F3] dark:bg-[#251D13] py-16 lg:py-0 overflow-hidden border-b border-border/20">
            {/* Background texture accents */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#92764D_1px,transparent_1px)] [background-size:24px_24px]" />

            <div className="container relative z-10 px-4 sm:px-8 mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    
                    {/* Left Column: Brand, Story & Trust Credentials */}
                    <div className="lg:col-span-7 space-y-8 flex flex-col justify-center text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-4"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold tracking-wider uppercase">
                                <ShieldCheck className="h-3.5 w-3.5" />
                                100% Cuero Vacuno de Curtido Vegetal
                            </div>
                            
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-foreground leading-[1.15]">
                                Artesanía en Cuero <br />
                                <span className="text-accent italic font-normal font-serif">Diseño Atemporal</span>
                            </h1>
                        </motion.div>

                        <motion.p
                            className="text-lg text-foreground/80 leading-relaxed max-w-xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.15 }}
                        >
                            Cada pieza nace en nuestro taller de Buenos Aires. Seleccionamos personalmente cueros nobles argentinos para crear marroquinería que no solo dura, sino que cuenta tu historia al envejecer.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            className="flex flex-wrap gap-4 pt-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            <Button asChild size="lg" className="rounded-full px-8 text-base shadow-lg hover:shadow-xl transition-all duration-300 bg-primary text-primary-foreground hover:bg-primary/95 group">
                                <Link href="/catalogo" className="flex items-center gap-2">
                                    Explorar Catálogo
                                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="rounded-full px-8 text-base bg-background/50 backdrop-blur-sm border-border hover:bg-background/80">
                                <a href="#taller">Conocer Nuestro Taller</a>
                            </Button>
                        </motion.div>

                        {/* Direct Trust Credentials Block */}
                        <motion.div
                            className="pt-8 border-t border-border/40 grid grid-cols-2 sm:grid-cols-4 gap-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.45 }}
                        >
                            {/* Showroom Badge */}
                            <a 
                                href="#taller"
                                className="group flex flex-col gap-1.5 p-1 rounded-lg hover:bg-secondary/10 transition-colors duration-200"
                            >
                                <span className="text-accent flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase">
                                    <MapPin className="h-4 w-4 shrink-0" />
                                    Showroom
                                </span>
                                <span className="text-sm font-medium text-foreground/90 leading-tight group-hover:underline">
                                    San Telmo, CABA
                                </span>
                            </a>

                            {/* Instagram Link */}
                            <a 
                                href="https://instagram.com/cuerosportenos" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="group flex flex-col gap-1.5 p-1 rounded-lg hover:bg-secondary/10 transition-colors duration-200"
                            >
                                <span className="text-accent flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase">
                                    <Instagram className="h-4 w-4 shrink-0" />
                                    Comunidad
                                </span>
                                <span className="text-sm font-medium text-foreground/90 leading-tight group-hover:underline">
                                    @cuerosportenos
                                </span>
                            </a>

                            {/* Email Direct */}
                            <a 
                                href="mailto:contacto@cuerosportenos.com.ar"
                                className="group flex flex-col gap-1.5 p-1 rounded-lg hover:bg-secondary/10 transition-colors duration-200"
                            >
                                <span className="text-accent flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase">
                                    <Mail className="h-4 w-4 shrink-0" />
                                    Escríbenos
                                </span>
                                <span className="text-sm font-medium text-foreground/90 leading-tight truncate group-hover:underline" title="contacto@cuerosportenos.com.ar">
                                    contacto@cueros...
                                </span>
                            </a>

                            {/* Rating Stars */}
                            <div className="flex flex-col gap-1.5 p-1">
                                <span className="text-accent flex items-center gap-1 text-xs font-semibold tracking-wider uppercase">
                                    <Star className="h-4 w-4 fill-accent shrink-0" />
                                    Opiniones
                                </span>
                                <span className="text-sm font-medium text-foreground/90 leading-tight">
                                    4.9/5 Calificaciones
                                </span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Stunning overlapping image collage */}
                    <div className="lg:col-span-5 relative w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5] flex items-center justify-center">
                        <motion.div 
                            className="relative w-full h-full max-w-[420px] lg:max-w-none"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.3 }}
                        >
                            {/* Main lifestyle product image (top-right focused) */}
                            <div className="absolute top-0 right-0 w-[82%] h-[78%] rounded-2xl overflow-hidden shadow-2xl border border-border/20 z-10 group">
                                <Image
                                    src="/images/lifestyle.png"
                                    alt="Cofre y marroquinería de lujo en cuero"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                    priority
                                />
                            </div>

                            {/* Workshop action image (bottom-left focused, overlapping) */}
                            <div className="absolute bottom-0 left-0 w-[55%] h-[50%] rounded-2xl overflow-hidden shadow-2xl border-4 border-[#FBF8F3] dark:border-[#251D13] z-20 group">
                                <Image
                                    src="/images/workshop.png"
                                    alt="Artesano trabajando el cuero en nuestro taller"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                />
                            </div>

                            {/* Handmade Floating Badge */}
                            <motion.div 
                                className="absolute -bottom-4 right-10 bg-accent text-accent-foreground px-5 py-3 shadow-lg z-30 flex flex-col items-center justify-center"
                                style={{ transform: "rotate(3deg)" }}
                                whileHover={{ scale: 1.05, rotate: "0deg" }}
                                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                            >
                                <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-90 leading-none">Hecho a Mano</span>
                                <span className="text-sm font-serif font-semibold mt-1">Garantía Local</span>
                            </motion.div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    )
}

