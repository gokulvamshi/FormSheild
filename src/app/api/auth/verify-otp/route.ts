export const runtime = 'edge';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { phone, otp } = body;

    if (!phone || !otp) {
      return NextResponse.json({ error: 'Phone and OTP are required.' }, { status: 400 });
    }

    // Find the latest unverified OTP session
    const session = await prisma.otpSession.findFirst({
      where: {
        phone,
        verified: false,
        expiresAt: { gte: new Date() },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!session) {
      return NextResponse.json(
        { error: 'OTP expired or not found. Please request a new OTP.' },
        { status: 400 }
      );
    }

    // Increment attempt count
    await prisma.otpSession.update({
      where: { id: session.id },
      data: { attempts: { increment: 1 } },
    });

    if (session.attempts >= 5) {
      await prisma.otpSession.update({
        where: { id: session.id },
        data: { expiresAt: new Date() }, // Invalidate
      });
      return NextResponse.json(
        { error: 'Too many failed attempts. Please request a new OTP.' },
        { status: 400 }
      );
    }

    if (session.otp !== otp) {
      return NextResponse.json(
        { error: `Incorrect OTP. ${4 - session.attempts} attempts remaining.` },
        { status: 400 }
      );
    }

    // Mark OTP as verified
    await prisma.otpSession.update({
      where: { id: session.id },
      data: { verified: true },
    });

    // Find or create user
    let user = await prisma.user.findUnique({ where: { phone } });

    if (!user) {
      user = await prisma.user.create({
        data: {
          phone,
          mockMode: false,
        },
      });

      // Log activity
      await prisma.activityLog.create({
        data: {
          userId: user.id,
          action: 'ACCOUNT_CREATED',
          details: 'Account created via OTP login',
        },
      });
    } else {
      // Log login activity
      await prisma.activityLog.create({
        data: {
          userId: user.id,
          action: 'USER_LOGIN',
          details: 'User logged in via OTP',
        },
      });
    }

    // Create session cookie
    const sessionData = {
      userId: user.id,
      phone: user.phone,
      name: user.name,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
    };

    const cookieStore = await cookies();
    cookieStore.set('formshield-session', JSON.stringify(sessionData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/',
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        phone: user.phone,
        name: user.name,
        digilockerConnected: user.digilockerConnected,
        mockMode: user.mockMode,
      },
      isNewUser: !user.name,
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    return NextResponse.json({ error: 'Verification failed. Please try again.' }, { status: 500 });
  }
}
