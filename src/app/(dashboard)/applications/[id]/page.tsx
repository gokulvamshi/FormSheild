'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Download,
  Edit3,
  ShieldCheck,
  AlertTriangle,
  FileText,
  Calendar,
  IndianRupee,
  Clock,
  ExternalLink,
  Trash2,
  RefreshCw,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import StatusBadge from '@/components/common/StatusBadge';
import ProgressBar from '@/components/common/ProgressBar';
import { STATE_LABELS, CATEGORY_LABELS, formatDateTime, formatDate } from '@/lib/utils';
import { generateApplicationPdf } from '@/lib/pdf-generator';

interface ApplicationData {
  id: string;
  state: string;
  category: string;
  applicationType: string;
  status: string;
  currentStep: number;
  createdAt: string;
  updatedAt: string;
  generatedFormData: Record<string, string> | null;
  documentCheckResults: Array<{
    documentType: string;
    label: string;
    mandatory: boolean;
    status: string;
    note?: string;
  }> | null;
  template?: {
    displayName: string;
    description: string;
    officialPortalUrl: string;
    fees: string;
    processingTime: string;
    formTemplate: Array<{
      fieldId: string;
      label: string;
      section?: string;
    }>;
    submissionInstructions?: {
      online?: string;
      offline?: string;
    };
  } | null;
  user?: {
    name?: string;
  };
}

