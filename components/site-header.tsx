import Link from "next/link"
import Image from "next/image"
import { BookOpen } from "lucide-react"

export function SiteHeader() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/20 bg-background/85 backdrop-blur-md">
            <div className="container flex items-center justify-between px-4 sm:px-8 mx-auto py-2 sm:py-3">
                {/* Left: Premium Large Brand Logo */}
                <Link href="/" className="flex items-center">
                    <Image 
                        src="/logo-principal-color-marron-oscuro.svg" 
                        alt="Cueros Porteños" 
                        width={2725} 
                        height={1981} 
                        className="object-contain h-16 sm:h-20 w-auto transition-transform hover:scale-[1.02] duration-300"
                        priority
                    />
                </Link>

                {/* Right: Catalog Navigation Button */}
                <Link 
                    href="/catalogo" 
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider bg-[#251D13] text-[#DDC8A6] hover:bg-[#92764D] hover:text-white rounded-full transition-all duration-300 shadow-sm hover:shadow-md active:scale-95 cursor-pointer border border-transparent"
                >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Catálogo</span>
                </Link>
            </div>
        </header>
    )
}
