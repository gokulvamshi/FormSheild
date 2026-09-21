export const runtime = 'edge';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/session';
import { parseJsonSafe } from '@/lib/utils';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = getSessionFromRequest(req);
  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized. Please sign in to submit your application.' },
      { status: 401 }
    );
  }

  const { id } = await params;

  try {
    const body = await req.json().catch(() => ({}));
    const { submittedFormData } = body;

    // Fetch the application and associated template
    const application = await prisma.application.findFirst({
      where: { id, userId: session.userId },
      include: { template: true },
    });

    if (!application) {
      return NextResponse.json(
        { error: 'Application not found or access denied.' },
        { status: 404 }
      );
    }

    // Determine form data to validate
    const existingFormData = parseJsonSafe<Record<string, string>>(
      application.generatedFormData,
      {}
    );
    const finalFormData = {
      ...existingFormData,
      ...(submittedFormData || {}),
    };

    // Validate required fields from template if available
    if (application.template?.formTemplate) {
      const formFields = parseJsonSafe<Array<{ fieldId: string; label: string; required?: boolean }>>(
        application.template.formTemplate,
        []
      );

      const missingFields: string[] = [];
      formFields.forEach((field) => {
        if (field.required) {
          const val = finalFormData[field.fieldId] || finalFormData[field.label];
          if (!val || String(val).trim() === '') {
            missingFields.push(field.label);
          }
        }
      });

      if (missingFields.length > 0) {
        return NextResponse.json(
          {
            error: 'Form validation failed. Please fill in all required fields before submitting.',
            missingFields,
          },
          { status: 400 }
        );
      }
    } else if (Object.keys(finalFormData).length === 0) {
      return NextResponse.json(
        { error: 'Application has no form data. Please complete review before submitting.' },
        { status: 400 }
      );
    }

    // Generate official submission reference code
    const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const submissionRef = `SUB-${datePart}-${id.slice(-6).toUpperCase()}`;
    const submissionTime = new Date().toISOString();

    // Update application in database
    const updatedApplication = await prisma.application.update({
      where: { id },
      data: {
        status: 'SUBMITTED',
        currentStep: 7,
        generatedFormData: JSON.stringify(finalFormData),
      },
    });

    // Create activity log
    try {
      await prisma.activityLog.create({
        data: {
          userId: session.userId,
          action: 'APPLICATION_SUBMITTED',
          details: `Application for ${application.applicationType} submitted online with reference ${submissionRef}.`,
          applicationId: id,
        },
      });
    } catch (logErr) {
      console.warn('Activity log creation warning:', logErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Application has been successfully submitted.',
      submissionReference: submissionRef,
      submittedAt: submissionTime,
      status: 'SUBMITTED',
      applicationId: id,
      state: updatedApplication.state,
      applicationType: updatedApplication.applicationType,
    });
  } catch (error) {
    console.error('Application submit error:', error);
    return NextResponse.json(
      { error: 'Failed to process online submission. Please try again or download the form.' },
      { status: 500 }
    );
  }
}
