import { verifySessionToken } from "@/utils/firebase/auth"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const cookieStore = await cookies()
    const token = cookieStore.get("firebase-token")?.value
    const user = await verifySessionToken(token)

    if (!user) {
        redirect("/login")
    }

    return (
        <div className="min-h-screen bg-muted/10">
            <div className="border-b bg-background">
                <div className="container flex h-16 items-center px-4 sm:px-8 mx-auto">
                    <Link href="/admin" className="text-lg font-semibold mr-8 transition-opacity hover:opacity-90">
                        Admin Dashboard
                    </Link>
                    <nav className="flex items-center space-x-6 text-sm font-semibold">
                        <Link 
                            href="/admin" 
                            className="transition-colors hover:text-accent text-foreground/80 tracking-wide uppercase"
                        >
                            Productos
                        </Link>
                        <Link 
                            href="/admin/categories" 
                            className="transition-colors hover:text-accent text-foreground/80 tracking-wide uppercase"
                        >
                            Categorías
                        </Link>
                    </nav>
                    <div className="ml-auto">
                        <span className="text-xs text-muted-foreground mr-4 font-mono">{user.email}</span>
                    </div>
                </div>
            </div>
            <main className="container py-8 px-4">
                {children}
            </main>
        </div>
    )
}
