import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect("/login")
    }

    return (
        <div className="min-h-screen bg-muted/10">
            <div className="border-b bg-background">
                <div className="container flex h-16 items-center px-4">
                    <h2 className="text-lg font-semibold">Admin Dashboard</h2>
                    <div className="ml-auto">
                        <span className="text-sm text-muted-foreground mr-4">{user.email}</span>
                    </div>
                </div>
            </div>
            <main className="container py-8 px-4">
                {children}
            </main>
        </div>
    )
}
