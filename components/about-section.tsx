import Image from "next/image"
import { Reveal } from "./reveal"

export function AboutSection() {
    return (
        <section className="py-24 bg-secondary/10">
            <div className="container px-4 sm:px-8 space-y-32">

                {/* Section 1: Philosophy - Image Left, Text Right */}
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
                    <div className="relative w-full lg:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden">
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
                            <span className="text-sm font-semibold tracking-wider uppercase text-muted-foreground">Nuestra Filosofía</span>
                        </Reveal>
                        <Reveal delay={0.1}>
                            <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-tight text-foreground">
                                Elegancia Atemporal.<br />Calidad Intransigente.
                            </h2>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                En Cueros Porteños, creemos que los objetos que nos acompañan a diario deben ser más que funcionales; deben contar una historia.
                                Nos inspiramos en la tradición marroquinera clásica, fusionándola con un diseño minimalista y contemporáneo para crear piezas que envejecen con gracia.
                            </p>
                        </Reveal>
                    </div>
                </div>

                {/* Section 2: Workshop - Text Left, Image Right */}
                <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-24">
                    <div className="relative w-full lg:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden">
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
                    <div className="w-full lg:w-1/2 space-y-6 text-right lg:text-left">
                        <div className="lg:text-right flex flex-col items-end">
                            <Reveal>
                                <span className="text-sm font-semibold tracking-wider uppercase text-muted-foreground">El Taller</span>
                            </Reveal>
                            <Reveal delay={0.1}>
                                <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-tight text-foreground">
                                    Maestría Artesanal
                                </h2>
                            </Reveal>
                            <Reveal delay={0.2}>
                                <p className="text-lg text-muted-foreground leading-relaxed mt-6">
                                    Cada pieza nace en nuestro taller en Buenos Aires. Seleccionamos personalmente los mejores cueros de curtiembre vegetal, respetando sus marcas naturales que hacen a cada producto único.
                                    Nuestros artesanos cortan, cosen y terminan cada borde a mano, dedicando horas a perfeccionar los detalles que la producción masiva pasa por alto.
                                </p>
                            </Reveal>
                        </div>
                    </div>
                </div>

                {/* Section 3: Values - 3 Columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-t border-b border-border/50">
                    <Reveal width="100%" delay={0.1}>
                        <div className="text-center space-y-4 p-6">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary text-xl font-serif">
                                1.
                            </div>
                            <h3 className="text-xl font-semibold">Materiales Nobles</h3>
                            <p className="text-muted-foreground">Solo utilizamos cuero 100% genuino de primera calidad y herrajes de bronce macizo.</p>
                        </div>
                    </Reveal>
                    <Reveal width="100%" delay={0.2}>
                        <div className="text-center space-y-4 p-6 border-l-0 md:border-l md:border-r border-border/50">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary text-xl font-serif">
                                2.
                            </div>
                            <h3 className="text-xl font-semibold">Hecho a Mano</h3>
                            <p className="text-muted-foreground">Sin atajos. Construcción tradicional que garantiza durabilidad de por vida.</p>
                        </div>
                    </Reveal>
                    <Reveal width="100%" delay={0.3}>
                        <div className="text-center space-y-4 p-6">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary text-xl font-serif">
                                3.
                            </div>
                            <h3 className="text-xl font-semibold">Garantía Local</h3>
                            <p className="text-muted-foreground">Estamos orgullosos de nuestra herencia y respaldamos cada producto que vendemos.</p>
                        </div>
                    </Reveal>
                </div>

            </div>
        </section>
    )
}
