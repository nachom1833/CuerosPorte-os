export function SiteFooter() {
    return (
        <footer className="py-12 border-t bg-primary text-primary-foreground">
            <div className="container px-4 sm:px-8 flex flex-col sm:flex-row justify-between items-center gap-6">
                <small className="opacity-90 font-medium">
                    © {new Date().getFullYear()} Cueros Porteños. Hecho a mano en Argentina.
                </small>
                <div className="flex gap-4">
                    {/* Social links could go here */}
                </div>
            </div>
        </footer>
    )
}
