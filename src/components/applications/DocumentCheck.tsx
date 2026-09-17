'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  AlertCircle,
  RefreshCw,
  ExternalLink,
  ShieldAlert,
  Lock,
} from 'lucide-react';
import type { DocumentCheckResult } from '@/types/application';
import { useToast } from '@/components/common/Toast';

interface DocumentCheckProps {
  applicationId: string;
  onComplete: (results: DocumentCheckResult[]) => void;
  onBack: () => void;
}

export default function DocumentCheck({ applicationId, onComplete, onBack }: DocumentCheckProps) {
  const { showToast } = useToast();
  const [checkResults, setCheckResults] = useState<DocumentCheckResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [authorizing, setAuthorizing] = useState(false);
  const [checked, setChecked] = useState(false);
  const [allMandatoryPresent, setAllMandatoryPresent] = useState(false);
  const [appState, setAppState] = useState<string | null>(null);
  const [appType, setAppType] = useState<string | null>(null);

  const runCheck = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/applications/${applicationId}/check-documents`, {
        method: 'POST',
      });
      const data = await res.json();
      if (res.ok) {
        setCheckResults(data.checkResults || []);
        setAllMandatoryPresent(data.allMandatoryPresent);
        setAppState(data.state || null);
        setAppType(data.applicationType || null);
        setChecked(true);
      } else {
        showToast(data.error || 'Failed to check document requirements', 'error');
      }
    } catch (error) {
      console.error('Document check error:', error);
      showToast('Network error while verifying documents', 'error');
    } finally {
      setLoading(false);
    }
  }, [applicationId, showToast]);

  useEffect(() => {
    runCheck();
  }, [runCheck]);

  // Handle authorizing missing certificates through Setu DigiLocker
  const handleAuthorizeDocument = async (docType?: string) => {
    setAuthorizing(true);
    try {
      showToast('Creating DigiLocker consent session via Setu Gateway...', 'info');
      const res = await fetch('/api/digilocker/create-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          state: appState,
          applicationType: appType,
          docType: docType || undefined,
          redirectPath: window.location.pathname,
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        showToast(data.error || 'Failed to initiate DigiLocker session', 'error');
        setAuthorizing(false);
      }
    } catch (err: any) {
      showToast(err.message || 'Failed to connect to DigiLocker gateway', 'error');
      setAuthorizing(false);
    }
  };

  const available = checkResults.filter((r) => r.status === 'AVAILABLE');
  const missing = checkResults.filter((r) => r.status === 'MISSING');
  const needsReview = checkResults.filter((r) => r.status === 'NEEDS_REVIEW');
  const optionalMissing = checkResults.filter((r) => r.status === 'OPTIONAL_MISSING');

  return (
    <div>
      <button onClick={onBack} className="btn-ghost mb-4 -ml-2 text-sm cursor-pointer">
        <ArrowLeft size={15} />
        Back
      </button>

      <div className="mb-6">
        <div className="text-label mb-1.5">STEP 5 OF 7</div>
        <h2 className="text-heading-lg mb-1">Document Requirements Verification</h2>
        <p className="text-[#6b7280] text-sm">
          We cross-check your DigiLocker documents against the strict statutory requirements for this application.
        </p>
      </div>

      {loading ? (
        <div className="card py-12 text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-[#e8f0fe] flex items-center justify-center mx-auto mb-2">
            <RefreshCw size={28} className="text-[#1a73e8] animate-spin" />
          </div>
          <h3 className="font-semibold text-[#1f2937]">Verifying Official Document Records...</h3>
          <p className="text-xs text-[#6b7280] max-w-sm mx-auto">
            Matching required certificates against your authenticated DigiLocker account.
          </p>
        </div>
      ) : (
        <>
          {/* Summary Banner */}
          {checked && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`rounded-2xl p-5 mb-6 flex items-start gap-4 shadow-sm border ${
                allMandatoryPresent
                  ? 'bg-[#f0fdf4] border-[#bbf7d0]'
                  : 'bg-[#fffbeb] border-[#fde68a]'
              }`}
            >
              {allMandatoryPresent ? (
                <CheckCircle2 size={24} className="text-[#16a34a] shrink-0 mt-0.5" />
              ) : (
                <ShieldAlert size={24} className="text-[#d97706] shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <p className={`font-bold text-sm ${allMandatoryPresent ? 'text-[#15803d]' : 'text-[#92400e]'}`}>
                  {allMandatoryPresent
                    ? 'All Mandatory Documents Verified & Ready!'
                    : `Action Required: ${missing.length} Mandatory Document(s) Missing`}
                </p>
                <p className={`text-xs mt-1 leading-relaxed ${allMandatoryPresent ? 'text-[#166534]' : 'text-[#78350f]'}`}>
                  {allMandatoryPresent
                    ? 'All required certificates are present in your DigiLocker and will be used to auto-populate the official government template.'
                    : 'To avoid application rejection, please authorize the missing certificates through your DigiLocker account.'}
                </p>

                {!allMandatoryPresent && (
                  <div className="mt-3">
                    <button
                      onClick={() => handleAuthorizeDocument()}
                      disabled={authorizing}
                      className="btn-primary text-xs py-2 px-3.5 flex items-center gap-1.5 shadow-sm"
                    >
                      <Lock size={12} />
                      {authorizing ? 'Connecting to DigiLocker...' : 'Authorize Missing Certificates via DigiLocker'}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Document List */}
          <div className="space-y-3 mb-6">
            {checkResults.map((result, i) => {
              const isAvail = result.status === 'AVAILABLE';
              const isMiss = result.status === 'MISSING';
              const isReview = result.status === 'NEEDS_REVIEW';

              return (
                <motion.div
                  key={result.documentType + i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className={`p-4 rounded-xl border transition-all ${
                    isAvail
                      ? 'bg-white border-emerald-200 shadow-sm'
                      : isMiss
                      ? 'bg-red-50/50 border-red-200'
                      : isReview
                      ? 'bg-amber-50/50 border-amber-200'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="shrink-0 mt-0.5">
                        {isAvail && <CheckCircle2 size={20} className="text-[#16a34a]" />}
                        {isMiss && <XCircle size={20} className="text-[#dc2626]" />}
                        {isReview && <AlertCircle size={20} className="text-[#f59e0b]" />}
                        {!isAvail && !isMiss && !isReview && <AlertCircle size={20} className="text-[#9ca3af]" />}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold text-[#1f2937]">{result.label}</p>
                          {result.mandatory ? (
                            <span className="text-[10px] font-bold text-red-700 bg-red-100/80 px-2 py-0.5 rounded-full">
                              MANDATORY
                            </span>
                          ) : (
                            <span className="text-[10px] font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
                              OPTIONAL
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#6b7280] mt-1">{result.note}</p>
                      </div>
                    </div>

                    {isMiss && (
                      <button
                        onClick={() => handleAuthorizeDocument(result.documentType)}
                        disabled={authorizing}
                        className="btn-secondary text-xs py-1.5 px-3 shrink-0 flex items-center gap-1.5"
                      >
                        <Lock size={11} />
                        Authorize
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 flex-wrap items-center">
            {allMandatoryPresent ? (
              <button
                onClick={() => onComplete(checkResults)}
                className="btn-primary text-sm py-2.5 px-6 shadow-md cursor-pointer"
              >
                <CheckCircle2 size={16} />
                Continue to Form Preview →
              </button>
            ) : (
              <>
                <button
                  onClick={() => handleAuthorizeDocument()}
                  disabled={authorizing}
                  className="btn-primary text-sm py-2.5 px-5 cursor-pointer flex items-center gap-2"
                >
                  <Lock size={14} />
                  {authorizing ? 'Connecting...' : 'Authorize on DigiLocker'}
                </button>
                <button
                  onClick={runCheck}
                  disabled={loading}
                  className="btn-secondary text-sm py-2.5 px-4 cursor-pointer flex items-center gap-2"
                >
                  <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                  Re-check
                </button>
                <button
                  onClick={() => onComplete(checkResults)}
                  className="btn-ghost text-xs text-[#9ca3af] hover:text-[#6b7280] ml-auto cursor-pointer"
                >
                  Proceed with missing documents
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
