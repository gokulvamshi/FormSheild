import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/session';
import { createDigiLockerRequest } from '@/lib/setu';

export async function GET(req: NextRequest) {
  return handleAuthorize(req, true);
}

export async function POST(req: NextRequest) {
  return handleAuthorize(req, false);
}

async function handleAuthorize(req: NextRequest, isRedirect: boolean) {
  const session = getSessionFromRequest(req);
  if (!session) {
    if (isRedirect) {
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('redirect', '/digilocker');
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.json({ error: 'Unauthorized. Please log in.' }, { status: 401 });
  }

  try {
    const origin = req.nextUrl.origin || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const redirectUrl = process.env.DIGILOCKER_REDIRECT_URI || `${origin}/api/digilocker/callback`;

    // Create session on Setu Data Gateway
    const setuResponse = await createDigiLockerRequest(redirectUrl);

    // Save requestId on user record so we can match and fetch documents on callback
    await prisma.user.update({
      where: { id: session.userId },
      data: {
        digilockerUserId: setuResponse.id,
      },
    });

    if (isRedirect) {
      return NextResponse.redirect(setuResponse.url);
    }

    return NextResponse.json({
      success: true,
      id: setuResponse.id,
      url: setuResponse.url,
      status: setuResponse.status,
    });
  } catch (error: any) {
    console.error('DigiLocker Authorize Error:', error);
    if (isRedirect) {
      const errUrl = new URL('/digilocker', req.url);
      errUrl.searchParams.set('status', 'failed');
      errUrl.searchParams.set('error', encodeURIComponent(error.message || 'Failed to initiate DigiLocker session'));
      return NextResponse.redirect(errUrl);
    }
    return NextResponse.json(
      { error: error.message || 'Failed to initiate DigiLocker session' },
      { status: 500 }
    );
  }
}
