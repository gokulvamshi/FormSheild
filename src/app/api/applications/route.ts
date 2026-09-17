export const runtime = 'edge';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/session';
import { parseJsonSafe } from '@/lib/utils';

export async function GET(req: NextRequest) {
  const session = getSessionFromRequest(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const applications = await prisma.application.findMany({
      where: { userId: session.userId },
      orderBy: { updatedAt: 'desc' },
    });

    return NextResponse.json(
      applications.map((app) => ({
        ...app,
        documentCheckResults: parseJsonSafe(app.documentCheckResults, null),
        followUpAnswers: parseJsonSafe(app.followUpAnswers, null),
        generatedFormData: parseJsonSafe(app.generatedFormData, null),
      }))
    );
  } catch (error) {
    console.error('Applications GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = getSessionFromRequest(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const { state, category, applicationType } = body;

    if (!state || !category || !applicationType) {
      return NextResponse.json({ error: 'State, category, and applicationType are required' }, { status: 400 });
    }

    // Find template
    const template = await prisma.applicationTemplate.findFirst({
      where: { state, applicationType },
    });

    const application = await prisma.application.create({
      data: {
        userId: session.userId,
        state,
        category,
        applicationType,
        status: 'DRAFT',
        currentStep: 1,
        templateId: template?.id,
      },
    });

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: session.userId,
        action: 'APPLICATION_CREATED',
        details: `Created new application: ${applicationType} in ${state}`,
        applicationId: application.id,
      },
    });

    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    console.error('Application POST error:', error);
    return NextResponse.json({ error: 'Failed to create application' }, { status: 500 });
  }
}
