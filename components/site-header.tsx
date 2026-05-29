import Link from "next/link"
import Image from "next/image"
import { ShoppingBag } from "lucide-react"

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

                {/* Right: Catalog Navigation */}
                <Link 
                    href="/catalogo" 
                    className="text-sm font-semibold transition-colors hover:text-accent text-foreground/80 tracking-wide uppercase"
                >
                    Catálogo
                </Link>
            </div>
        </header>
    )
}