export default function ApplicationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [app, setApp] = useState<ApplicationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/applications/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then((data) => setApp(data))
      .catch(() => router.push('/applications'))
      .finally(() => setLoading(false));
  }, [id, router]);

  const handleDownloadPdf = async () => {
    if (!app) return;
    setDownloading(true);
    try {
      const doc = generateApplicationPdf({
        applicationId: app.id,
        applicationType: app.applicationType,
        applicationTitle: app.template?.displayName || app.applicationType,
        state: app.state,
        category: app.category,
        formData: app.generatedFormData || {},
        formFields: app.template?.formTemplate || [],
        userName: app.user?.name || 'Citizen Applicant',
      });
      doc.save(`FormShield_${app.applicationType}_${app.state}.pdf`);
    } catch (err) {
      console.error('PDF error:', err);
    } finally {
      setDownloading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this application?')) return;
    setDeleting(true);
    try {
      await fetch(`/api/applications/${id}`, { method: 'DELETE' });
      router.push('/applications');
    } catch (err) {
      console.error('Delete error:', err);
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 max-w-5xl mx-auto flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="w-8 h-8 animate-spin text-[#1a73e8]" />
          <p className="text-sm text-[#6b7280]">Loading application details...</p>
        </div>
      </div>
    );
  }

  if (!app) return null;

  const progressPercent = Math.round((app.currentStep / 7) * 100);
  const docResults = app.documentCheckResults || [];
  const missingCount = docResults.filter((d) => d.status === 'MISSING').length;
  const verifiedCount = docResults.filter((d) => d.status === 'AVAILABLE').length;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Back Button & Actions */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <Link
          href="/applications"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6b7280] hover:text-[#1a73e8] transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Applications
        </Link>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="p-2 text-[#dc2626] hover:bg-red-50 rounded-lg transition-colors"
            title="Delete Application"
          >
            <Trash2 size={17} />
          </button>

          <button
            onClick={handleDownloadPdf}
            disabled={downloading}
            className="btn-primary text-sm py-2 px-4 flex items-center gap-2 cursor-pointer"
          >
            {downloading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Download size={16} />}
            Download PDF
          </button>
        </div>
      </div>

      {/* Header Info Card */}
      <div className="card mb-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <StatusBadge status={app.status} size="md" />
              <span className="text-xs text-[#9ca3af]">ID: {app.id.slice(0, 10)}...</span>
            </div>
            <h1 className="text-2xl font-bold text-[#111827]">
              {app.template?.displayName || app.applicationType}
            </h1>
            <p className="text-sm text-[#6b7280] mt-1">
              Government of {STATE_LABELS[app.state] || app.state} •{' '}
              {CATEGORY_LABELS[app.category] || app.category}
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-1 text-xs text-[#6b7280]">
            <div>Created: {formatDateTime(app.createdAt)}</div>
            <div>Last Updated: {formatDateTime(app.updatedAt)}</div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-6 pt-5 border-t border-[#e5e7eb]">
          <ProgressBar
            progress={progressPercent}
            size="md"
            color={app.status === 'READY' ? 'success' : 'primary'}
            showLabel
            label={`Completion Status: Step ${app.currentStep} of 7`}
          />
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {/* Metric 1: Rejection Prevention Health */}
        <div className="card bg-gradient-to-br from-[#f0fdf4] to-white border-green-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#dcfce7] flex items-center justify-center text-[#16a34a]">
              <ShieldCheck size={22} />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-[#16a34a] uppercase tracking-wider">
                Rejection Defense
              </p>
              <p className="text-lg font-bold text-[#111827]">
                {missingCount === 0 ? '98% Rejection-Proof' : 'Attention Needed'}
              </p>
            </div>
          </div>
          <p className="text-xs text-[#6b7280] mt-2">
            {missingCount === 0
              ? 'All critical documents verified via DigiLocker.'
              : `${missingCount} mandatory document(s) need attention.`}
          </p>
        </div>

        {/* Metric 2: Government Fee */}
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#eff6ff] flex items-center justify-center text-[#1a73e8]">
              <IndianRupee size={22} />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wider">
                Official Fee
              </p>
              <p className="text-lg font-bold text-[#111827]">
                {app.template?.fees || 'State prescribed'}
              </p>
            </div>
          </div>
          <p className="text-xs text-[#6b7280] mt-2">Paid on official state portal</p>
        </div>

        {/* Metric 3: Processing SLA */}
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#fef3c7] flex items-center justify-center text-[#d97706]">
              <Clock size={22} />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wider">
                Processing Time
              </p>
              <p className="text-lg font-bold text-[#111827]">
                {app.template?.processingTime || '7–14 days'}
              </p>
            </div>
          </div>
          <p className="text-xs text-[#6b7280] mt-2">Under Right to Public Services Act</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Form Data and Documents */}
        <div className="lg:col-span-2 space-y-6">
          {/* Document Verification Card */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-[#111827] flex items-center gap-2">
                <FileText size={18} className="text-[#1a73e8]" />
                DigiLocker Document Verification
              </h2>
              <span className="text-xs font-semibold text-[#16a34a]">
                {verifiedCount} of {docResults.length} Verified
              </span>
            </div>

            <div className="space-y-2.5">
              {docResults.length === 0 ? (
                <p className="text-xs text-[#6b7280] italic py-2">
                  No document check conducted yet. Resume wizard to verify documents.
                </p>
              ) : (
                docResults.map((doc, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border flex items-start justify-between gap-3 text-xs ${
                      doc.status === 'AVAILABLE'
                        ? 'bg-[#f0fdf4] border-green-200'
                        : 'bg-[#fef2f2] border-red-200'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      {doc.status === 'AVAILABLE' ? (
                        <CheckCircle2 className="w-4 h-4 text-[#16a34a] shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-4 h-4 text-[#dc2626] shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p className="font-semibold text-[#1f2937]">{doc.label}</p>
                        {doc.note && <p className="text-[#6b7280] mt-0.5">{doc.note}</p>}
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        doc.status === 'AVAILABLE'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {doc.status === 'AVAILABLE' ? 'VERIFIED' : 'MISSING'}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Form Data Preview Card */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-[#111827] flex items-center gap-2">
                <Edit3 size={18} className="text-[#1a73e8]" />
                Auto-Filled Form Preview
              </h2>
              <button
                onClick={handleDownloadPdf}
                className="text-xs text-[#1a73e8] hover:underline font-semibold flex items-center gap-1"
              >
                <Download size={13} />
                Download PDF
              </button>
            </div>

            {app.generatedFormData && Object.keys(app.generatedFormData).length > 0 ? (
              <div className="border border-[#e5e7eb] rounded-xl overflow-hidden divide-y divide-[#f3f4f6]">
                {Object.entries(app.generatedFormData).map(([key, val], idx) => {
                  const fieldDef = app.template?.formTemplate?.find((f) => f.fieldId === key);
                  const label = fieldDef?.label || key;

                  return (
                    <div
                      key={idx}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-3 text-xs hover:bg-[#fafafa] transition-colors gap-1"
                    >
                      <span className="font-semibold text-[#4b5563] sm:w-1/3">{label}</span>
                      <span className="text-[#111827] font-medium sm:w-2/3 truncate">
                        {String(val) || '—'}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-xs text-[#6b7280] border border-dashed border-[#e5e7eb] rounded-xl">
                Form has not been auto-filled yet. Resume application to generate form.
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Submission Portal & Official Instructions */}
        <div className="space-y-6">
          <div className="card bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <h3 className="text-sm font-bold text-[#1e40af] mb-2 flex items-center gap-2">
              <ExternalLink size={16} />
              Official State Portal
            </h3>
            <p className="text-xs text-[#3b82f6] mb-4">
              Submit your downloaded FormShield application package on the official government portal:
            </p>
            {app.template?.officialPortalUrl && (
              <a
                href={app.template.officialPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-xs py-2 px-3 w-full justify-center"
              >
                Open Official Portal
                <ExternalLink size={13} />
              </a>
            )}
          </div>

          <div className="card">
            <h3 className="text-sm font-bold text-[#111827] mb-3">Submission Guidelines</h3>
            <div className="text-xs text-[#4b5563] space-y-3">
              <div>
                <p className="font-semibold text-[#1f2937]">1. Online Portal Submission</p>
                <p className="text-[#6b7280] mt-0.5">
                  {app.template?.submissionInstructions?.online ||
                    'Upload the generated PDF on the official state department portal.'}
                </p>
              </div>
              <div className="pt-2 border-t border-[#f3f4f6]">
                <p className="font-semibold text-[#1f2937]">2. Physical / CSC Desk</p>
                <p className="text-[#6b7280] mt-0.5">
                  {app.template?.submissionInstructions?.offline ||
                    'Print the generated PDF, sign along the dotted lines, and submit at your nearest Citizen Service Centre.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
