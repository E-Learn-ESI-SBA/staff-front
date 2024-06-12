import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { protectedRoutes } from "@/config/routes";
import { getAuth } from "@/app/actions";
import { STUDENT, TEACHER } from "@/config/constants";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const auth = await getAuth();

  if(pathname.match("/auth") && !pathname.match("/auth") && auth.isAuth){
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!pathname.match(/\/app\/*/) && !pathname.match("/auth/logout")) {
    return NextResponse.next();
  }

  if (!auth.isAuth) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }
  if (pathname.match(/\/app\/teacher/) && auth.payload?.role == TEACHER) {
    return NextResponse.next();
  }

  // student trying to visit teacher dashboard
  if (pathname.match(/\/app\/teacher/) && auth.payload?.role != TEACHER) {
    return NextResponse.redirect(new URL("/auth/logout", request.url));
  }
  
  if (pathname.match(/\/app\/student/) && auth.payload?.role == STUDENT) {
    return NextResponse.next();
  }

    // teacher trying to visit student dashboard
  if (pathname.match(/\/app\/student/) && auth.payload?.role != STUDENT) {
    return NextResponse.redirect(new URL("/auth/logout", request.url));
  }

  if (protectedRoutes.some((route) => pathname.match(route))) {
    return NextResponse.next();
  }

  // NextResponse.redirect(new URL("/", request.url));
}
export const config = {
  matcher: [
  "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};