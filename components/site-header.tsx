import Link from "next/link"
import Image from "next/image"
import { ShoppingBag } from "lucide-react"

export function SiteHeader() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/20 bg-background/85 backdrop-blur-md">
            <div className="container h-24 px-4 sm:px-8 mx-auto">
                <div className="grid grid-cols-3 h-full items-center w-full">
                    {/* Left Column: Catálogo */}
                    <div className="flex justify-start">
                        <Link 
                            href="/catalogo" 
                            className="text-sm font-semibold transition-colors hover:text-accent text-foreground/80 tracking-wide uppercase"
                        >
                            Catálogo
                        </Link>
                    </div>

                    {/* Center Column: Perfectly Centered Brand Logo */}
                    <div className="flex justify-center items-center">
                        <Link href="/" className="flex items-center justify-center">
                            <Image 
                                src="/logo-principal-color-marron-oscuro.svg" 
                                alt="Cueros Porteños" 
                                width={2725} 
                                height={1981} 
                                className="object-contain h-14 sm:h-16 w-auto transition-transform hover:scale-[1.02] duration-300"
                                priority
                            />
                        </Link>
                    </div>

                    {/* Right Column: Admin */}
                    <div className="flex justify-end">
                        <Link 
                            href="/admin" 
                            className="text-sm font-semibold transition-colors hover:text-accent text-foreground/80 tracking-wide uppercase"
                        >
                            Admin
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}
