"use client"

import { MessageCircle } from "lucide-react"
import { motion } from "framer-motion"

export function WhatsappBubble() {
    const message = encodeURIComponent(
        "Hola, vengo del sitio web y me gustaría recibir asesoramiento para desarrollar artículos de marroquinería para mi empresa."
    )
    const link = `https://wa.me/541140240594?text=${message}`

    return (
        <motion.div 
            className="fixed bottom-6 right-6 z-50 pointer-events-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
        >
            <a 
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contactar por WhatsApp para asesoramiento B2B"
                className="relative group flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl hover:bg-[#128C7E] transition-colors duration-300"
            >
                {/* Bouncing radar ring */}
                <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping opacity-75 group-hover:animate-none pointer-events-none" />
                
                <MessageCircle className="w-7 h-7 fill-white stroke-none" />

                {/* Micro tooltip on hover */}
                <span className="absolute right-16 bg-[#251D13] text-[#DDC8A6] text-xs font-bold uppercase tracking-wider py-2 px-3 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md border border-[#DDC8A6]/20 shadow-md pointer-events-none">
                    Asesoramiento B2B
                </span>
            </a>
        </motion.div>
    )
}
