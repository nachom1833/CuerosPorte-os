"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function Hero() {
    return (
        <section className="relative w-full h-[80vh] flex items-center bg-muted/20 overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/hero.png"
                    alt="Artisan Leather Bag"
                    fill
                    className="object-cover opacity-90"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent via-background/40" />
            </div>

            <div className="container relative z-10 px-4 sm:px-8">
                <div className="max-w-xl space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl font-serif font-bold tracking-tight sm:text-6xl text-foreground">
                            Artesanía en Cuero <br />
                            <span className="text-muted-foreground italic">Diseño Atemporal</span>
                        </h1>
                    </motion.div>

                    <motion.p
                        className="text-lg text-foreground/80"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Descubrí nuestra colección exclusiva de marroquinería hecha a mano.
                        Calidad, textura y durabilidad en cada pieza.
                    </motion.p>

                    <motion.div
                        className="flex flex-wrap gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <Button asChild size="lg" className="rounded-full px-8 text-base shadow-lg hover:shadow-xl transition-all">
                            <Link href="/catalogo">Ver Catálogo</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="rounded-full px-8 text-base bg-background/50 backdrop-blur-sm border-foreground/10 hover:bg-background/80">
                            <Link href="/catalogo?category=bolsos">Colección Bolsos</Link>
                        </Button>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
