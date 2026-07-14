"use client"

import { Send, DraftingCompass, Award, ChevronRight } from "lucide-react"

const steps = [
    {
        num: "01",
        icon: Send,
        title: "Acompañamiento en la idea",
        description: "Te asesoramos desde la concepción del producto hasta el diseño final."
    },
    {
        num: "02",
        icon: DraftingCompass,
        title: "Selección y Personalización",
        description: "Trabajamos en conjunto en la selección de materiales, herrajes y métodos de grabado para reflejar tu identidad corporativa."
    },
    {
        num: "03",
        icon: Award,
        title: "Desarrollo",
        description: "Respaldados por nuestros 31 años de experiencia, garantizamos calidad premium en cada lanzamiento."
    }
]

export function HowItWorks() {
    return (
        <section className="py-24 bg-[#FBF8F3] border-b border-[#DDC8A6]/20">
            <div className="container px-4 sm:px-8 mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                    <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#856a43]">
                        Proceso de Trabajo B2B
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold font-serif tracking-tight text-[#251D13]">
                        Cómo te acompañamos en tu lanzamiento
                    </h2>
                    <p className="text-[#251D13]/70 text-sm sm:text-base max-w-lg mx-auto">
                        Un proceso sincronizado y diseñado para integrar la excelencia marroquinera tradicional con la identidad de tu empresa.
                    </p>
                </div>

                <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto">
                    {steps.map((step, idx) => {
                        const Icon = step.icon
                        return (
                            <div key={idx} className="relative flex flex-col items-start p-8 bg-[#F5EFE6]/60 border border-[#DDC8A6]/40 rounded-2xl hover:border-[#856a43]/50 transition-all duration-300 group h-full">
                                {/* Connector arrows for larger screens */}
                                {idx < 2 && (
                                    <div className="hidden lg:block absolute -right-6 top-1/2 -translate-y-1/2 z-20 text-[#DDC8A6] group-hover:text-[#856a43]/30 transition-colors">
                                        <ChevronRight className="h-8 w-8 stroke-1" />
                                    </div>
                                )}

                                <div className="flex justify-between items-center w-full mb-6">
                                    <div className="p-3 bg-[#FBF8F3] border border-[#DDC8A6]/40 rounded-xl text-[#856a43] group-hover:bg-[#251D13] group-hover:text-[#DDC8A6] transition-all duration-500 shadow-sm">
                                        <Icon className="h-6 w-6 stroke-1.5" />
                                    </div>
                                    <span className="text-4xl font-bold tracking-tight text-[#856a43]/15 select-none font-serif">
                                        {step.num}
                                    </span>
                                </div>

                                <h3 className="text-lg font-bold font-serif text-[#251D13] mb-3 group-hover:text-[#856a43] transition-colors">
                                    {step.title}
                                </h3>
                                <p className="text-sm text-[#251D13]/70 leading-relaxed font-sans">
                                    {step.description}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
