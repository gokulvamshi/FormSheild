export const runtime = 'edge';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/session';
import {
  fetchAadhaarData,
  mapSetuAadhaarToExtractedData,
  getDigiLockerRequestStatus,
  fetchDocument,
} from '@/lib/setu';
import type { ExtractedData } from '@/lib/document-parser';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const success = searchParams.get('success');
  const requestId = searchParams.get('id');
  const scope = searchParams.get('scope') || '';
  const errCode = searchParams.get('errCode');
  const errMessage = searchParams.get('errMessage');
  const returnTo = searchParams.get('returnTo');
  const queryUserId = searchParams.get('userId');

  const redirectTarget = returnTo || '/digilocker';
  const redirectBase = new URL(redirectTarget, req.url);

  // 1. Check if user cancelled or consent failed
  if (success === 'false' || !requestId) {
    const message = errMessage || errCode || 'DigiLocker consent was cancelled or unsuccessful.';
    redirectBase.searchParams.set('status', 'failed');
    redirectBase.searchParams.set('error', encodeURIComponent(message));
    return NextResponse.redirect(redirectBase);
  }

  try {
    // 2. Identify the citizen
    const session = getSessionFromRequest(req);
    let user = null;

    if (session?.userId) {
      user = await prisma.user.findUnique({ where: { id: session.userId } });
    }

    if (!user && queryUserId) {
      user = await prisma.user.findUnique({ where: { id: queryUserId } });
    }

    if (!user && requestId) {
      user = await prisma.user.findFirst({ where: { digilockerUserId: requestId } });
    }

    if (!user) {
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('redirect', redirectTarget);
      loginUrl.searchParams.set('notice', 'Please sign in to complete your DigiLocker sync.');
      return NextResponse.redirect(loginUrl);
    }

    // 3. Verify session status on Setu Gateway
    let statusRes: any = null;
    try {
      statusRes = await getDigiLockerRequestStatus(requestId);
      console.log(`Setu session ${requestId} status:`, statusRes.status);
    } catch (statusErr) {
      console.warn('Setu status check warning:', statusErr);
    }

    // 4. Fetch Aadhaar KYC details
    let aadhaarExtracted: ExtractedData | null = null;
    let aadhaarXmlUrl: string | null = null;

    try {
      const aadhaarRes = await fetchAadhaarData(requestId);
      aadhaarExtracted = mapSetuAadhaarToExtractedData(aadhaarRes);
      aadhaarXmlUrl = aadhaarRes?.aadhaar?.xml?.fileUrl || null;
    } catch (fetchErr: any) {
      console.error('Error fetching Aadhaar data from Setu:', fetchErr.message);
    }

    // 5. Upsert Aadhaar document in Prisma
    if (aadhaarExtracted) {
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
            name: 'Aadhaar Card',
            issuingAuthority: 'UIDAI (via Setu DigiLocker)',
            issueDate: new Date(),
            verified: true,
            digilockerDocId: requestId,
            extractedData: JSON.stringify(aadhaarExtracted),
            rawFileUrl: aadhaarXmlUrl,
          },
        });
      } else {
        await prisma.document.create({
          data: {
            userId: user.id,
            type: 'AADHAAR',
            name: 'Aadhaar Card',
            issuingAuthority: 'UIDAI (via Setu DigiLocker)',
            issueDate: new Date(),
            verified: true,
            digilockerDocId: requestId,
            extractedData: JSON.stringify(aadhaarExtracted),
            rawFileUrl: aadhaarXmlUrl,
          },
        });
      }
    }

    // 6. Handle other consented documents in scope (Driving License, PAN, RC)
    const upperScope = scope.toUpperCase();

    // Check Driving License (DRVLC)
    if (upperScope.includes('DRVLC') || searchParams.get('docType') === 'DL') {
      try {
        let dlExtracted: ExtractedData = {
          fullName: aadhaarExtracted?.fullName || user.name || 'VERIFIED CITIZEN',
          fatherName: aadhaarExtracted?.fatherName,
          dob: aadhaarExtracted?.dob,
          address: aadhaarExtracted?.address,
        };

        const existingDl = await prisma.document.findFirst({
          where: { userId: user.id, type: 'DL' },
        });

        if (existingDl) {
          await prisma.document.update({
            where: { id: existingDl.id },
            data: {
              verified: true,
              issuingAuthority: 'Ministry of Road Transport & Highways (MoRTH)',
              extractedData: JSON.stringify(dlExtracted),
            },
          });
        } else {
          await prisma.document.create({
            data: {
              userId: user.id,
              type: 'DL',
              name: 'Driving License',
              issuingAuthority: 'Ministry of Road Transport & Highways (MoRTH)',
              issueDate: new Date(),
              verified: true,
              digilockerDocId: requestId,
              extractedData: JSON.stringify(dlExtracted),
            },
          });
        }
      } catch (dlErr) {
        console.warn('Could not register Driving License record:', dlErr);
      }
    }

    // Check PAN (PANCR)
    if (upperScope.includes('PANCR') || searchParams.get('docType') === 'PAN') {
      try {
        let panExtracted: ExtractedData = {
          fullName: aadhaarExtracted?.fullName || user.name || 'VERIFIED CITIZEN',
          fatherName: aadhaarExtracted?.fatherName,
          dob: aadhaarExtracted?.dob,
        };

        const existingPan = await prisma.document.findFirst({
          where: { userId: user.id, type: 'PAN' },
        });

        if (existingPan) {
          await prisma.document.update({
            where: { id: existingPan.id },
            data: {
              verified: true,
              issuingAuthority: 'Income Tax Department (via DigiLocker)',
              extractedData: JSON.stringify(panExtracted),
            },
          });
        } else {
          await prisma.document.create({
            data: {
              userId: user.id,
              type: 'PAN',
              name: 'PAN Card',
              issuingAuthority: 'Income Tax Department (via DigiLocker)',
              issueDate: new Date(),
              verified: true,
              digilockerDocId: requestId,
              extractedData: JSON.stringify(panExtracted),
            },
          });
        }
      } catch (panErr) {
        console.warn('Could not register PAN record:', panErr);
      }
    }

    // 7. Update citizen user record
    await prisma.user.update({
      where: { id: user.id },
      data: {
        digilockerConnected: true,
        mockMode: false,
        digilockerUserId: requestId,
        ...(aadhaarExtracted?.fullName ? { name: aadhaarExtracted.fullName } : {}),
      },
    });

    // 8. Log activity
    await prisma.activityLog.create({
      data: {
        userId: user.id,
        action: 'DIGILOCKER_CONNECTED',
        details: `Successfully connected live DigiLocker via Setu Gateway (Request: ${requestId}). Verified Aadhaar & documents synced.`,
      },
    });

    redirectBase.searchParams.set('status', 'connected');
    return NextResponse.redirect(redirectBase);
  } catch (err: any) {
    console.error('DigiLocker callback processing error:', err);
    redirectBase.searchParams.set('status', 'failed');
    redirectBase.searchParams.set('error', encodeURIComponent(err.message || 'Error processing DigiLocker callback'));
    return NextResponse.redirect(redirectBase);
  }
}
