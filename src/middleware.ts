// src/middleware.ts
// import createMiddleware from "next-intl/middleware";
// import { routing } from "./i18n/routing";

// export default createMiddleware(routing);

// export const config = {
//   matcher: ["/", "/(ar|en)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
// };
import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { routing } from "./i18n/routing";

// Initialize the next-intl middleware for handling localization/internationalization (i18n)
const intlMiddleware = createIntlMiddleware(routing);

export async function middleware(request: NextRequest) {
  // Extract the current path from the request URL
  const { pathname } = request.nextUrl;

  // Process the request through the i18n middleware first.
  // This handles locale detection/redirection (e.g., adding /en or /ar to the path).
  const intlResponse = intlMiddleware(request);

  // --- Start of Path Normalization for Security Checks ---

  // 1. Extract the locale from the pathname (e.g., 'ar' from /ar/profile)
  const locale = pathname.split("/")[1] || "ar";

  // 2. Remove the locale from the path to get the clean, locale-agnostic path (e.g., /profile)
  const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";

  // 3. Exclude internal Next.js paths, API routes, and static files from further security checks
  if (
    pathWithoutLocale.startsWith("/api") || // Exclude API routes
    pathWithoutLocale.startsWith("/_next") || // Exclude Next.js internal files
    pathWithoutLocale.includes(".") // Exclude static assets (e.g., .png, .css, .js files)
  ) {
    // If it's an excluded path, return the response prepared by the intlMiddleware
    return intlResponse;
  }

  // --- Start of Authentication and Authorization Checks ---

  // 4. Retrieve the JWT Token from the request to check user status and role
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Redirect authenticated users away from auth pages
  const authPaths = ["/auth/login", "/auth/signup", "/auth/forgot-password"];
  if (authPaths.some((p) => pathWithoutLocale.startsWith(p)) && token) {
    // If user is logged in and trying to access auth pages
    if (!token.isProfileComplete) {
      // Redirect to profile completion
      return NextResponse.redirect(
        new URL(`/${locale}/profile/complete`, request.url)
      );
    }
    // Redirect to home if profile is complete
    return NextResponse.redirect(new URL(`/${locale}/`, request.url));
  }

  // 5. Authentication Check (Protecting routes requiring login)
  const protectedPaths = ["/profile", "/orders", "/checkout", "/wishlist"];
  // If the path is protected AND the user is NOT logged in (!token)
  if (protectedPaths.some((p) => pathWithoutLocale.startsWith(p)) && !token) {
    // Redirect to the login page
    const url = new URL(`/${locale}/auth/login`, request.url);
    // Add the current path as a callback URL for redirection after successful login
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  // 6. Authorization Check (Admin Access)
  // If the path starts with "/admin" AND the user is logged in but their role is NOT "admin"
  if (pathWithoutLocale.startsWith("/admin") && token?.role !== "admin") {
    // Redirect to an unauthorized access page
    return NextResponse.redirect(
      new URL(`/${locale}/unauthorized`, request.url)
    );
  }

  // 7. Profile Completion Check
  // If the user is logged in (token exists) AND their profile is incomplete (!token.isProfileComplete)
  // AND they are NOT currently on the profile completion page AND NOT on auth pages
  // if (
  //   token &&
  //   !token.isProfileComplete &&
  //   !pathWithoutLocale.startsWith("/profile/complete") &&
  //   !pathWithoutLocale.startsWith("/auth")
  // ) {
  //   // Redirect the user to the mandatory profile completion page
  //   return NextResponse.redirect(
  //     new URL(`/${locale}/profile/complete`, request.url)
  //   );
  // }

  // // 7.5. Prevent Completed Users from Accessing Completion Page
  // if (
  //   token &&
  //   token.isProfileComplete &&
  //   pathWithoutLocale.startsWith("/profile/complete")
  // ) {
  //   return NextResponse.redirect(new URL(`/${locale}/`, request.url));
  // }

  // 8. Continue Execution
  // If no security or redirect checks were triggered, return the response prepared by the i18n middleware
  return intlResponse;
}

// 9. Matcher Configuration
// Defines which paths the middleware should run on.
export const config = {
  // Matches the root, all paths starting with /ar or /en, and any other path that is not an API route or internal file.
  matcher: ["/", "/(ar|en)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
