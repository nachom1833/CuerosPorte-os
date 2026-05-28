import Link from "next/link"
import { MapPin, Clock, Mail, Instagram, MessageCircle } from "lucide-react"

export function SiteFooter() {
    return (
        <footer className="bg-primary text-primary-foreground border-t border-border/20 pt-16 pb-12">
            <div className="container px-4 sm:px-8 mx-auto space-y-12">
                
                {/* 4-Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    
                    {/* Column 1: Brand & Manifesto */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-serif font-bold tracking-tight text-secondary">
                            CUEROS PORTEÑOS
                        </h4>
                        <p className="text-sm opacity-80 leading-relaxed max-w-xs">
                            Marroquinería de alta gama nacida y confeccionada en el histórico barrio de San Telmo, Buenos Aires. Cada pieza representa una herencia artesanal de dedicación, textura y excelencia.
                        </p>
                    </div>

                    {/* Column 2: Showroom & Hours */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold tracking-wider uppercase text-secondary">
                            El Atelier
                        </h4>
                        <ul className="space-y-3 text-sm opacity-80">
                            <li className="flex items-start gap-2.5">
                                <MapPin className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                                <span>Defensa 852, San Telmo,<br />CABA, Argentina</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <Clock className="h-4 w-4 text-secondary shrink-0" />
                                <span>Lun. a Sáb. 10:00 - 19:00 hs</span>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Direct Contact */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold tracking-wider uppercase text-secondary">
                            Contacto
                        </h4>
                        <ul className="space-y-3 text-sm opacity-80">
                            <li>
                                <a 
                                    href="mailto:contacto@cuerosportenos.com.ar"
                                    className="flex items-center gap-2.5 hover:text-secondary hover:underline transition-colors"
                                >
                                    <Mail className="h-4 w-4 text-secondary shrink-0" />
                                    <span className="truncate">contacto@cuerosportenos.com.ar</span>
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="https://wa.me/5491134567890" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2.5 hover:text-secondary hover:underline transition-colors"
                                >
                                    <MessageCircle className="h-4 w-4 text-secondary shrink-0" />
                                    <span>+54 9 11 3456 7890</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Social Community */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold tracking-wider uppercase text-secondary">
                            Comunidad
                        </h4>
                        <p className="text-sm opacity-80 leading-relaxed">
                            Seguí nuestro proceso artesanal y enterate de nuevos ingresos.
                        </p>
                        <a 
                            href="https://instagram.com/cuerosportenos" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-secondary/95 shadow transition-colors"
                        >
                            <Instagram className="h-4 w-4 shrink-0" />
                            @cuerosportenos
                        </a>
                    </div>

                </div>

                {/* Bottom Divider & Copyright */}
                <div className="pt-8 border-t border-[#3E3120] flex flex-col sm:flex-row justify-between items-center gap-4">
                    <small className="opacity-70 text-xs text-center sm:text-left">
                        © {new Date().getFullYear()} Cueros Porteños. Todos los derechos reservados. Hecho a mano en Argentina.
                    </small>
                    <div className="flex gap-6 text-xs opacity-70">
                        <Link href="/catalogo" className="hover:text-secondary hover:underline transition-colors">
                            Catálogo
                        </Link>
                        <Link href="/admin" className="hover:text-secondary hover:underline transition-colors">
                            Admin
                        </Link>
                    </div>
                </div>

            </div>
        </footer>
    )
}

