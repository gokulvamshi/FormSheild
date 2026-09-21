'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  Circle,
  ChevronRight,
  Download,
  Send,
  AlertCircle,
  FileCheck,
  Shield,
  Copy,
  ExternalLink,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/common/Toast';
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
  { id: 7, label: 'Submit & Download' },
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
        category={wizardState.selectedCategory!}
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
        formData={wizardState.generatedFormData}
        formFields={wizardState.formFields}
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
// Download & Submit Step (Step 7)
// ─────────────────────────────────────────────────────────────

interface SubmissionReceipt {
  reference: string;
  submittedAt: string;
}

function DownloadStep({
  applicationId,
  applicationType,
  state,
  formData = {},
  formFields = [],
  onDone,
}: {
  applicationId: string;
  applicationType: string;
  state: string;
  formData?: Record<string, string>;
  formFields?: unknown[];
  onDone: () => void;
}) {
  const { showToast } = useToast();
  const [downloading, setDownloading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<SubmissionReceipt | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [downloadCount, setDownloadCount] = useState(0);

  // Validate form data before submission
  const validateBeforeSubmission = async (): Promise<boolean> => {
    setValidationErrors([]);
    try {
      const res = await fetch(`/api/applications/${applicationId}`);
      const app = await res.json();
      const currentData = app.generatedFormData || formData || {};
      const templateFields = app.template?.formTemplate || formFields || [];

      const missing: string[] = [];
      templateFields.forEach((field: any) => {
        if (field.required) {
          const val = currentData[field.fieldId] || currentData[field.label];
          if (!val || String(val).trim() === '') {
            missing.push(field.label);
          }
        }
      });

      if (missing.length > 0) {
        setValidationErrors(missing);
        showToast('Please fill in all required fields before submitting.', 'error');
        return false;
      }
      return true;
    } catch {
      return true;
    }
  };

  // Submit Application Online
  const handleSubmitOnline = async () => {
    const isValid = await validateBeforeSubmission();
    if (!isValid) return;

    setSubmitting(true);
    try {
      const res = await fetch(`/api/applications/${applicationId}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ submittedFormData: formData }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.missingFields) {
          setValidationErrors(data.missingFields);
        }
        throw new Error(data.error || 'Submission failed');
      }

      setSubmissionSuccess({
        reference: data.submissionReference || `SUB-${Date.now().toString().slice(-6)}`,
        submittedAt: data.submittedAt || new Date().toISOString(),
      });
      showToast('Application successfully submitted online! 🎉', 'success');
    } catch (error: any) {
      console.error('Submit error:', error);
      showToast(error.message || 'Failed to submit application. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  // Download PDF (Clean, Official, Unbranded)
  const handleDownload = async (submissionRef?: string) => {
    setDownloading(true);
    try {
      const res = await fetch(`/api/applications/${applicationId}`);
      const app = await res.json();

      const doc = generateApplicationPdf({
        applicationId,
        applicationType,
        applicationTitle:
          app.template?.displayName || app.template?.title || applicationType.replace(/_/g, ' '),
        state,
        category: app.template?.category || app.category || 'General',
        formData: app.generatedFormData || formData || {},
        formFields: (app.template?.formTemplate || formFields || []).map((f: any) => ({
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
        submissionRef: submissionRef || submissionSuccess?.reference,
      });

      const cleanFileName = `Official_Application_${applicationType}_${new Date().toISOString().slice(0, 10)}.pdf`;
      doc.save(cleanFileName);
      setDownloadCount((prev) => prev + 1);
      showToast('Official application form downloaded.', 'success');

      // Update status to DOWNLOADED only if not already SUBMITTED
      if (!submissionSuccess && app.status !== 'SUBMITTED') {
        await fetch(`/api/applications/${applicationId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'DOWNLOADED' }),
        });
      }
    } catch (error) {
      console.error('PDF generation error:', error);
      showToast('Failed to generate PDF. Please try again.', 'error');
    } finally {
      setDownloading(false);
    }
  };

  // Render Submission Success Card
  if (submissionSuccess) {
    return (
      <div className="card max-w-2xl mx-auto py-8 px-6 text-center animate-fadeInUp">
        <div className="w-16 h-16 rounded-full bg-[#f0fdf4] border border-[#bbf7d0] flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={36} className="text-[#16a34a]" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-bold mb-3">
          <FileCheck size={13} />
          <span>OFFICIALLY SUBMITTED</span>
        </div>

        <h2 className="text-2xl font-extrabold text-[#111827] mb-2">
          Application Registered Successfully!
        </h2>
        <p className="text-sm text-[#6b7280] mb-6 max-w-lg mx-auto">
          Your application has been registered with the departmental system. Please retain your reference number for status tracking.
        </p>

        {/* Reference Code Box */}
        <div className="bg-[#f8fafc] border-2 border-dashed border-[#cbd5e1] rounded-xl p-4 mb-6 max-w-md mx-auto flex items-center justify-between">
          <div className="text-left">
            <span className="text-[11px] font-bold text-[#64748b] uppercase tracking-wider block">
              Submission Reference No.
            </span>
            <span className="font-mono text-base font-bold text-[#0f172a]">
              {submissionSuccess.reference}
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(submissionSuccess.reference);
              showToast('Reference copied to clipboard', 'info');
            }}
            className="btn-ghost text-xs py-1.5 px-2.5"
            title="Copy Reference"
          >
            <Copy size={13} />
            Copy
          </button>
        </div>

        {/* Next Steps */}
        <div className="bg-[#f0fdf4] border border-[#dcfce7] rounded-xl p-4 text-left mb-6 text-xs text-[#166534] space-y-2">
          <p className="font-bold text-sm text-[#15803d]">What happens next?</p>
          <ul className="list-disc list-inside space-y-1 text-[#166534]/90">
            <li>The concerned department officer will inspect the pre-verified DigiLocker records.</li>
            <li>You can download the stamped official submission copy below.</li>
            <li>Status updates will reflect on your dashboard.</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => handleDownload(submissionSuccess.reference)}
            disabled={downloading}
            className="btn-primary text-sm py-2.5 px-5 w-full sm:w-auto"
          >
            {downloading ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Generating PDF...
              </>
            ) : (
              <>
                <Download size={15} />
                Download Stamped PDF
              </>
            )}
          </button>
          <button
            type="button"
            onClick={onDone}
            className="btn-secondary text-sm py-2.5 px-5 w-full sm:w-auto"
          >
            Go to My Applications
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card max-w-3xl mx-auto py-8 px-6 text-center">
      {/* Icon */}
      <div className="w-16 h-16 rounded-2xl bg-[#eff6ff] border border-[#bfdbfe] flex items-center justify-center mx-auto mb-4">
        <FileCheck size={32} className="text-[#1a73e8]" />
      </div>

      <h2 className="text-2xl font-extrabold text-[#111827] mb-2">
        Your Official Application is Ready
      </h2>
      <p className="text-sm text-[#6b7280] max-w-lg mx-auto mb-8">
        Your application has been pre-verified against DigiLocker records and formatted in accordance with official departmental guidelines.
      </p>

      {/* Validation Errors Notice */}
      {validationErrors.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-left text-xs text-red-800"
        >
          <div className="flex items-center gap-2 font-bold mb-1 text-red-700">
            <AlertCircle size={15} />
            <span>Missing Required Information:</span>
          </div>
          <ul className="list-disc list-inside space-y-0.5 ml-2">
            {validationErrors.map((field, idx) => (
              <li key={idx}>{field}</li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Two Prominent Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8 text-left">
        {/* Option 1: Submit Directly Online */}
        <div className="p-6 rounded-2xl border-2 border-[#1a73e8] bg-gradient-to-b from-blue-50/40 to-white flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="absolute top-3 right-3">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#1a73e8] text-white px-2 py-0.5 rounded-full">
              Recommended
            </span>
          </div>

          <div>
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-[#1a73e8] mb-3">
              <Send size={18} />
            </div>
            <h3 className="font-bold text-base text-[#111827] mb-1.5">
              Submit Online Directly
            </h3>
            <p className="text-xs text-[#6b7280] leading-relaxed mb-4">
              Directly submit this application to the department backend registry. Generates official tracking token and acknowledgment.
            </p>
          </div>

          <button
            type="button"
            onClick={handleSubmitOnline}
            disabled={submitting}
            className="btn-primary w-full justify-center text-sm py-3 font-semibold shadow-sm"
          >
            {submitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Submitting Application...
              </>
            ) : (
              <>
                <Send size={15} />
                Submit Application Online
              </>
            )}
          </button>
        </div>

        {/* Option 2: Download Official Form (PDF) */}
        <div className="p-6 rounded-2xl border border-[#e2e8f0] bg-white flex flex-col justify-between hover:border-[#cbd5e1] hover:shadow-md transition-all">
          <div>
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-[#475569] mb-3">
              <Download size={18} />
            </div>
            <h3 className="font-bold text-base text-[#111827] mb-1.5">
              Download Official PDF
            </h3>
            <p className="text-xs text-[#6b7280] leading-relaxed mb-4">
              Get an official unbranded government application form formatted for A4 printing, manual submission, or state portal upload.
            </p>
          </div>

          <div>
            <button
              type="button"
              onClick={() => handleDownload()}
              disabled={downloading}
              className="btn-secondary w-full justify-center text-sm py-3 font-semibold"
            >
              {downloading ? (
                <>
                  <span className="w-4 h-4 border-2 border-[#1a73e8] border-t-transparent rounded-full animate-spin" />
                  Generating PDF...
                </>
              ) : (
                <>
                  <Download size={15} />
                  Download Application (PDF)
                </>
              )}
            </button>
            {downloadCount > 0 && (
              <p className="text-[11px] text-[#16a34a] font-medium text-center mt-2 flex items-center justify-center gap-1">
                <CheckCircle2 size={12} />
                Downloaded ({downloadCount})
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Exit Button */}
      <div className="pt-2 border-t border-[#f1f5f9] flex justify-center">
        <button type="button" onClick={onDone} className="btn-ghost text-xs text-[#64748b]">
          Save & Exit to Applications
        </button>
      </div>
    </div>
  );
}

