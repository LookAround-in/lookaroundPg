import { NextRequest, NextResponse } from 'next/server';
import { getSessionCookie } from 'better-auth/cookies';
import { Session, UserRole } from './interfaces/session';

export const config = {
  matcher: [
    // Protected routes
    '/profile/:path*',
    '/wishlist/:path*',
    '/partner/:path*',
    '/properties/:path*',
    // Auth routes (to redirect away if authenticated)
    '/login',
    '/signup',
    // Protected admin and host routes
    '/admin/:path*',
    '/host/:path*',
  ],
};

export async function middleware(req: NextRequest) {
  const sessionCookie = getSessionCookie(req) as unknown as Session;
  const { pathname } = req.nextUrl;
  
  // Handle auth routes (login/register)
  if (pathname === '/login' || pathname === '/signup') {
    if (sessionCookie) {
      const url = req.nextUrl.clone();
      url.pathname = '/profile';
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Handle admin routes
  if (pathname.startsWith('/admin')) {
    if (sessionCookie) {
      const userRole = sessionCookie.user?.role;
      if (userRole !== UserRole.ADMIN) {
        const url = req.nextUrl.clone();
        url.pathname = '/';
        return NextResponse.redirect(url);
      }
    } 
  }

  // Handle host routes
  if (pathname.startsWith('/host')) {
    if (sessionCookie) {
      const userRole = sessionCookie.user?.role;
      if (userRole !== UserRole.HOST) {
        const url = req.nextUrl.clone();
        url.pathname = '/';
        return NextResponse.redirect(url);
      }
    }
  }
  
  // Handle other protected routes
  if (!sessionCookie) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
