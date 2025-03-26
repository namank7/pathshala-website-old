import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Get the path
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const isPublicPath =
    path === "/auth/login" ||
    path === "/auth/register" ||
    path === "/auth/forgot-password" ||
    path === "/" ||
    path === "/study-abroad" ||
    path === "/career-counseling" ||
    path === "/coaching-connect" ||
    path === "/e-learning"

  // Get the token from cookies
  const token = request.cookies.get("token")?.value || ""

  // If the path requires authentication and there's no token, redirect to login
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  // If the user is logged in and tries to access auth pages, redirect to dashboard
  if (token && (path === "/auth/login" || path === "/auth/register" || path === "/auth/forgot-password")) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/auth/:path*"
  ]
}

