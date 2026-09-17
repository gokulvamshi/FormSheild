export const runtime = 'edge';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/session';
import { parseJsonSafe } from '@/lib/utils';

export async function GET(req: NextRequest) {
  const session = getSessionFromRequest(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(req.url);
    const state = searchParams.get('state');
    const category = searchParams.get('category');

    const where: Record<string, string> = {};
    if (state) where.state = state;
    if (category) where.category = category;

    const templates = await prisma.applicationTemplate.findMany({
      where,
      select: {
        id: true,
        state: true,
        category: true,
        applicationType: true,
        displayName: true,
        description: true,
        fees: true,
        processingTime: true,
        officialPortalUrl: true,
      },
      orderBy: [{ state: 'asc' }, { category: 'asc' }],
    });

    return NextResponse.json(templates);
  } catch (error) {
    console.error('Templates GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch templates' }, { status: 500 });
  }
}
