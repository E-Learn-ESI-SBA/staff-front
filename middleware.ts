import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { authRoutes, protectedRoutes } from './config/routes';


export async function middleware(request: NextRequest) {
    const accessToken = request.cookies.get('accessToken')?.value;
    const refreshToken = request.cookies.get('refreshToken')?.value;

    // user already authenticated so block him from auth routes
    if ((accessToken && refreshToken) && authRoutes.includes(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    // someone trying to go to a protected route
    if (protectedRoutes.includes(request.nextUrl.pathname)) {
        // anonymous user can't access protected routes
        if ((!accessToken || !refreshToken)) {
            return NextResponse.redirect(new URL('/auth', request.url))
        }
                return NextResponse.next()
            }
    return NextResponse.next()
}
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}