import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
console.log("env at procces middleware: ", process.env.NEXT_HOST)

export function middleware(req: NextRequest){
  return NextResponse.next()
}

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: ["/dashboard/:path*", "/editor/:path*", "/login"],
}