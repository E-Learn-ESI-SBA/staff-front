import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { authRoutes, protectedRoutes } from '../../config/routes';
import { getAuth } from '../actions/auth';
import { STUDENT, TEACHER } from '@/config/constants';

export async function middleware(request: NextRequest) {
	const auth = await getAuth();
	if (!auth.isAuth) {
		return NextResponse.redirect(new URL('/auth', request.url));
	}
	const { pathname } = request.nextUrl;
	if (pathname.match(/\/app\/teacher/) && auth.payload?.role == TEACHER) {
		return NextResponse.next();
	}
	if (pathname.match(/\/app\/student/) && auth.payload?.role == STUDENT) {
		return NextResponse.next();
	}

	if (protectedRoutes.some((route) => pathname.match(route))) {
		return NextResponse.next();
	}

	NextResponse.redirect(new URL('/', request.url));
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
};
