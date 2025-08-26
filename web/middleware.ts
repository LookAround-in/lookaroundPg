import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

// Define protected routes and their required roles
const protectedRoutes = {
  // Admin only routes
  "/api/v1/pg": ["admin"], // POST - create PG
  "/api/v1/pg/[id]": ["admin"], // PUT, DELETE - update/delete PG
  
  // Host routes
  "/api/v1/host": ["host", "admin"],
  "/api/v1/host/profile": ["host", "admin"],
  
  // User routes (authenticated users)
  "/api/v1/user/profile": ["user", "host", "admin"],
  "/api/v1/wishlist": ["user", "host", "admin"],
  "/api/v1/requests": ["user", "host", "admin"],
  
  // Dashboard routes
  "/dashboard": ["user", "host", "admin"],
  "/dashboard/admin": ["admin"],
  "/dashboard/host": ["host", "admin"],
};

// Public routes that don't need authentication
const publicApiRoutes = [
  "/api/v1/pg/getFeaturedPg",
  "/api/v1/pg/getTrendingPg", 
  "/api/v1/pg/getExplorePg",
  "/api/v1/pg/getPgById",
  "/api/auth", // Better Auth routes
];

function matchRoute(pathname: string, pattern: string): boolean {
  // Convert route pattern to regex
  const regex = new RegExp(
    "^" + pattern.replace(/\[.*?\]/g, "[^/]+") + "$"
  );
  return regex.test(pathname);
}

function getRequiredRoles(pathname: string): string[] | null {
  for (const [pattern, roles] of Object.entries(protectedRoutes)) {
    if (matchRoute(pathname, pattern)) {
      return roles;
    }
  }
  return null;
}

function isPublicRoute(pathname: string): boolean {
  return publicApiRoutes.some(route => 
    pathname.startsWith(route) || matchRoute(pathname, route)
  );
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for static files and Next.js internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Allow public routes
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // Check if route requires authentication
  const requiredRoles = getRequiredRoles(pathname);
  
  if (!requiredRoles) {
    // Route not in protected routes, allow access
    return NextResponse.next();
  }

  try {
    // Get session using Better Auth
    const session = await auth.api.getSession({
      headers: request.headers
    });

    // Check authentication
    if (!session) {
      if (pathname.startsWith("/api")) {
        return NextResponse.json(
          { success: false, message: "Authentication required" },
          { status: 401 }
        );
      }
      // Redirect to login for UI routes
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }

    // Check authorization
    if (!requiredRoles.includes(session.user.role)) {
      if (pathname.startsWith("/api")) {
        return NextResponse.json(
          { 
            success: false, 
            message: `Access denied. Required roles: ${requiredRoles.join(', ')}. Your role: ${session.user.role}` 
          },
          { status: 403 }
        );
      }
      // Redirect to appropriate dashboard for UI routes
      return NextResponse.redirect(new URL(`/dashboard/${session.user.role}`, request.url));
    }

    // Add user info to headers for use in route handlers
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", session.user.id);
    requestHeaders.set("x-user-role", session.user.role);
    requestHeaders.set("x-user-email", session.user.email);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

  } catch (error) {
    console.error("Middleware auth error:", error);
    
    if (pathname.startsWith("/api")) {
      return NextResponse.json(
        { success: false, message: "Authentication error" },
        { status: 401 }
      );
    }
    
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
};