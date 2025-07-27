// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSessionCookie } from 'better-auth/cookies';

export const config = {
  matcher: [
    // Protected routes
    '/profile/:path*',
    '/wishlist/:path*',
    '/partner/:path*',
    '/properties/:path*',
    // Auth routes (to redirect away if authenticated)
    '/login',
    '/signup'
  ],
};

export async function middleware(req: NextRequest) {
  const sessionCookie = getSessionCookie(req);
  const { pathname } = req.nextUrl;
  
  // Handle auth routes (login/register)
  if (pathname === '/login' || pathname === '/signup') {
    if (sessionCookie) {
      // User is authenticated, redirect away from auth pages
      const url = req.nextUrl.clone();
      url.pathname = '/profile';
      return NextResponse.redirect(url);
    }
    // User not authenticated, allow access to auth pages
    return NextResponse.next();
  }
  
  // Handle protected routes
  if (!sessionCookie) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
