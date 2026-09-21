'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Shield,
  RefreshCw,
  CheckCircle2,
  XCircle,
  ExternalLink,
  AlertCircle,
  Zap,
  Lock,
  ArrowRight,
  FileCheck,
} from 'lucide-react';
import { useToast } from '@/components/common/Toast';
import { useLanguage } from '@/context/LanguageContext';

function DigiLockerContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const { showToast } = useToast();

  const [user, setUser] = useState<{
    id?: string;
    digilockerConnected: boolean;
    mockMode: boolean;
    name: string | null;
    digilockerUserId?: string | null;
  } | null>(null);

  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [connecting, setConnecting] = useState(false);

  const fetchProfileAndDocs = async () => {
    try {
      const [userRes, docsRes] = await Promise.all([
        fetch('/api/user/profile'),
        fetch('/api/digilocker/documents'),
      ]);

      if (userRes.ok) {
        const userData = await userRes.json();
        setUser(userData);
      }
      if (docsRes.ok) {
        const docsData = await docsRes.json();
        setDocuments(docsData);
      }
    } catch (e) {
      console.error('Error fetching DigiLocker status:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileAndDocs();
  }, []);

  // Handle URL query parameters from Setu redirect callback
  useEffect(() => {
    const status = searchParams.get('status');
    const error = searchParams.get('error');

    if (status === 'connected') {
      showToast(
        'DigiLocker account successfully connected via Setu Gateway! Verified documents synced.',
        'success'
      );
      fetchProfileAndDocs();
    } else if (status === 'failed') {
      const msg = error ? decodeURIComponent(error) : 'DigiLocker consent was cancelled or failed.';
      showToast(msg, 'error');
    }
  }, [searchParams, showToast]);

  const handleSync = async () => {
    setSyncing(true);
    try {
      const res = await fetch('/api/digilocker/sync', { method: 'POST' });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast(data.message || 'Live documents synced successfully!', 'success');
        await fetchProfileAndDocs();
      } else {
        showToast(data.message || 'Failed to sync documents', 'warning');
      }
    } catch {
      showToast('Failed to connect to DigiLocker sync service. Please retry.', 'error');
    } finally {
      setSyncing(false);
    }
  };

  const handleConnectReal = async () => {
    setConnecting(true);
    try {
      const res = await fetch('/api/digilocker/create-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ redirectPath: '/digilocker' }),
      });
      const data = await res.json();

      if (data.url) {
        showToast('Redirecting to official DigiLocker consent screen...', 'info');
        window.location.href = data.url;
      } else {
        showToast(data.error || 'Failed to initiate Setu DigiLocker session.', 'error');
        setConnecting(false);
      }
    } catch (err: any) {
      showToast(err.message || 'Connection request failed.', 'error');
      setConnecting(false);
    }
  };

  const isConnected = Boolean(user?.digilockerConnected);

  if (loading) {
    return (
      <div className="p-6 max-w-4xl mx-auto space-y-4 animate-pulse">
        <div className="h-8 w-64 bg-gray-200 rounded-lg" />
        <div className="h-4 w-96 bg-gray-100 rounded" />
        <div className="h-44 bg-gray-100 rounded-2xl" />
        <div className="h-64 bg-gray-100 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#e8f0fe] text-[#1a73e8]">
            <Zap size={12} /> Setu Data Gateway (MeitY DigiLocker Partner)
          </span>
        </div>
        <h1 className="text-heading-xl mt-2">DigiLocker Integration</h1>
        <p className="text-sm text-[#6b7280] mt-1">
          Connect your official government DigiLocker to securely verify your identity and auto-fill forms with zero manual errors.
        </p>
      </div>

      {/* Main Connection Status Card */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="card mb-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3.5">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${
                isConnected
                  ? 'bg-gradient-to-br from-[#16a34a] to-[#15803d] text-white shadow-md'
                  : 'bg-[#fef2f2] text-[#dc2626]'
              }`}
            >
              <Shield size={26} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-base text-[#1f2937]">
                  {isConnected
                    ? t('sidebar.digilockerConnected', 'DigiLocker Connected')
                    : t('sidebar.digilockerNotConnected', 'DigiLocker Disconnected')}
                </p>
                {isConnected && (
                  <span className="px-2 py-0.5 bg-[#dcfce7] text-[#15803d] text-[11px] font-bold rounded-full">
                    LIVE
                  </span>
                )}
              </div>
              <p className="text-xs text-[#6b7280] mt-0.5">
                {isConnected
                  ? `Authenticated via Setu Gateway • Request ID: ${user?.digilockerUserId || 'Verified'}`
                  : 'Authorize DigiLocker to fetch verified Aadhaar and civil certificates instantly'}
              </p>
            </div>
          </div>
          {isConnected ? (
            <CheckCircle2 size={24} className="text-[#16a34a]" />
          ) : (
            <XCircle size={24} className="text-[#dc2626]" />
          )}
        </div>

        <div className="flex gap-3 flex-wrap pt-2 border-t border-[#f3f4f6]">
          <button
            onClick={handleConnectReal}
            disabled={connecting}
            className="btn-primary text-sm flex items-center gap-2 px-4 py-2"
          >
            {connecting ? (
              <>
                <RefreshCw size={14} className="animate-spin" />
                Opening Setu Gateway...
              </>
            ) : (
              <>
                <Lock size={14} />
                {isConnected ? 'Re-authorize DigiLocker' : 'Connect Real DigiLocker'}
              </>
            )}
          </button>

          <button
            onClick={handleSync}
            disabled={syncing || !isConnected}
            className="btn-secondary text-sm flex items-center gap-2 px-4 py-2 disabled:opacity-50"
          >
            <RefreshCw size={14} className={syncing ? 'animate-spin' : ''} />
            {syncing ? 'Syncing Documents...' : 'Refresh Documents'}
          </button>
        </div>
      </motion.div>

      {/* Synced Documents Section */}
      <div className="card mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-heading-sm">Synced Certificates & Documents</h2>
            <p className="text-xs text-[#6b7280]">
              Official documents fetched with citizen consent and cryptographic verification
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full">
            {documents.length} Available
          </span>
        </div>

        {documents.length === 0 ? (
          <div className="text-center py-8 border border-dashed border-gray-200 rounded-xl">
            <FileCheck className="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700">No documents synced yet</p>
            <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
              Click &quot;Connect Real DigiLocker&quot; above to authenticate and pull your verified documents.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="p-3.5 rounded-xl border border-gray-100 bg-[#f9fafb] flex items-start justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-bold text-gray-900">{doc.name}</p>
                    {doc.verified && (
                      <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-emerald-100 text-emerald-700 rounded">
                        VERIFIED
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    {doc.issuingAuthority || 'Government of India'}
                  </p>
                  {doc.extractedData?.fullName && (
                    <p className="text-[11px] text-gray-600 font-medium mt-1">
                      Name: {doc.extractedData.fullName}
                    </p>
                  )}
                  {doc.extractedData?.aadhaarNumber && (
                    <p className="text-[11px] text-gray-600">
                      Aadhaar: {doc.extractedData.aadhaarNumber}
                    </p>
                  )}
                  {doc.extractedData?.dlNumber && (
                    <p className="text-[11px] text-gray-600">
                      DL: {doc.extractedData.dlNumber}
                    </p>
                  )}
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Compliance & Security Details */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card space-y-4"
      >
        <h2 className="text-heading-sm">Citizen Data Protection & Compliance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              icon: '🛡️',
              title: 'Official Setu Gateway',
              desc: 'Authenticated through Setu Data Gateway under MeitY DigiLocker specifications and standards.',
            },
            {
              icon: '🔒',
              title: 'Explicit Consent Only',
              desc: 'FormShield never accesses or stores your DigiLocker PIN. Access is strictly one-time for form completion.',
            },
            {
              icon: '⚡',
              title: 'Real-time Identity Verification',
              desc: 'Verified Aadhaar KYC and demographic data ensure 100% rejection-proof official submissions.',
            },
            {
              icon: '📜',
              title: 'Legal Admissibility',
              desc: 'Issued certificates carry legal equality with physical originals under Rule 9A of the IT Rules 2016.',
            },
          ].map((item) => (
            <div key={item.title} className="p-3.5 rounded-xl bg-[#f9fafb] border border-[#f3f4f6]">
              <span className="text-2xl">{item.icon}</span>
              <p className="text-sm font-semibold text-[#1f2937] mt-1">{item.title}</p>
              <p className="text-xs text-[#6b7280] mt-0.5 leading-normal">{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function DigiLockerPage() {
  return (
    <Suspense fallback={<div className="p-6 max-w-4xl mx-auto text-sm text-[#6b7280]">Loading DigiLocker integration...</div>}>
      <DigiLockerContent />
    </Suspense>
  );
}
