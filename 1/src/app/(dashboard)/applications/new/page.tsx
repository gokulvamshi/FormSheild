import type { Metadata } from 'next';
import ApplicationWizard from '@/components/applications/ApplicationWizard';

export const metadata: Metadata = { title: 'New Application' };

export default function NewApplicationPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <p className="text-label mb-1">NEW APPLICATION</p>
        <h1 className="text-heading-xl">Create New Application</h1>
        <p className="text-[#6b7280] text-sm mt-1">
          Follow the steps below to create a pre-filled, rejection-proof application.
        </p>
      </div>
      <ApplicationWizard />
    </div>
  );
}
