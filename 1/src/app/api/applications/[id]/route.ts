import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/session';
import { parseJsonSafe } from '@/lib/utils';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = getSessionFromRequest(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;

  try {
    const application = await prisma.application.findFirst({
      where: { id, userId: session.userId },
      include: { template: true },
    });

    if (!application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    return NextResponse.json({
      ...application,
      documentCheckResults: parseJsonSafe(application.documentCheckResults, null),
      followUpAnswers: parseJsonSafe(application.followUpAnswers, null),
      generatedFormData: parseJsonSafe(application.generatedFormData, null),
      template: application.template
        ? {
            ...application.template,
            requiredDocuments: parseJsonSafe(application.template.requiredDocuments, []),
            eligibilityCriteria: parseJsonSafe(application.template.eligibilityCriteria, []),
            followUpQuestions: parseJsonSafe(application.template.followUpQuestions, []),
            formTemplate: parseJsonSafe(application.template.formTemplate, []),
            submissionInstructions: parseJsonSafe(application.template.submissionInstructions, {}),
          }
        : null,
    });
  } catch (error) {
    console.error('Application GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch application' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = getSessionFromRequest(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;

  try {
    const body = await req.json();
    const {
      status, currentStep, followUpAnswers, documentCheckResults, generatedFormData, pdfUrl,
    } = body;

    const application = await prisma.application.findFirst({
      where: { id, userId: session.userId },
    });

    if (!application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    const updated = await prisma.application.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(currentStep !== undefined && { currentStep }),
        ...(followUpAnswers && { followUpAnswers: JSON.stringify(followUpAnswers) }),
        ...(documentCheckResults && { documentCheckResults: JSON.stringify(documentCheckResults) }),
        ...(generatedFormData && { generatedFormData: JSON.stringify(generatedFormData) }),
        ...(pdfUrl && { pdfUrl }),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Application PUT error:', error);
    return NextResponse.json({ error: 'Failed to update application' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = getSessionFromRequest(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;

  try {
    const application = await prisma.application.findFirst({
      where: { id, userId: session.userId },
    });

    if (!application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    await prisma.application.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Application DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete application' }, { status: 500 });
  }
}
