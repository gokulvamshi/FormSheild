export const runtime = 'edge';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/session';
import { parseJsonSafe } from '@/lib/utils';
import type { RequiredDocument, DocumentCheckResult } from '@/types/application';

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = getSessionFromRequest(req);
  if (!session?.userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;

  try {
    const application = await prisma.application.findFirst({
      where: { id, userId: session.userId },
      include: { template: true },
    });

    if (!application || !application.template) {
      return NextResponse.json({ error: 'Application or template not found' }, { status: 404 });
    }

    // Get user's live synced documents
    const userDocuments = await prisma.document.findMany({
      where: { userId: session.userId },
    });

    const requiredDocs: RequiredDocument[] = parseJsonSafe(application.template.requiredDocuments, []);

    const checkResults: DocumentCheckResult[] = requiredDocs.map((req) => {
      // Check if citizen has this doc type or alternative
      const foundDoc = userDocuments.find(
        (ud) =>
          ud.type === req.documentType ||
          (req.alternatives && (req.alternatives as unknown as string[]).includes(ud.type))
      );

      if (!foundDoc) {
        return {
          documentType: req.documentType,
          label: req.label,
          mandatory: req.mandatory,
          status: req.mandatory ? 'MISSING' : 'OPTIONAL_MISSING',
          note: 'Not found in your verified DigiLocker documents',
          howToObtain: req.howToObtain,
        } as DocumentCheckResult;
      }

      // Check document expiry if applicable
      if (foundDoc.expiryDate && new Date(foundDoc.expiryDate) < new Date()) {
        return {
          documentType: req.documentType,
          label: req.label,
          mandatory: req.mandatory,
          status: 'NEEDS_REVIEW',
          documentId: foundDoc.id,
          note: `Document expired on ${new Date(foundDoc.expiryDate).toLocaleDateString('en-IN')}. Please renew.`,
        } as DocumentCheckResult;
      }

      return {
        documentType: req.documentType,
        label: req.label,
        mandatory: req.mandatory,
        status: 'AVAILABLE',
        documentId: foundDoc.id,
        note: `Verified from ${foundDoc.issuingAuthority || 'DigiLocker'}`,
      } as DocumentCheckResult;
    });

    // Determine status
    const hasMissingMandatory = checkResults.some(
      (r) => r.mandatory && r.status === 'MISSING'
    );

    const newStatus = hasMissingMandatory ? 'DOCUMENTS_PENDING' : 'IN_PROGRESS';

    await prisma.application.update({
      where: { id },
      data: {
        documentCheckResults: JSON.stringify(checkResults),
        status: newStatus,
        currentStep: Math.max(application.currentStep, 5),
      },
    });

    await prisma.activityLog.create({
      data: {
        userId: session.userId,
        action: 'DOCUMENT_CHECK_COMPLETED',
        details: `Requirement verification: ${checkResults.filter((r) => r.status === 'AVAILABLE').length}/${checkResults.length} available`,
        applicationId: id,
      },
    });

    return NextResponse.json({
      checkResults,
      allMandatoryPresent: !hasMissingMandatory,
      status: newStatus,
      state: application.state,
      applicationType: application.applicationType,
    });
  } catch (error) {
    console.error('Document check error:', error);
    return NextResponse.json({ error: 'Document check failed' }, { status: 500 });
  }
}
