import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { protectedRoutes } from "@/config/routes";
import { getAuth } from "@/app/actions";
import { STUDENT, TEACHER } from "@/config/constants";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  console.log("Middleware called");
  const { pathname } = request.nextUrl;
  const auth = await getAuth();

  if (pathname.match("/auth") && auth.isAuth) {
    console.log("Redirecting to /");
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!pathname.match(/\/app\/*/)) {
    return NextResponse.next();
  }

  if (!auth.isAuth) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }
  if (pathname.match(/\/app\/teacher/) && auth.payload?.role == TEACHER) {
    return NextResponse.next();
  }
  if (pathname.match(/\/app\/student/) && auth.payload?.role == STUDENT) {
    return NextResponse.next();
  }

  if (protectedRoutes.some((route) => pathname.match(route))) {
    return NextResponse.next();
  }

  NextResponse.redirect(new URL("/", request.url));
}
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
