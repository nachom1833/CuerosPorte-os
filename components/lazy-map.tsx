"use client"

import { useEffect, useRef, useState } from "react"
import { MapPin } from "lucide-react"

export function LazyMap() {
    const [shouldLoad, setShouldLoad] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShouldLoad(true)
                    observer.disconnect()
                }
            },
            { rootMargin: "300px" } // Load slightly before it comes into view
        )

        if (containerRef.current) {
            observer.observe(containerRef.current)
        }

        return () => {
            observer.disconnect()
        }
    }, [])

    return (
        <div ref={containerRef} className="relative w-full h-full min-h-[450px] bg-[#F5EFE6]/50 flex flex-col items-center justify-center transition-all duration-500">
            {shouldLoad ? (
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.26189912066!2d-58.50155192348512!3d-34.63937765985834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcc9b04486cac7%3A0x526312f73dcf52f4!2sCueros+Porte%C3%B1os+SRL!5e0!3m2!1ses-419!2sar!5m2!1ses-419!2sar" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Mapa de Ubicación de Cueros Porteños en Villa Luro"
                    className="absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out opacity-100"
                />
            ) : (
                <div className="flex flex-col items-center justify-center space-y-3 p-8 text-center animate-pulse">
                    <div className="h-12 w-12 rounded-full bg-[#DDC8A6]/40 flex items-center justify-center text-[#856a43]">
                        <MapPin className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-serif font-bold text-[#251D13]">Mapa interactivo de Villa Luro</p>
                        <p className="text-[11px] text-[#251D13]/60 font-sans font-medium">Cargando ubicación del taller al hacer scroll...</p>
                    </div>
                </div>
            )}
        </div>
    )
}
