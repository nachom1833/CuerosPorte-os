"use client"

import Image from "next/image"
import { LazyMap } from "./lazy-map"
import { Reveal } from "./reveal"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
    Gem, Hammer, ShieldCheck, MapPin, Clock,
    Mail, Instagram, Heart, MessageSquare,
    ArrowUpRight, ArrowRight
} from "lucide-react"

export function AboutSection() {
    return (
        <section className="py-24 bg-secondary/5 dark:bg-[#251D13] space-y-32 overflow-hidden font-sans">
            <div className="container px-4 sm:px-8 mx-auto space-y-32">

                {/* Section 1: Philosophy - Image Left, Text Right */}
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
                    <div className="relative w-full lg:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-border/10">
                        <Reveal width="100%" className="h-full">
                            <Image
                                src="/images/products/carpeta con cierre.jpeg"
                                alt="Carpeta con cierre de cuero en taller"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 580px"
                                className="object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </Reveal>
                    </div>
                    <div className="w-full lg:w-1/2 space-y-6">
                        <Reveal>
                            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#856a43]">Filosofía Corporativa</span>
                        </Reveal>
                        <Reveal delay={0.1}>
                            <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-tight text-foreground leading-tight">
                                Exclusividad y Distinción <br />para tu Marca
                            </h2>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <p className="text-lg text-foreground/80 leading-relaxed font-sans font-normal">
                                En Cueros Porteños, diseñamos soluciones de marroquinería que materializan el prestigio de tu empresa. Entendemos que cada obsequio corporativo, artículo de recordación o desarrollo promocional premium debe reflejar excelencia.
                            </p>
                        </Reveal>
                    </div>
                </div>

                {/* Section 2: Workshop - Text Left, Image Right */}
                <div id="taller" className="scroll-mt-24 flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-24">
                    <div className="relative w-full lg:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-border/10">
                        <Reveal width="100%" className="h-full">
                            <Image
                                src="/images/products/portanotebook.jpeg"
                                alt="Porta notebook de cuero"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 580px"
                                className="object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </Reveal>
                    </div>
                    <div className="w-full lg:w-1/2 space-y-6">
                        <Reveal>
                            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#856a43]">Trayectoria Industrial</span>
                        </Reveal>
                        <Reveal delay={0.1}>
                            <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-tight text-foreground leading-tight">
                                31 Años de Maestría al Servicio de tu Empresa
                            </h2>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <p className="text-lg text-foreground/80 leading-relaxed font-sans font-normal">
                                Cada pieza nace de manera directa en nuestro taller de Villa Luro, Buenos Aires, fabricada bajo estrictos estándares corporativos. Con más de tres décadas de trayectoria, seleccionamos personalmente cuero y herrajes macizos para garantizar piezas únicas de máxima durabilidad, personalizadas según los requerimientos específicos de tu marca.
                            </p>
                        </Reveal>
                    </div>
                </div>

                {/* Section 3: Google Maps Embed (WHERE TO FIND US) */}
                <div id="ubicacion" className="space-y-8 scroll-mt-24">
                    <div className="text-center max-w-xl mx-auto space-y-3">
                        <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#856a43]">
                            Taller
                        </span>
                        <h2 className="text-3xl font-serif font-bold text-[#251D13]">
                            Dónde encontrarnos
                        </h2>
                    </div>
                    
                    <div className="relative w-full h-[450px] rounded-2xl overflow-hidden border border-[#DDC8A6]/40 shadow-lg bg-[#F5EFE6]">
                        <LazyMap />
                    </div>
                </div>

                {/* Section 4: Instagram Feed Gallery (SOCIAL PROOF) - Commented out as requested */}
                {/* 
                <div className="space-y-8">
                    <div className="text-center max-w-xl mx-auto space-y-3">
                        <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#57472B] dark:text-[#DDC8A6]">Nuestra Comunidad</span>
                        <h3 className="text-3xl font-serif font-bold text-foreground">El Proceso en Instagram</h3>
                        <p className="text-foreground/80 leading-relaxed text-sm sm:text-base">
                            Seguí nuestro día a día, lanzamientos exclusivos y el detrás de escena del taller marroquinero.
                        </p>
                        <a
                            href="https://www.instagram.com/cueros_port"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-[#57472B] dark:text-[#DDC8A6] hover:underline font-semibold text-sm pt-1"
                        >
                            @cueros_port <ArrowRight className="h-3.5 w-3.5" />
                        </a>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <a
                            href="https://www.instagram.com/cueros_port"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative aspect-square rounded-xl overflow-hidden shadow bg-secondary/20 border border-border/30 bg-secondary/10"
                        >
                            <Image
                                src="/images/products/portafolio 1 fuelle.jpeg"
                                alt="Portafolio de cuero en mesa de trabajo"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 text-primary-foreground">
                                <div className="flex items-center gap-1.5">
                                    <Heart className="h-5 w-5 fill-primary-foreground" />
                                    <span className="font-semibold text-sm">184</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <MessageSquare className="h-5 w-5 fill-primary-foreground" />
                                    <span className="font-semibold text-sm">24</span>
                                </div>
                            </div>
                        </a>

                        <a
                            href="https://www.instagram.com/cueros_port"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative aspect-square rounded-xl overflow-hidden shadow bg-secondary/20 border border-border/30 bg-secondary/10"
                        >
                            <Image
                                src="/images/products/tote bag rigida.jpeg"
                                alt="Tote Bag Rígida de cuero"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 text-primary-foreground">
                                <div className="flex items-center gap-1.5">
                                    <Heart className="h-5 w-5 fill-primary-foreground" />
                                    <span className="font-semibold text-sm">215</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <MessageSquare className="h-5 w-5 fill-primary-foreground" />
                                    <span className="font-semibold text-sm">19</span>
                                </div>
                            </div>
                        </a>

                        <a
                            href="https://www.instagram.com/cueros_port"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative aspect-square rounded-xl overflow-hidden shadow bg-secondary/20 border border-border/30 bg-secondary/10"
                        >
                            <Image
                                src="/images/products/bandolera.jpeg"
                                alt="Bandolera de cuero en producción"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 text-primary-foreground">
                                <div className="flex items-center gap-1.5">
                                    <Heart className="h-5 w-5 fill-primary-foreground" />
                                    <span className="font-semibold text-sm">312</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <MessageSquare className="h-5 w-5 fill-primary-foreground" />
                                    <span className="font-semibold text-sm">43</span>
                                </div>
                            </div>
                        </a>

                        <a
                            href="https://www.instagram.com/cueros_port"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative aspect-square rounded-xl overflow-hidden shadow bg-secondary/20 border border-border/30 bg-secondary/10"
                        >
                            <Image
                                src="/images/products/necesaire.jpeg"
                                alt="Detalle del pulido de bordes de un neceser"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 text-primary-foreground">
                                <div className="flex items-center gap-1.5">
                                    <Heart className="h-5 w-5 fill-primary-foreground" />
                                    <span className="font-semibold text-sm">167</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <MessageSquare className="h-5 w-5 fill-primary-foreground" />
                                    <span className="font-semibold text-sm">12</span>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                */}

                {/* Section 5: Values - 3 Columns with High-End Icons */}
                {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16 border-t border-b border-border/50">
                    <Reveal width="100%" delay={0.1}>
                        <div className="text-center space-y-4 p-6 group">
                            <div className="w-14 h-14 bg-accent/10 text-[#57472B] dark:text-[#DDC8A6] rounded-full flex items-center justify-center mx-auto border border-accent/20 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
                                <Gem className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-semibold text-foreground">Materiales Nobles</h3>
                            <p className="text-muted-foreground leading-relaxed font-sans font-normal text-sm sm:text-base">
                                Solo utilizamos cuero de primera calidad y herrajes de bronce macizo seleccionados.
                            </p>
                        </div>
                    </Reveal>

                    <Reveal width="100%" delay={0.2}>
                        <div className="text-center space-y-4 p-6 border-l-0 md:border-l md:border-r border-border/50 group">
                            <div className="w-14 h-14 bg-accent/10 text-[#57472B] dark:text-[#DDC8A6] rounded-full flex items-center justify-center mx-auto border border-accent/20 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
                                <Hammer className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-semibold text-foreground">Hecho a Mano</h3>
                            <p className="text-muted-foreground leading-relaxed font-sans font-normal text-sm sm:text-base">
                                Sin atajos industriales. Construcción marroquinera tradicional que garantiza la máxima durabilidad.
                            </p>
                        </div>
                    </Reveal>

                    <Reveal width="100%" delay={0.3}>
                        <div className="text-center space-y-4 p-6 group">
                            <div className="w-14 h-14 bg-accent/10 text-[#57472B] dark:text-[#DDC8A6] rounded-full flex items-center justify-center mx-auto border border-accent/20 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
                                <ShieldCheck className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-semibold text-foreground">Garantía Porteña</h3>
                            <p className="text-muted-foreground leading-relaxed font-sans font-normal text-sm sm:text-base">
                                Respaldamos de por vida la costura y terminación de cada uno de los productos de nuestro taller.
                            </p>
                        </div>
                    </Reveal>
                </div> */}

            </div>
        </section>
    )
}
