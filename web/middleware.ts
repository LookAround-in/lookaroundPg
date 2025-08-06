import { NextRequest, NextResponse } from 'next/server';
import { getSessionCookie } from 'better-auth/cookies';

export const config = {
  matcher: [
    '/profile/:path*',
    '/wishlist/:path*',
    '/properties/:path*',
    '/login',
    '/signup',
    '/admin/:path*',
    '/host/:path*',
  ],
};

export async function middleware(req: NextRequest) {
  const session = getSessionCookie(req);
  const { pathname } = req.nextUrl;
  
  // Handle auth routes (login/register)
  if (pathname === '/login' || pathname === '/signup') {
    if (session) {
      const url = req.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }
  
  // Handle other protected routes
  if (!session) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}