export const runtime = 'edge';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/session';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest) {
  const session = getSessionFromRequest(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: {
        id: true, phone: true, name: true, email: true, avatar: true,
        language: true, digilockerConnected: true, digilockerUserId: true,
        mockMode: true, createdAt: true,
      },
    });

    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = getSessionFromRequest(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const { name, email, language, mockMode } = body;

    const user = await prisma.user.update({
      where: { id: session.userId },
      data: {
        ...(name !== undefined && { name }),
        ...(email !== undefined && { email }),
        ...(language !== undefined && { language }),
        ...(mockMode !== undefined && { mockMode }),
      },
      select: {
        id: true, phone: true, name: true, email: true, avatar: true,
        language: true, digilockerConnected: true, mockMode: true,
      },
    });

    // Update session cookie with new name
    if (name !== undefined) {
      const cookieStore = await cookies();
      const sessionCookie = cookieStore.get('formshield-session');
      if (sessionCookie) {
        const sessionData = JSON.parse(sessionCookie.value);
        cookieStore.set('formshield-session', JSON.stringify({ ...sessionData, name }), {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
        });
      }
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
