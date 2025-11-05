// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;


    if (
      token &&
      !token.isProfileComplete &&
      !path.startsWith("/profile/complete") &&
      !path.startsWith("/api") &&
      !path.startsWith("/auth")
    ) {
      return NextResponse.redirect(new URL("/profile/complete", req.url));
    }

    if (path.startsWith("/admin") && token?.role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;
        const protectedPaths = [
          "/profile",
          "/orders",
          "/checkout",
          "/wishlist",
        ];
        if (protectedPaths.some((p) => path.startsWith(p))) {
          return !!token;
        }

        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    "/profile/:path*",
    "/orders/:path*",
    "/checkout/:path*",
    "/wishlist/:path*",
    "/admin/:path*",
  ],
};
