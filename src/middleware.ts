import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "tajikistan-furniture-super-secure-secret-key-2026"
);

const COOKIE_NAME = "admin_session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Allow public static assets and non-admin routes
  if (
    !pathname.startsWith("/admin") &&
    !pathname.startsWith("/api/admin")
  ) {
    return NextResponse.next();
  }

  // 2. Allow login page and login API endpoint
  if (
    pathname === "/admin/login" ||
    pathname === "/api/admin/auth/login"
  ) {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (token) {
      try {
        await jwtVerify(token, JWT_SECRET);
        // If already authenticated and trying to access /admin/login, redirect to /admin dashboard
        if (pathname === "/admin/login") {
          return NextResponse.redirect(new URL("/admin", request.url));
        }
      } catch (err) {
        // Invalid token, proceed to login page
      }
    }
    return NextResponse.next();
  }

  // 3. For protected /admin or /api/admin routes, verify JWT
  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    if (pathname.startsWith("/api/admin")) {
      return NextResponse.json({ error: "Иҷозат нест (Unauthorized)" }, { status: 401 });
    }
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  try {
    await jwtVerify(token, JWT_SECRET);
    return NextResponse.next();
  } catch (err) {
    // Token expired or forged
    if (pathname.startsWith("/api/admin")) {
      return NextResponse.json({ error: "Сессия ба охир расид" }, { status: 401 });
    }
    const loginUrl = new URL("/admin/login", request.url);
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete(COOKIE_NAME);
    return response;
  }
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
