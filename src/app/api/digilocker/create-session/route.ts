export const runtime = 'edge';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/session';
import { createDigiLockerRequest } from '@/lib/setu';

export async function POST(req: NextRequest) {
  const session = getSessionFromRequest(req);
  if (!session?.userId) {
    return NextResponse.json({ error: 'Unauthorized. Please sign in.' }, { status: 401 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const { state, applicationType, docType, redirectPath } = body;

    const origin =
      req.nextUrl.origin || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    const baseCallback =
      process.env.DIGILOCKER_REDIRECT_URI || `${origin}/api/digilocker/callback`;

    // Construct redirect URL with contextual parameters
    const redirectUrlObj = new URL(baseCallback);
    redirectUrlObj.searchParams.set('userId', session.userId);
    if (state) redirectUrlObj.searchParams.set('state', state);
    if (applicationType) redirectUrlObj.searchParams.set('appType', applicationType);
    if (docType) redirectUrlObj.searchParams.set('docType', docType);
    if (redirectPath) redirectUrlObj.searchParams.set('returnTo', redirectPath);

    const redirectUrl = redirectUrlObj.toString();

    // Map internal docType to Setu docType if specified
    let setuDocType: string | undefined = undefined;
    if (docType === 'DL') setuDocType = 'DRVLC';
    else if (docType === 'PAN') setuDocType = 'PANCR';
    else if (docType === 'AADHAAR') setuDocType = 'ADHAR';

    // Create session on Setu Data Gateway Sandbox
    const setuResponse = await createDigiLockerRequest(redirectUrl, setuDocType);

    // Save requestId on the user record so we can match on callback
    await prisma.user.update({
      where: { id: session.userId },
      data: {
        digilockerUserId: setuResponse.id,
      },
    });

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: session.userId,
        action: 'DIGILOCKER_SESSION_INITIATED',
        details: `Created DigiLocker consent request on Setu Gateway (Request ID: ${setuResponse.id})`,
      },
    });

    return NextResponse.json({
      success: true,
      requestId: setuResponse.id,
      url: setuResponse.url,
      status: setuResponse.status,
      validUpto: setuResponse.validUpto,
    });
  } catch (error: any) {
    console.error('Setu create-session error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to initialize Setu DigiLocker session.' },
      { status: 500 }
    );
  }
}
