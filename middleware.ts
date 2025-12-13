import { NextRequest, NextResponse } from "next/server";

const routes = {
  home: "/",
  auth: ["/auth/login", "/auth/register"],
  protected: ["/account"], // Add your protected routes here
  restrictedForLoggedIn: ["/auth/register", "/auth/login"], // Restricted for logged-in users
};

const isPathMatching = (pathname: string, paths: (string | RegExp)[]) =>
  paths.some((path) =>
    typeof path === "string" ? path === pathname : path.test(pathname)
  );

export function middleware(request: NextRequest) {
  const token = request.cookies.get(process.env.AUTH_TOKEN!);
  const { pathname } = request.nextUrl;

  const isProtectedRoute = isPathMatching(pathname, routes.protected);
  const isAuthRoute = routes.auth.includes(pathname);
  const isRestrictedForLoggedIn = isPathMatching(
    pathname,
    routes.restrictedForLoggedIn
  );

  if (isProtectedRoute && !token) {
    // Redirect to login if accessing protected routes without a token
    return NextResponse.redirect(new URL(routes.auth[0], request.url));
  }

  if (isAuthRoute && token) {
    // Redirect to home if authenticated and accessing the auth route
    return NextResponse.redirect(new URL(routes.home, request.url));
  }

  if (isRestrictedForLoggedIn && token) {
    // Redirect to home if authenticated and accessing restricted routes
    return NextResponse.redirect(new URL(routes.home, request.url));
  }

  // Continue with the request
  return NextResponse.next();
}

export const config = {
  matcher: ["/account", "/auth/login", "/auth/register", "/forgot-password"],
};
