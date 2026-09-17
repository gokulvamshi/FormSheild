import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { uid, email, name, avatar, phone } = body;

    if (!uid && !email) {
      return NextResponse.json(
        { error: 'Firebase UID or email is required to sync user profile.' },
        { status: 400 }
      );
    }

    const cleanEmail = email ? String(email).trim().toLowerCase() : null;
    const cleanPhone = phone ? String(phone).trim() : null;

    // Look for existing user by firebaseUid, email, or phone
    let user = await prisma.user.findFirst({
      where: {
        OR: [
          ...(uid ? [{ firebaseUid: uid }] : []),
          ...(cleanEmail ? [{ email: cleanEmail }] : []),
          ...(cleanPhone ? [{ phone: cleanPhone }] : []),
        ],
      },
    });

    let isNewUser = false;

    if (!user) {
      isNewUser = true;
      user = await prisma.user.create({
        data: {
          firebaseUid: uid || null,
          email: cleanEmail,
          name: name || null,
          avatar: avatar || null,
          phone: cleanPhone,
          mockMode: false,
        },
      });

      await prisma.activityLog.create({
        data: {
          userId: user.id,
          action: 'ACCOUNT_CREATED',
          details: `User registered via Google Sign-In (${cleanEmail || uid})`,
        },
      });
    } else {
      // User exists: Update profile and link Google UID if not linked
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          firebaseUid: uid || user.firebaseUid,
          ...(cleanEmail && !user.email ? { email: cleanEmail } : {}),
          ...(name && !user.name ? { name } : {}),
          ...(avatar && !user.avatar ? { avatar } : {}),
          ...(cleanPhone && !user.phone ? { phone: cleanPhone } : {}),
          mockMode: false,
        },
      });

      await prisma.activityLog.create({
        data: {
          userId: user.id,
          action: 'USER_LOGIN',
          details: `User logged in via Google Sign-In (${cleanEmail || uid})`,
        },
      });
    }

    // Set 30-day session cookie for cross-device persistence
    const sessionData = {
      userId: user.id,
      email: user.email,
      phone: user.phone,
      name: user.name,
      avatar: user.avatar,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    };

    const cookieStore = await cookies();
    cookieStore.set('formshield-session', JSON.stringify(sessionData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        firebaseUid: user.firebaseUid,
        email: user.email,
        phone: user.phone,
        name: user.name,
        avatar: user.avatar,
        digilockerConnected: user.digilockerConnected,
        mockMode: user.mockMode,
      },
      isNewUser,
    });
  } catch (error: any) {
    console.error('Error in /api/auth/sync-user:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to sync user session.' },
      { status: 500 }
    );
  }
}
