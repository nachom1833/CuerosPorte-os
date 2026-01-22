import Link from "next/link"
import { ShoppingBag } from "lucide-react"

export function SiteHeader() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between px-4 sm:px-8">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                    <span className="text-xl font-serif font-bold tracking-tight">CUEROS PORTEÑOS</span>
                </Link>
                <nav className="flex items-center space-x-6 text-sm font-medium">
                    <Link href="/catalogo" className="transition-colors hover:text-foreground/80 text-foreground/60">
                        Catálogo
                    </Link>
                    <Link href="/admin" className="transition-colors hover:text-foreground/80 text-foreground/60">
                        Admin
                    </Link>
                </nav>
            </div>
        </header>
    )
}
