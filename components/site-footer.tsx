export function SiteFooter() {
    return (
        <footer className="py-12 border-t bg-secondary/30">
            <div className="container px-4 sm:px-8 flex flex-col sm:flex-row justify-between items-center gap-6">
                <small className="text-muted-foreground">
                    © {new Date().getFullYear()} Cueros Porteños. Hecho a mano en Argentina.
                </small>
                <div className="flex gap-4">
                    {/* Social links could go here */}
                </div>
            </div>
        </footer>
    )
}
