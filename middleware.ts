// Ref: https://next-auth.js.org/configuration/nextjs#advanced-usage
import { NextResponse } from "next/server"
import { NextRequestWithAuth, withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    // console.log(request.nextUrl.pathname)
    // console.log(request.nextauth.token)

    if (
      request.nextUrl.pathname.startsWith("/dashboard/pemilik") &&
      request.nextauth.token?.role !== "Pemilik"
    ) {
      return NextResponse.rewrite(new URL("/dashboard", request.url))
    }
  },
  {
    pages: {
      signIn: "/login",
    },
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
)

// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = { matcher: ["/dashboard/:path*", "/dashboard/pemilik/:path*", "/login"] }
