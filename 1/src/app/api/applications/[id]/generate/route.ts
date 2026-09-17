import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/session';
import { parseJsonSafe } from '@/lib/utils';
import { autoFillForm } from '@/lib/form-filler';
import { mergeExtractedData } from '@/lib/document-parser';
import type { FormField } from '@/types/application';
import type { DocumentType } from '@/types/document';
import type { ExtractedData } from '@/lib/document-parser';

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = getSessionFromRequest(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;

  try {
    const application = await prisma.application.findFirst({
      where: { id, userId: session.userId },
      include: { template: true },
    });

    if (!application || !application.template) {
      return NextResponse.json({ error: 'Application or template not found' }, { status: 404 });
    }

    // Get user's documents with extracted data
    const userDocuments = await prisma.document.findMany({
      where: { userId: session.userId },
    });

    // Merge extracted data from all documents
    const docsWithData = userDocuments.map((doc) => ({
      type: doc.type as DocumentType,
      extractedData: parseJsonSafe<ExtractedData>(doc.extractedData, {}),
    }));

    const mergedData = mergeExtractedData(docsWithData);

    // Get follow-up answers
    const followUpAnswers = parseJsonSafe<Record<string, string | boolean | number>>(
      application.followUpAnswers,
      {}
    );

    // Get form template
    const formFields: FormField[] = parseJsonSafe(application.template.formTemplate, []);

    // Auto-fill the form
    const filledFormData = autoFillForm(formFields, mergedData, followUpAnswers);

    // Update application
    await prisma.application.update({
      where: { id },
      data: {
        generatedFormData: JSON.stringify(filledFormData),
        status: 'READY',
        currentStep: Math.max(application.currentStep, 6),
      },
    });

    await prisma.activityLog.create({
      data: {
        userId: session.userId,
        action: 'APPLICATION_GENERATED',
        details: `Application form auto-filled with ${Object.keys(filledFormData).length} fields`,
        applicationId: id,
      },
    });

    return NextResponse.json({
      filledFormData,
      formFields,
      fieldsCount: Object.keys(filledFormData).length,
      totalFields: formFields.length,
    });
  } catch (error) {
    console.error('Generate form error:', error);
    return NextResponse.json({ error: 'Failed to generate application form' }, { status: 500 });
  }
}
