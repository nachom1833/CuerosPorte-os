import Link from "next/link"
import Image from "next/image"
import { ShoppingBag } from "lucide-react"

export function SiteHeader() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/20 bg-background/85 backdrop-blur-md">
            <div className="container flex h-24 items-center justify-between px-4 sm:px-8">
                <Link href="/" className="mr-6 flex items-center">
                    <Image 
                        src="/logo-principal-color-marron-oscuro.svg" 
                        alt="Cueros Porteños" 
                        width={2725} 
                        height={1981} 
                        className="object-contain h-14 sm:h-16 w-auto"
                        priority
                    />
                </Link>
                <nav className="flex items-center space-x-6 text-sm font-semibold">
                    <Link href="/catalogo" className="transition-colors hover:text-accent text-foreground/80">
                        Catálogo
                    </Link>
                    <Link href="/admin" className="transition-colors hover:text-accent text-foreground/80">
                        Admin
                    </Link>
                </nav>
            </div>
        </header>
    )
}
