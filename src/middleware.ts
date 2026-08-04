import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = ["/", "/login", "/register", "/api/auth/*", "/api/contact", "/tournaments", "/api/health"];

const roleBasedRoutes: Record<string, string[]> = {
  SUPER_ADMIN: ["/admin"],
  SCHOOL_ADMIN: ["/school"],
  COACH: ["/coach"],
  ATHLETE: ["/athlete"],
  SPONSOR: ["/sponsor"],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (publicRoutes.some(route => pathname === route || pathname.startsWith(route.replace("*", "")))) {
    return NextResponse.next();
  }

  // Allow static files and Next.js internals
  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.includes(".")) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
