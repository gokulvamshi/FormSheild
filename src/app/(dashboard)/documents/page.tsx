'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Shield, CheckCircle2, ExternalLink, Eye, Download } from 'lucide-react';
import { DOCUMENT_TYPE_MAP } from '@/constants/documentTypes';
import { formatDate } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';
import type { Document } from '@/types/document';

export default function DocumentsPage() {
  const { t } = useLanguage();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [user, setUser] = useState<{ mockMode: boolean; digilockerConnected: boolean } | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  const fetchDocuments = () => {
    setLoading(true);
    fetch('/api/digilocker/documents')
      .then((res) => res.json())
      .then((data) => { if (Array.isArray(data)) setDocuments(data); })
      .finally(() => setLoading(false));
  };

  const fetchUser = () => {
    fetch('/api/user/profile')
      .then((res) => res.json())
      .then(setUser)
      .catch(() => {});
  };

  const syncDocuments = async () => {
    setSyncing(true);
    await fetch('/api/digilocker/sync', { method: 'POST' });
    await fetchDocuments();
    await fetchUser();
    setSyncing(false);
  };

  useEffect(() => {
    fetchDocuments();
    fetchUser();
  }, []);

  const isConnected = !!user?.digilockerConnected;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-label mb-1">{t('sidebar.documents', 'DIGILOCKER DOCUMENTS')}</p>
          <h1 className="text-heading-xl">{t('sidebar.documents', 'My Documents')}</h1>
          <p className="text-sm text-[#6b7280] mt-1">
            {documents.length} {t('sidebar.documents', 'documents')}
          </p>
        </div>
        <button onClick={syncDocuments} disabled={syncing} className="btn-secondary">
          <RefreshCw size={15} className={syncing ? 'animate-spin' : ''} />
          {syncing ? t('common.loading', 'Syncing...') : t('documents.sync', 'Sync with DigiLocker')}
        </button>
      </div>

      {/* DigiLocker Status Banner */}
      <div className={`card mb-5 flex items-center justify-between gap-3 border ${
        isConnected
          ? 'bg-gradient-to-r from-[#f0fdf4] to-[#ecfdf5] border-[#86efac]'
          : 'bg-gradient-to-r from-[#eff6ff] to-[#f8fafc] border-[#bfdbfe]'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
            isConnected ? 'bg-[#16a34a]' : 'bg-[#1a73e8]'
          }`}>
            <Shield size={18} className="text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-[#1f2937] text-sm">
                {isConnected ? t('sidebar.digilockerConnected', 'DigiLocker Connected') : t('sidebar.digilockerNotConnected', 'DigiLocker Not Connected')}
              </p>
              {isConnected && (
                <span className="px-2 py-0.5 text-[10px] bg-[#dcfce7] text-[#15803d] font-bold rounded-full">
                  {t('common.verified', 'VERIFIED')}
                </span>
              )}
            </div>
            <p className="text-xs text-[#6b7280]">
              {isConnected
                ? 'Authentic citizen documents fetched and verified in real-time.'
                : 'Connect your DigiLocker via Setu to fetch Aadhaar, Driving License, RC, and PAN.'}
            </p>
          </div>
        </div>
        {!isConnected && (
          <a href="/digilocker" className="btn-primary text-xs py-2 px-3 whitespace-nowrap">
            {t('sidebar.digilocker', 'Connect DigiLocker')} &rarr;
          </a>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="card space-y-3">
              <div className="skeleton h-10 w-10 rounded-xl" />
              <div className="skeleton h-5 w-3/4 rounded" />
              <div className="skeleton h-3 w-1/2 rounded" />
              <div className="skeleton h-3 w-2/3 rounded" />
            </div>
          ))}
        </div>
      ) : documents.length === 0 ? (
        <div className="card py-16 text-center">
          <Shield size={40} className="text-[#9ca3af] mx-auto mb-4" />
          <h3 className="text-heading-sm mb-2">{t('documents.empty', 'No Documents Found')}</h3>
          <p className="text-[#6b7280] text-sm mb-4">
            Connect your DigiLocker to fetch your verified documents.
          </p>
          <button onClick={syncDocuments} className="btn-primary">
            <RefreshCw size={15} />
            {t('documents.sync', 'Sync DigiLocker Documents')}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents.map((doc, i) => {
            const info = DOCUMENT_TYPE_MAP[doc.type as keyof typeof DOCUMENT_TYPE_MAP];
            const extractedData = typeof doc.extractedData === 'string'
              ? JSON.parse(doc.extractedData)
              : doc.extractedData;

            return (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.06 }}
                className="card card-hover"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="text-3xl">{info?.icon || '📄'}</div>
                  {doc.verified && (
                    <span className="flex items-center gap-1 text-xs font-medium text-[#16a34a] bg-[#f0fdf4] px-2 py-0.5 rounded-full">
                      <CheckCircle2 size={11} />
                      {t('common.verified', 'Verified')}
                    </span>
                  )}
                </div>

                <h3 className="font-semibold text-[14px] text-[#1f2937] mb-1 leading-snug">{doc.name}</h3>
                <p className="text-xs text-[#9ca3af] mb-3">{doc.issuingAuthority || info?.issuingAuthority}</p>

                {doc.issueDate && (
                  <p className="text-xs text-[#6b7280] mb-1">
                    <span className="font-medium">Issued:</span> {formatDate(doc.issueDate)}
                  </p>
                )}

                {extractedData && extractedData.fullName && (
                  <p className="text-xs text-[#6b7280] mb-1 truncate">
                    <span className="font-medium">Name:</span> {extractedData.fullName}
                  </p>
                )}

                {extractedData && extractedData.dob && (
                  <p className="text-xs text-[#6b7280] mb-3">
                    <span className="font-medium">DOB:</span> {extractedData.dob}
                  </p>
                )}

                <div className="flex gap-2 pt-2 border-t border-[#f3f4f6]">
                  <button className="btn-ghost text-xs py-1.5 px-3 flex-1 justify-center">
                    <Eye size={12} />
                    {t('common.view', 'View')}
                  </button>
                  <button className="btn-ghost text-xs py-1.5 px-3 flex-1 justify-center">
                    <Download size={12} />
                    {t('common.download', 'Download')}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
