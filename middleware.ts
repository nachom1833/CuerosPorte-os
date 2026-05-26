import { NextResponse, type NextRequest } from 'next/server'
import { verifySessionToken } from '@/utils/firebase/auth'

export async function middleware(request: NextRequest) {
    const response = NextResponse.next()

    const token = request.cookies.get("firebase-token")?.value
    const user = await verifySessionToken(token)

    if (
        !user &&
        request.nextUrl.pathname.startsWith('/admin') &&
        !request.nextUrl.pathname.startsWith('/login')
    ) {
        const url = request.nextUrl.clone()
        url.pathname = '/login'
        return NextResponse.redirect(url)
    }

    return response
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
