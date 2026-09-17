import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/session';
import { parseJsonSafe } from '@/lib/utils';

export async function GET(req: NextRequest) {
  const session = getSessionFromRequest(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const [user, applications, documents] = await Promise.all([
      prisma.user.findUnique({
        where: { id: session.userId },
        select: { id: true, name: true, phone: true, email: true, digilockerConnected: true, mockMode: true, language: true },
      }),
      prisma.application.findMany({
        where: { userId: session.userId },
        orderBy: { updatedAt: 'desc' },
        take: 5,
      }),
      prisma.document.count({ where: { userId: session.userId } }),
    ]);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const stats = {
      activeApplications: applications.filter((a) => ['IN_PROGRESS', 'DOCUMENTS_PENDING', 'DRAFT'].includes(a.status)).length,
      readyToSubmit: applications.filter((a) => a.status === 'READY').length,
      needsAttention: applications.filter((a) => a.status === 'DOCUMENTS_PENDING').length,
      documentsConnected: documents,
    };

    const recentApplications = applications.map((app) => ({
      id: app.id,
      state: app.state,
      category: app.category,
      applicationType: app.applicationType,
      status: app.status,
      currentStep: app.currentStep,
      createdAt: app.createdAt,
      updatedAt: app.updatedAt,
      documentCheckResults: parseJsonSafe(app.documentCheckResults, null),
    }));

    return NextResponse.json({ user, stats, recentApplications });
  } catch (error) {
    console.error('Dashboard error:', error);
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 });
  }
}
