export const runtime = 'edge';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/session';
import { parseJsonSafe } from '@/lib/utils';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = getSessionFromRequest(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;

  try {
    const template = await prisma.applicationTemplate.findUnique({ where: { id } });
    if (!template) return NextResponse.json({ error: 'Template not found' }, { status: 404 });

    return NextResponse.json({
      ...template,
      requiredDocuments: parseJsonSafe(template.requiredDocuments, []),
      eligibilityCriteria: parseJsonSafe(template.eligibilityCriteria, []),
      followUpQuestions: parseJsonSafe(template.followUpQuestions, []),
      formTemplate: parseJsonSafe(template.formTemplate, []),
      submissionInstructions: parseJsonSafe(template.submissionInstructions, {}),
    });
  } catch (error) {
    console.error('Template GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch template' }, { status: 500 });
  }
}
