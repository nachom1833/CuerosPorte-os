"use client"

import Image from "next/image"
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
        <section className="py-24 bg-secondary/5 dark:bg-[#251D13] space-y-32 overflow-hidden">
            <div className="container px-4 sm:px-8 mx-auto space-y-32">

                {/* Section 1: Philosophy - Image Left, Text Right */}
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
                    <div className="relative w-full lg:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-border/10">
                        <Reveal width="100%" className="h-full">
                            <Image
                                src="/images/lifestyle.png"
                                alt="Classic leather briefcase on vintage table"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </Reveal>
                    </div>
                    <div className="w-full lg:w-1/2 space-y-6">
                        <Reveal>
                            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">Nuestra Filosofía</span>
                        </Reveal>
                        <Reveal delay={0.1}>
                            <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-tight text-foreground leading-tight">
                                Elegancia Atemporal.<br />Calidad Intransigente.
                            </h2>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <p className="text-lg text-foreground/80 leading-relaxed">
                                En Cueros Porteños, creemos que los objetos que nos acompañan a diario deben ser más que funcionales; deben contar una historia.
                                Nos inspiramos en la tradición marroquinera clásica, fusionándola con un diseño minimalista y contemporáneo para crear piezas que envejecen con gracia.
                            </p>
                        </Reveal>
                    </div>
                </div>

                {/* Section 2: Workshop - Text Left, Image Right */}
                <div id="taller" className="scroll-mt-24 flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-24">
                    <div className="relative w-full lg:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-border/10">
                        <Reveal width="100%" className="h-full">
                            <Image
                                src="/images/workshop.png"
                                alt="Artisan working in leather workshop"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </Reveal>
                    </div>
                    <div className="w-full lg:w-1/2 space-y-6">
                        <Reveal>
                            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">El Taller</span>
                        </Reveal>
                        <Reveal delay={0.1}>
                            <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-tight text-foreground leading-tight">
                                Maestría Artesanal desde Buenos Aires
                            </h2>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <p className="text-lg text-foreground/80 leading-relaxed">
                                Cada pieza nace en nuestro taller en el histórico barrio de San Telmo. Seleccionamos personalmente los mejores cueros de curtiembre vegetal, respetando sus marcas naturales que hacen a cada producto único.
                                Nuestros artesanos cortan, cosen y terminan cada borde a mano, dedicando horas a perfeccionar los detalles que la producción masiva pasa por alto.
                            </p>
                        </Reveal>
                    </div>
                </div>

                {/* Section 3: Showroom & CSS Interactive Map (TRUST FACTOR) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-[#F5EFE6] dark:bg-[#2C2419] p-8 sm:p-12 rounded-3xl border border-border/30 shadow-sm">
                    <div className="lg:col-span-6 space-y-6">
                        <span className="text-xs font-bold tracking-[0.25em] uppercase text-accent">Encontranos</span>
                        <h3 className="text-3xl font-serif font-bold text-foreground">Nuestro Atelier & Showroom</h3>
                        <p className="text-foreground/80 leading-relaxed">
                            Te invitamos a conocer de cerca las texturas, aromas y detalles de nuestras colecciones en pleno corazón de Buenos Aires. Agendá tu visita personalizada y observá el proceso artesanal en vivo.
                        </p>
                        
                        <div className="space-y-4 pt-2">
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-background rounded-lg border border-border/40 text-accent">
                                    <MapPin className="h-5 w-5" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-foreground">Dirección del Atelier</h4>
                                    <p className="text-sm text-foreground/70">Defensa 852, San Telmo, CABA, Argentina</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-background rounded-lg border border-border/40 text-accent">
                                    <Clock className="h-5 w-5" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-foreground">Horarios de Atención</h4>
                                    <p className="text-sm text-foreground/70">Lunes a Sábados de 10:00 a 19:00 hs</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-background rounded-lg border border-border/40 text-accent">
                                    <Mail className="h-5 w-5" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-foreground">Canal de Contacto</h4>
                                    <p className="text-sm text-foreground/70">contacto@cuerosportenos.com.ar</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 flex flex-wrap gap-4">
                            <Button asChild className="rounded-full px-6 bg-primary text-primary-foreground hover:bg-primary/90">
                                <a 
                                    href="https://wa.me/5491134567890?text=Hola!%20Me%20gustar%C3%ADa%20agendar%20una%20visita%20a%20su%20taller%20en%20San%20Telmo." 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2"
                                >
                                    Agendar Visita (WhatsApp)
                                    <ArrowRight className="h-4 w-4" />
                                </a>
                            </Button>
                        </div>
                    </div>

                    <div className="lg:col-span-6">
                        {/* High Fidelity CSS-Styled Map Component */}
                        <div className="relative w-full h-[380px] bg-[#E8DFC8] dark:bg-[#3A3022] rounded-2xl overflow-hidden border border-border shadow-inner flex flex-col justify-between p-6">
                            
                            {/* Street Lines - Defensa Street */}
                            <div className="absolute top-[42%] left-0 right-0 h-10 bg-background/40 dark:bg-background/10 border-t border-b border-border/30 flex items-center justify-start px-8 pointer-events-none">
                                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-foreground/40 dark:text-foreground/30">Calle Defensa</span>
                            </div>
                            
                            {/* Street Lines - Humberto 1 */}
                            <div className="absolute left-[38%] top-0 bottom-0 w-10 bg-background/40 dark:bg-background/10 border-l border-r border-border/30 flex items-center justify-start py-8 [writing-mode:vertical-lr] pointer-events-none">
                                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-foreground/40 dark:text-foreground/30">Humberto I</span>
                            </div>

                            {/* Street Lines - Carlos Calvo */}
                            <div className="absolute left-[78%] top-0 bottom-0 w-10 bg-background/40 dark:bg-background/10 border-l border-r border-border/30 flex items-center justify-start py-8 [writing-mode:vertical-lr] pointer-events-none">
                                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-foreground/40 dark:text-foreground/30">Carlos Calvo</span>
                            </div>

                            {/* Nearby landmark banner - Plaza Dorrego */}
                            <div className="absolute top-[8%] left-[6%] w-[25%] h-[24%] bg-accent/15 border border-accent/25 rounded-lg flex flex-col items-center justify-center p-2 text-center pointer-events-none">
                                <span className="text-[8px] font-bold tracking-wider uppercase text-accent">Plaza</span>
                                <span className="text-[10px] font-serif font-semibold text-foreground/75 leading-tight">Dorrego</span>
                            </div>

                            {/* MAP PIN MARKER - Cueros Porteños */}
                            <div className="absolute top-[34%] left-[52%] z-20 flex flex-col items-center">
                                {/* Pulsing Ring */}
                                <div className="absolute -top-1 w-10 h-10 bg-accent/20 rounded-full animate-ping" />
                                
                                <div className="relative bg-primary text-primary-foreground p-2 rounded-full shadow-lg border border-accent flex items-center justify-center">
                                    <MapPin className="h-5 w-5 text-accent animate-bounce" />
                                </div>
                                <div className="mt-1 bg-primary text-primary-foreground dark:bg-background dark:text-foreground px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase shadow-md border border-border/40 whitespace-nowrap">
                                    Cueros Porteños Taller
                                </div>
                            </div>

                            {/* Header Label inside Map */}
                            <div className="z-10 bg-background/95 dark:bg-[#251D13]/95 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-border/40 max-w-[240px] shadow-md flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-xs font-semibold text-foreground">Taller Abierto Hoy</span>
                            </div>

                            {/* Footer link inside Map */}
                            <div className="z-10 w-full flex justify-end">
                                <Button asChild size="sm" variant="secondary" className="rounded-full bg-background/90 dark:bg-primary/90 text-foreground hover:bg-background shadow border border-border/30">
                                    <a 
                                        href="https://maps.google.com/?q=Defensa+852+San+Telmo+Buenos+Aires" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1.5 text-xs font-semibold"
                                    >
                                        Cómo llegar
                                        <ArrowUpRight className="h-3.5 w-3.5" />
                                    </a>
                                </Button>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Section 4: Instagram Feed Gallery (SOCIAL PROOF) */}
                <div className="space-y-8">
                    <div className="text-center max-w-xl mx-auto space-y-3">
                        <span className="text-xs font-bold tracking-[0.25em] uppercase text-accent">Nuestra Comunidad</span>
                        <h3 className="text-3xl font-serif font-bold text-foreground">El Proceso en Instagram</h3>
                        <p className="text-foreground/80 leading-relaxed text-sm sm:text-base">
                            Seguí nuestro día a día, lanzamientos exclusivos y el detrás de escena del taller marroquinero.
                        </p>
                        <a 
                            href="https://instagram.com/cuerosportenos" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="inline-flex items-center gap-2 text-accent hover:underline font-semibold text-sm pt-1"
                        >
                            @cuerosportenos <ArrowRight className="h-3.5 w-3.5" />
                        </a>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {/* Feed Item 1 */}
                        <a 
                            href="https://instagram.com/cuerosportenos" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="group relative aspect-square rounded-xl overflow-hidden shadow bg-secondary/20 border border-border/30"
                        >
                            <Image 
                                src="/images/products/portafolio 1 fuelle.jpeg" 
                                alt="Portafolio de cuero artesanal en mesa de trabajo"
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

                        {/* Feed Item 2 */}
                        <a 
                            href="https://instagram.com/cuerosportenos" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="group relative aspect-square rounded-xl overflow-hidden shadow bg-secondary/20 border border-border/30"
                        >
                            <Image 
                                src="/images/products/tote bag rigida.jpeg" 
                                alt="Tote Bag Rígida de cuero de curtido vegetal"
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

                        {/* Feed Item 3 */}
                        <a 
                            href="https://instagram.com/cuerosportenos" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="group relative aspect-square rounded-xl overflow-hidden shadow bg-secondary/20 border border-border/30"
                        >
                            <Image 
                                src="/images/workshop.png" 
                                alt="Artesano midiendo cuero genuino en el taller"
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

                        {/* Feed Item 4 */}
                        <a 
                            href="https://instagram.com/cuerosportenos" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="group relative aspect-square rounded-xl overflow-hidden shadow bg-secondary/20 border border-border/30"
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

                {/* Section 5: Values - 3 Columns with High-End Icons */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16 border-t border-b border-border/50">
                    <Reveal width="100%" delay={0.1}>
                        <div className="text-center space-y-4 p-6 group">
                            <div className="w-14 h-14 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto border border-accent/20 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
                                <Gem className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-semibold text-foreground">Materiales Nobles</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Solo utilizamos cuero 100% genuino de primera calidad y herrajes de bronce macizo seleccionados.
                            </p>
                        </div>
                    </Reveal>
                    
                    <Reveal width="100%" delay={0.2}>
                        <div className="text-center space-y-4 p-6 border-l-0 md:border-l md:border-r border-border/50 group">
                            <div className="w-14 h-14 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto border border-accent/20 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
                                <Hammer className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-semibold text-foreground">Hecho a Mano</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Sin atajos industriales. Construcción marroquinera tradicional que garantiza la máxima durabilidad.
                            </p>
                        </div>
                    </Reveal>
                    
                    <Reveal width="100%" delay={0.3}>
                        <div className="text-center space-y-4 p-6 group">
                            <div className="w-14 h-14 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto border border-accent/20 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
                                <ShieldCheck className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-semibold text-foreground">Garantía Porteña</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Respaldamos de por vida la costura y terminación de cada uno de los productos de nuestro taller.
                            </p>
                        </div>
                    </Reveal>
                </div>

            </div>
        </section>
    )
}
