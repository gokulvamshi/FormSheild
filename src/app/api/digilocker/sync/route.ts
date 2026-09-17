export const runtime = 'edge';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/session';
import { fetchAadhaarData, mapSetuAadhaarToExtractedData } from '@/lib/setu';

export async function POST(req: NextRequest) {
  const session = getSessionFromRequest(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const user = await prisma.user.findUnique({ where: { id: session.userId } });
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    // Real DigiLocker sync via Setu Gateway
    if (!user.digilockerUserId) {
      return NextResponse.json({
        success: false,
        message: 'No active DigiLocker connection found. Please connect your DigiLocker account to sync documents.',
      });
    }

    try {
      const aadhaarRes = await fetchAadhaarData(user.digilockerUserId);
      const extracted = mapSetuAadhaarToExtractedData(aadhaarRes);

      const existingAadhaar = await prisma.document.findFirst({
        where: {
          userId: user.id,
          type: 'AADHAAR',
        },
      });

      if (existingAadhaar) {
        await prisma.document.update({
          where: { id: existingAadhaar.id },
          data: {
            verified: true,
            issuingAuthority: 'UIDAI (via DigiLocker & Setu)',
            extractedData: JSON.stringify(extracted),
          },
        });
      } else {
        await prisma.document.create({
          data: {
            userId: user.id,
            type: 'AADHAAR',
            name: 'Aadhaar Card',
            issuingAuthority: 'UIDAI (via DigiLocker & Setu)',
            issueDate: new Date(),
            verified: true,
            digilockerDocId: user.digilockerUserId,
            extractedData: JSON.stringify(extracted),
          },
        });
      }

      const totalDocs = await prisma.document.count({
        where: { userId: user.id },
      });

      await prisma.activityLog.create({
        data: {
          userId: session.userId,
          action: 'DIGILOCKER_SYNCED',
          details: `Real-time sync completed via Setu Gateway. ${totalDocs} verified document(s) active.`,
        },
      });

      return NextResponse.json({
        success: true,
        documentsCount: totalDocs,
        message: `Real-time sync successful! Verified documents updated.`,
      });
    } catch (apiErr: any) {
      console.error('Real DigiLocker sync error:', apiErr);
      return NextResponse.json({
        success: false,
        message: `Setu sync error: ${apiErr.message || 'Failed to refresh documents from DigiLocker'}`,
      });
    }
  } catch (error) {
    console.error('DigiLocker sync error:', error);
    return NextResponse.json({ error: 'Failed to sync documents' }, { status: 500 });
  }
}
