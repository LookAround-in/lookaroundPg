import { NextRequest, NextResponse } from 'next/server';
import { Session, UserRole } from './interfaces/session';


// export const config = {
//   matcher: [
//     // Protected routes
//     '/profile/:path*',
//     '/wishlist/:path*',
//     '/partner/:path*',
//     '/properties/:path*',
//     // Auth routes (to redirect away if authenticated)
//     '/login',
//     '/signup',
//     // Protected admin and host routes
//     '/admin/:path*',
//     '/host/:path*',
//   ],
// };


// /*
//   useAuth() won't work as it needs to run on client side and middleware is a server side function.
//   cannot use auth.api.getSession() as it needs DB call which edge function in nextjs cannot make.
//  */
// async function getSessionFromBetterAuth(req: NextRequest): Promise<Session | null> {
//   try {
//     // Get the Better Auth session token from cookies
//     // const sessionToken = req.cookies.get('better-auth.session_token')?.value;
//     const sessionToken = req.cookies.get('__Secure-better-auth.session_token')?.value;
    
//     if (!sessionToken) {
//       return null;
//     }

//     // Decode the session token (URL decode first)
//     const decodedToken = decodeURIComponent(sessionToken);

//     // Make a request to your Better Auth session endpoint to get user data
//     const sessionResponse = await fetch(`${req.nextUrl.origin}/api/auth/get-session`, {
//       headers: {
//         'Cookie': `better-auth.session_token=${sessionToken}`,
//       },
//     });

//     if (!sessionResponse.ok) {
//       return null;
//     }

//     const sessionData = await sessionResponse.json();
    
//     return sessionData;
//   } catch (error) {
//     console.error('Error getting session:', error);
//     return null;
//   }
// }

export async function middleware(req: NextRequest) {

  // const sessionData = await getSessionFromBetterAuth(req);
  // const { pathname } = req.nextUrl;
  
  // // Handle auth routes (login/register)
  // if (pathname === '/login' || pathname === '/signup') {
  //   if (sessionData) {
  //     const url = req.nextUrl.clone();
  //     url.pathname = '/';
  //     return NextResponse.redirect(url);
  //   }
  //   return NextResponse.next();
  // }

  // // Handle admin routes
  // if (pathname.startsWith('/admin')) {
  //   if (sessionData) {
  //     const userRole = sessionData.user?.role;
  //     if (userRole !== UserRole.super_admin && userRole !== UserRole.admin) {
  //       const url = req.nextUrl.clone();
  //       url.pathname = '/';
  //       return NextResponse.redirect(url);
  //     }
  //   } 
  // }

  // // Handle host routes
  // if (pathname.startsWith('/host')) {
  //   if (sessionData) {
  //     const userRole = sessionData.user?.role;
  //     if (userRole !== UserRole.host) {
  //       const url = req.nextUrl.clone();
  //       url.pathname = '/';
  //       return NextResponse.redirect(url);
  //     }
  //   }
  // }
  
  // // Handle other protected routes
  // if (!sessionData) {
  //   const url = req.nextUrl.clone();
  //   url.pathname = '/login';
  //   return NextResponse.redirect(url);
  // }

  // return NextResponse.next();
}
