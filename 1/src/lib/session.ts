/**
 * Session management utilities
 */
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export interface SessionData {
  userId: string;
  email?: string | null;
  phone?: string | null;
  name: string | null;
  expiresAt: string;
}

export async function getSession(): Promise<SessionData | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('formshield-session');
    if (!sessionCookie) return null;

    const session = JSON.parse(sessionCookie.value) as SessionData;

    if (new Date(session.expiresAt) < new Date()) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

export function getSessionFromRequest(req: NextRequest): SessionData | null {
  try {
    const sessionCookie = req.cookies.get('formshield-session');
    if (!sessionCookie) return null;

    const session = JSON.parse(sessionCookie.value) as SessionData;

    if (new Date(session.expiresAt) < new Date()) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}
