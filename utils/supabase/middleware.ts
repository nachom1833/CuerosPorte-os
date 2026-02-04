import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    })

    try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

        if (!supabaseUrl || !supabaseAnonKey) {
            console.error('Supabase Env Vars missing or invalid. Check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.')
            return supabaseResponse
        }

        const supabase = createServerClient(
            supabaseUrl,
            supabaseAnonKey,
            {
                cookies: {
                    getAll() {
                        return request.cookies.getAll()
                    },
                    setAll(cookiesToSet) {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            request.cookies.set(name, value)
                        )
                        supabaseResponse = NextResponse.next({
                            request,
                        })
                        cookiesToSet.forEach(({ name, value, options }) =>
                            supabaseResponse.cookies.set(name, value, options)
                        )
                    },
                },
            }
        )

        // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
        // creating a new Response object, make sure to include the server-side-set
        // cookies.
        const {
            data: { user },
        } = await supabase.auth.getUser()

        if (
            !user &&
            request.nextUrl.pathname.startsWith('/admin') &&
            !request.nextUrl.pathname.startsWith('/login')
        ) {
            // no user, potentially respond by redirecting the user to the login page
            const url = request.nextUrl.clone()
            url.pathname = '/login'
            return NextResponse.redirect(url)
        }

        return supabaseResponse
    } catch (e) {
        // If you are here, a Supabase client could not be created!
        // This is likely because the environment variables are not set.
        console.error('Supabase middleware error:', e)
        return supabaseResponse
    }
}
