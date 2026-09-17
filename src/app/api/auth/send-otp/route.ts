export const runtime = 'edge';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateOtp } from '@/lib/utils';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { phone } = body;

    if (!phone || !/^\+91[0-9]{10}$/.test(phone)) {
      return NextResponse.json(
        { error: 'Invalid phone number. Please provide a valid Indian mobile number.' },
        { status: 400 }
      );
    }

    // Clean up expired OTP sessions for this phone
    await prisma.otpSession.deleteMany({
      where: {
        phone,
        expiresAt: { lt: new Date() },
      },
    });

    // Rate limiting: max 3 OTPs per 10 minutes
    const recentOtps = await prisma.otpSession.count({
      where: {
        phone,
        createdAt: { gte: new Date(Date.now() - 10 * 60 * 1000) },
      },
    });

    if (recentOtps >= 3) {
      return NextResponse.json(
        { error: 'Too many OTP requests. Please wait 10 minutes before trying again.' },
        { status: 429 }
      );
    }

    const otp = process.env.DEV_OTP_BYPASS === 'true' ? '123456' : generateOtp();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Store OTP session
    await prisma.otpSession.create({
      data: { phone, otp, expiresAt },
    });

    // Send OTP via Twilio (if configured)
    if (process.env.DEV_OTP_BYPASS !== 'true' && process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_ACCOUNT_SID !== 'dev') {
      try {
        // @ts-ignore
        const twilio = await import(/* webpackIgnore: true */ 'twilio' as string).catch(() => null);
        if (twilio) {
          const client = (twilio.default || twilio)(
            process.env.TWILIO_ACCOUNT_SID,
            process.env.TWILIO_AUTH_TOKEN
          );
          await client.messages.create({
            body: `Your FormShield verification code is: ${otp}. Valid for 10 minutes. Do not share this with anyone.`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phone,
          });
        }
      } catch (twilioError) {
        console.error('Twilio error:', twilioError);
        // Don't fail — log and continue
      }
    }

    return NextResponse.json({
      success: true,
      message: process.env.DEV_OTP_BYPASS === 'true'
        ? 'Development mode: OTP is 123456'
        : `OTP sent to ${phone}`,
      // Only expose OTP in dev mode
      ...(process.env.DEV_OTP_BYPASS === 'true' && { devOtp: '123456' }),
    });
  } catch (error) {
    console.error('Send OTP error:', error);
    return NextResponse.json({ error: 'Failed to send OTP. Please try again.' }, { status: 500 });
  }
}
