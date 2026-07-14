"use client"

import { Reveal } from "./reveal"
import { motion } from "framer-motion"

// Custom premium SVG Icons to represent the engraving/customization techniques
function SerigrafiaIcon() {
    return (
        <svg className="w-8 h-8 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {/* Silk screen printing frame */}
            <rect x="3" y="3" width="18" height="18" rx="1.5" strokeWidth="1.5" className="opacity-90" />
            {/* Screen mesh indicator */}
            <path d="M3 8h18M3 16h18M8 3v18M16 3v18" strokeWidth="1" strokeDasharray="1 3" className="opacity-30" />
            {/* Squeegee handle & rubber blade */}
            <path d="M5 6h14v2.5H5z" fill="currentColor" fillOpacity="0.1" strokeWidth="1.5" />
            <path d="M12 8.5v3.5M9 12h6" strokeWidth="1.5" strokeLinecap="round" />
            {/* Ink sweep path */}
            <path d="M5 16.5c3-1.5 5-1.5 8 0s4 1.5 6 0" strokeWidth="2.5" strokeLinecap="round" className="text-[#856a43]/80" />
        </svg>
    )
}

function LaserIcon() {
    return (
        <svg className="w-8 h-8 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {/* Laser head/nozzle */}
            <path d="M12 3v6" strokeWidth="2" strokeLinecap="round" />
            <path d="M9 5h6" strokeWidth="1.5" strokeLinecap="round" />
            {/* Laser cone */}
            <path d="M10 9l2 3.5 2-3.5" strokeWidth="1" strokeLinejoin="round" className="opacity-50" />
            {/* Focused light beam */}
            <path d="M12 11.5v4" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="1 1" />
            {/* Precision point & spark effects */}
            <circle cx="12" cy="18.5" r="1" fill="currentColor" />
            <path d="M7 18.5h3M14 18.5h3" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M12 16v1M10 17l.5.5M14 17l-.5.5" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    )
}

function BajoRelieveIcon() {
    return (
        <svg className="w-8 h-8 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {/* Upper mechanical stamp/press machine plate */}
            <path d="M4 4h16v2.5H4z" fill="currentColor" fillOpacity="0.1" strokeWidth="1.5" />
            {/* Press pistons */}
            <path d="M8 6.5v3M16 6.5v3" strokeWidth="1.5" />
            {/* Die mold (Cuño metal) */}
            <path d="M7 9.5h10l-1.5 4h-7l-1.5-4z" fill="currentColor" fillOpacity="0.2" strokeWidth="1.5" />
            {/* Material layer showing physical indentation (bajo relieve) */}
            <path d="M3 20h3.5v-2h11v2H21" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            {/* Pressure downward arrows */}
            <path d="M12 5.5v3m0 0l-1-1m1 1l1-1" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
    )
}

function AltaFrecuenciaIcon() {
    return (
        <svg className="w-8 h-8 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {/* Mechanical press head */}
            <path d="M5 5h14v2H5z" fill="currentColor" fillOpacity="0.1" strokeWidth="1.5" />
            {/* High frequency wave representations (oscillating sine waves) */}
            <path d="M4 12c1.5-3 2.5-3 4 0s2.5 3 4 0 2.5-3 4 0 2.5 3 4 0" strokeWidth="1.5" strokeLinecap="round" className="text-[#856a43]/80" />
            {/* Base material pressed */}
            <path d="M3 18h18" strokeWidth="2" strokeLinecap="round" />
            {/* Heat indicator lines radiating from the waves */}
            <path d="M8 15v1M12 15v1M16 15v1" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    )
}

const techniques = [
    {
        icon: SerigrafiaIcon,
        title: "Serigrafía",
        subtitle: "Colores exactos y planos",
        description: "Excelente para logotipos que requieren colores corporativos específicos (Pantone) sobre telas o cuero. Ofrece un acabado liso de alta opacidad y gran resistencia al desgaste cotidiano.",
        materials: "telas o cuero",
        features: ["Fidelidad cromática Pantone", "Acabado liso y opaco", "Ideal para áreas medianas/grandes"]
    },
    {
        icon: LaserIcon,
        title: "Grabado Láser",
        subtitle: "Precisión milimétrica digital",
        description: "Tecnología que graba y contrasta la superficie mediante un haz de luz de alta precisión. Perfecto para logotipos intrincados, tipografías de tamaño reducido y detalles complejos. Aporta un acabado sobrio y permanente.",
        materials: "cuero",
        features: ["Nitidez y definición extrema", "Marcado indeleble", "Excelente para detalles finos"]
    },
    {
        icon: BajoRelieveIcon,
        title: "Bajo Relieve",
        subtitle: "Distinción tradicional a presión",
        description: "La técnica clásica y más prestigiosa del taller. Mediante calor y presión con un cuño, el diseño se hunde físicamente en el cuero. Disponible en seco o con foil dorado/plateado.",
        materials: "cuero",
        features: ["Textura física tridimensional", "Elegancia tradicional atemporal", "Opción de foil metálico (hot-stamping)"]
    },
    {
        icon: AltaFrecuenciaIcon,
        title: "Alta Frecuencia",
        subtitle: "Relieve termosellado en volumen",
        description: "Termosellado de gran definición que utiliza presión y ondas electromagnéticas. Moldea el material de forma permanente creando un relieve con volumen tridimensional exacto, ideal para marcas en telas vinílicas o cuero.",
        materials: "telas, telas vinílicas o cuero",
        features: ["Termosellado de precisión", "Relieve y volumen definidos", "Resistencia extrema a la fricción"]
    }
]

export function CustomizationSection() {
    return (
        <section id="personalizacion" className="py-24 bg-[#FBF8F3] dark:bg-[#251D13] border-b border-[#DDC8A6]/20 scroll-mt-24 font-sans">
            <div className="container px-4 sm:px-8 mx-auto">
                
                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
                    <Reveal width="100%">
                        <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#856a43] block">
                            Servicios de Personalización
                        </span>
                    </Reveal>
                    <Reveal width="100%" delay={0.1}>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-[#251D13] dark:text-[#DDC8A6]">
                            Técnicas de Grabado
                        </h2>
                    </Reveal>
                    <Reveal width="100%" delay={0.2}>
                        {/* Mandatory Descriptive Copy */}
                        <p className="text-base sm:text-lg lg:text-xl text-[#251D13]/85 dark:text-[#DDC8A6]/85 max-w-2xl mx-auto leading-relaxed italic font-serif border-l-2 border-[#856a43] pl-4 sm:pl-6 text-left my-6">
                            "Te asesoramos sobre la técnica de grabado ideal según el tipo de tela o cuero y el color que elijas para tu proyecto, asegurando el mejor acabado para tu marca."
                        </p>
                    </Reveal>
                </div>

                {/* 4-Card Grid Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto">
                    {techniques.map((tech, idx) => {
                        const IconComponent = tech.icon
                        return (
                            <Reveal key={idx} width="100%" delay={0.15 * (idx + 1)} className="h-full">
                                <motion.div
                                    whileHover={{ y: -6 }}
                                    transition={{ duration: 0.3 }}
                                    className="relative flex flex-col justify-between p-6 bg-[#F5EFE6]/40 dark:bg-[#2e261a]/40 border border-[#DDC8A6]/40 dark:border-[#57472B]/60 rounded-2xl hover:border-[#856a43] dark:hover:border-[#856a43]/80 hover:shadow-lg transition-all duration-300 group h-full"
                                >
                                    <div>
                                        {/* Icon Wrapper */}
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="p-3 bg-[#FBF8F3] dark:bg-[#251D13] border border-[#DDC8A6]/40 dark:border-[#57472B]/50 rounded-xl text-[#856a43] group-hover:bg-[#251D13] dark:group-hover:bg-[#DDC8A6] group-hover:text-[#DDC8A6] dark:group-hover:text-[#251D13] transition-all duration-500 shadow-sm">
                                                <IconComponent />
                                            </div>
                                            <span className="text-xs font-bold tracking-wider text-[#856a43]/60 uppercase bg-[#FBF8F3] dark:bg-[#251D13] border border-[#DDC8A6]/30 dark:border-[#57472B]/30 px-2 py-0.5 rounded-full">
                                                Técnica 0{idx + 1}
                                            </span>
                                        </div>

                                        {/* Titles */}
                                        <h3 className="text-lg sm:text-xl font-serif font-bold text-[#251D13] dark:text-[#DDC8A6] mb-1 group-hover:text-[#856a43] transition-colors">
                                            {tech.title}
                                        </h3>
                                        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#856a43] mb-3">
                                            {tech.subtitle}
                                        </p>

                                        {/* Description */}
                                        <p className="text-xs sm:text-sm text-[#251D13]/70 dark:text-[#DDC8A6]/70 leading-relaxed font-sans font-normal mb-6">
                                            {tech.description}
                                        </p>
                                    </div>

                                    {/* Footer details of the card */}
                                    <div className="border-t border-[#DDC8A6]/20 dark:border-[#57472B]/30 pt-4 space-y-3">
                                        <div className="text-xs text-[#251D13]/60 dark:text-[#DDC8A6]/60">
                                            <span className="font-bold uppercase tracking-wider block mb-1 text-[9px]">Apto para:</span>
                                            <span className="font-sans font-medium text-xs text-[#251D13] dark:text-[#DDC8A6]">{tech.materials}</span>
                                        </div>

                                        <ul className="space-y-1.5 pt-1">
                                            {tech.features.map((feat, fIdx) => (
                                                <li key={fIdx} className="flex items-center gap-1.5 text-xs text-[#251D13]/80 dark:text-[#DDC8A6]/80 font-sans font-medium">
                                                    <span className="w-1 h-1 rounded-full bg-[#856a43] shrink-0" />
                                                    <span>{feat}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            </Reveal>
                        )
                    })}
                </div>

            </div>
        </section>
    )
}
