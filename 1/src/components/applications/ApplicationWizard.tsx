'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import StateSelector from './StateSelector';
import CategorySelector from './CategorySelector';
import ApplicationTypeSelector from './ApplicationTypeSelector';
import FollowUpQuestions from './FollowUpQuestions';
import DocumentCheck from './DocumentCheck';
import FormPreview from './FormPreview';
import { generateApplicationPdf } from '@/lib/pdf-generator';

const STEPS = [
  { id: 1, label: 'State' },
  { id: 2, label: 'Category' },
  { id: 3, label: 'Application' },
  { id: 4, label: 'Questions' },
  { id: 5, label: 'Documents' },
  { id: 6, label: 'Preview' },
  { id: 7, label: 'Download' },
];

export interface WizardState {
  selectedState: string | null;
  selectedCategory: string | null;
  selectedType: string | null;
  templateId: string | null;
  applicationId: string | null;
  followUpAnswers: Record<string, string | boolean | number>;
  documentCheckResults: unknown[];
  generatedFormData: Record<string, string>;
  formFields: unknown[];
  status: string;
}

export default function ApplicationWizard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [wizardState, setWizardState] = useState<WizardState>({
    selectedState: null,
    selectedCategory: null,
    selectedType: null,
    templateId: null,
    applicationId: null,
    followUpAnswers: {},
    documentCheckResults: [],
    generatedFormData: {},
    formFields: [],
    status: 'DRAFT',
  });

  const updateWizard = useCallback((updates: Partial<WizardState>) => {
    setWizardState((prev) => ({ ...prev, ...updates }));
  }, []);

  const goNext = useCallback(() => {
    setCurrentStep((s) => Math.min(s + 1, STEPS.length));
  }, []);

  const goBack = useCallback(() => {
    setCurrentStep((s) => Math.max(s - 1, 1));
  }, []);

  const stepContent: Record<number, React.ReactNode> = {
    1: (
      <StateSelector
        selected={wizardState.selectedState}
        onSelect={(state) => {
          updateWizard({ selectedState: state, selectedCategory: null, selectedType: null });
          goNext();
        }}
      />
    ),
    2: (
      <CategorySelector
        state={wizardState.selectedState!}
        selected={wizardState.selectedCategory}
        onSelect={(cat) => {
          updateWizard({ selectedCategory: cat, selectedType: null });
          goNext();
        }}
        onBack={goBack}
      />
    ),
    3: (
      <ApplicationTypeSelector
        state={wizardState.selectedState!}
        category={wizardState.selectedCategory!}
        selected={wizardState.selectedType}
        onSelect={(type, templateId) => {
          updateWizard({ selectedType: type, templateId });
          goNext();
        }}
        onBack={goBack}
      />
    ),
    4: (
      <FollowUpQuestions
        state={wizardState.selectedState!}
        applicationType={wizardState.selectedType!}
        templateId={wizardState.templateId!}
        answers={wizardState.followUpAnswers}
        onSubmit={(answers, appId) => {
          updateWizard({ followUpAnswers: answers, applicationId: appId });
          goNext();
        }}
        onBack={goBack}
      />
    ),
    5: (
      <DocumentCheck
        applicationId={wizardState.applicationId!}
        onComplete={(results) => {
          updateWizard({ documentCheckResults: results as unknown[] });
          goNext();
        }}
        onBack={goBack}
      />
    ),
    6: (
      <FormPreview
        applicationId={wizardState.applicationId!}
        onGenerate={(formData, fields) => {
          updateWizard({
            generatedFormData: formData,
            formFields: fields as unknown[],
            status: 'READY',
          });
          goNext();
        }}
        onBack={goBack}
      />
    ),
    7: (
      <DownloadStep
        applicationId={wizardState.applicationId!}
        applicationType={wizardState.selectedType!}
        state={wizardState.selectedState!}
        onDone={() => router.push('/applications')}
      />
    ),
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Step Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center gap-0">
          {STEPS.map((step, index) => {
            const isCompleted = currentStep > step.id;
            const isActive = currentStep === step.id;

            return (
              <div key={step.id} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className={cn(
                      'step-circle',
                      isActive && 'active',
                      isCompleted && 'completed'
                    )}
                  >
                    {isCompleted ? (
                      <CheckCircle2 size={14} />
                    ) : isActive ? (
                      step.id
                    ) : (
                      <Circle size={10} strokeWidth={2} />
                    )}
                  </div>
                  <span
                    className={cn(
                      'text-[10px] font-medium whitespace-nowrap',
                      isActive ? 'text-[#1a73e8]' : isCompleted ? 'text-[#1a73e8]' : 'text-[#9ca3af]'
                    )}
                  >
                    {step.label}
                  </span>
                </div>
                {index < STEPS.length - 1 && (
                  <div
                    className={cn('step-connector mx-1 mb-5', isCompleted && 'completed')}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
        >
          {stepContent[currentStep]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Download Step (Step 7)
// ─────────────────────────────────────────────────────────────

function DownloadStep({
  applicationId,
  applicationType,
  state,
  onDone,
}: {
  applicationId: string;
  applicationType: string;
  state: string;
  onDone: () => void;
}) {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const res = await fetch(`/api/applications/${applicationId}`);
      const app = await res.json();

      const doc = generateApplicationPdf({
        applicationId,
        applicationType,
        applicationTitle: app.template?.displayName || app.template?.title || applicationType.replace(/_/g, ' '),
        state,
        category: app.template?.category || app.category || 'General',
        formData: app.generatedFormData || {},
        formFields: (app.template?.formTemplate || []).map((f: any) => ({
          fieldId: f.fieldId,
          label: f.label,
          section: f.section,
        })),
        verifiedDocuments: (app.documentCheckResults || []).map((d: any) => ({
          type: d.documentType || d.type || 'Document',
          name: d.label || d.name || 'Verified Certificate',
          verified: d.status === 'AVAILABLE' || d.status === 'VERIFIED',
        })),
        userName: app.user?.name || 'Citizen Applicant',
      });

      doc.save(`FormShield_${applicationType}_${new Date().toISOString().slice(0, 10)}.pdf`);
      setDownloaded(true);

      // Update status
      await fetch(`/api/applications/${applicationId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'DOWNLOADED' }),
      });
    } catch (error) {
      console.error('PDF generation error:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="card text-center py-10">
      {downloaded ? (
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div className="w-20 h-20 rounded-full bg-[#f0fdf4] flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 size={40} className="text-[#16a34a]" />
          </div>
          <h2 className="text-heading-lg mb-2 text-[#16a34a]">Application Downloaded! 🎉</h2>
          <p className="text-[#6b7280] mb-6 max-w-md mx-auto">
            Your completed application form has been saved. Please review it before submitting.
          </p>
          <div className="bg-[#f0fdf4] rounded-xl p-5 max-w-lg mx-auto mb-6 text-left">
            <h3 className="font-semibold text-[#15803d] mb-3">📋 Next Steps</h3>
            <ol className="space-y-2">
              {['Print the downloaded PDF on A4 paper', 'Attach all required original documents', 'Sign in the applicant signature section', 'Submit at the designated office or online portal', 'Keep the acknowledgment slip for future reference'].map((step, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[#166534]">
                  <span className="font-bold text-[#16a34a] flex-shrink-0">{i + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
          <button onClick={onDone} className="btn-primary">
            Back to My Applications <ChevronRight size={15} />
          </button>
        </motion.div>
      ) : (
        <>
          <div className="w-20 h-20 rounded-full bg-[#e8f0fe] flex items-center justify-center mx-auto mb-5">
            <span className="text-4xl">📄</span>
          </div>
          <h2 className="text-heading-lg mb-2">Your Application is Ready!</h2>
          <p className="text-[#6b7280] mb-2 max-w-lg mx-auto">
            Your form has been auto-filled with verified DigiLocker data and is ready for download.
            Review and download below.
          </p>
          <p className="text-sm text-[#9ca3af] mb-8">
            The PDF will look exactly like the official government form.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="btn-primary text-base px-8 py-3"
            >
              {downloading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Generating PDF...
                </>
              ) : (
                <>
                  ⬇️ Download Application PDF
                </>
              )}
            </button>
            <button onClick={onDone} className="btn-secondary">
              Save & Exit
            </button>
          </div>
        </>
      )}
    </div>
  );
}
