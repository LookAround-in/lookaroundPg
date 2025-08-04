// lib/auth-server.ts
import { cookies } from 'next/headers';
import { auth } from './auth'; // Your Better Auth instance
import { Session } from '@/interfaces/session';

export async function getServerSession(): Promise<Session | null> {
  try {
    const cookieStore = cookies();
    const sessionToken = await cookieStore.get('better-auth.session_token')?.value;
    
    if (!sessionToken) {
      return null;
    }

    // Use Better Auth to verify session server-side
    const session = await auth.api.getSession({
      headers: {
        'cookie': `better-auth.session_token=${sessionToken}`,
      },
    });

    return session;
  } catch (error) {
    console.error('Server session error:', error);
    return null;
  }
}

export async function requireServerSession() {
  const session = await getServerSession();
  if (!session) {
    throw new Error('Authentication required');
  }
  return session;
}