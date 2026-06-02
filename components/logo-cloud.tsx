"use client"

import { motion } from "framer-motion"

const clients = [
    { name: "VALOIS GROUP", type: "Marca Corporativa" },
    { name: "KREISLER CORP", type: "Identidad Empresarial" },
    { name: "LUMINA CO", type: "Lanzamiento Institucional" },
    { name: "VITALIS", type: "Edición Especial" },
    { name: "NORDIC", type: "Desarrollo a Medida" },
    { name: "ELEVATE", type: "Regalo Ejecutivo" }
]

export function LogoCloud() {
    return (
        <section className="py-16 bg-[#F5EFE6]/40 border-b border-[#DDC8A6]/30">
            <div className="container px-4 sm:px-8 mx-auto">
                <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
                    <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#92764D]">
                        Trayectoria B2B
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold font-serif tracking-tight text-[#251D13]">
                        Empresas que confían en nuestros desarrollos
                    </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-center">
                    {clients.map((client, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.08 }}
                            className="flex flex-col items-center justify-center p-6 bg-[#FBF8F3] border border-[#DDC8A6]/30 rounded-xl hover:border-[#92764D]/50 transition-all duration-300 group cursor-default h-24 shadow-sm"
                        >
                            {/* High fidelity luxury text logo simulation */}
                            <span className="text-sm font-bold tracking-[0.18em] text-[#251D13]/70 group-hover:text-[#92764D] transition-colors duration-300 font-sans text-center">
                                {client.name}
                            </span>
                            <span className="text-[8px] font-medium tracking-[0.05em] text-[#92764D]/60 uppercase mt-1 group-hover:text-[#251D13]/85 transition-colors duration-300">
                                {client.type}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
