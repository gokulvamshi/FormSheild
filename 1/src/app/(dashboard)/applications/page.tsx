'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Plus, Filter, Search, FileText } from 'lucide-react';
import { STATUS_LABELS, STATUS_COLORS, STATE_LABELS, CATEGORY_LABELS, formatDateTime } from '@/lib/utils';

interface Application {
  id: string;
  state: string;
  category: string;
  applicationType: string;
  status: string;
  currentStep: number;
  createdAt: string;
  updatedAt: string;
}

const APP_TYPE_LABELS: Record<string, string> = {
  DL_LEARNERS_PERMIT: "DL — Learner's Permit",
  DL_PERMANENT: 'DL — Permanent',
  DL_RENEWAL: 'DL — Renewal',
  RC_NEW_VEHICLE: 'RC — New Vehicle',
  INCOME_CERTIFICATE: 'Income Certificate',
  CASTE_CERTIFICATE: 'Caste Certificate',
  DOMICILE_CERTIFICATE: 'Domicile Certificate',
  CHARACTER_CERTIFICATE: 'Character Certificate',
  EDUCATION_LOAN: 'Education Loan',
  PM_MUDRA_LOAN: 'PM Mudra Loan',
  PM_AWAS_YOJANA: 'PM Awas Yojana',
  POST_MATRIC_SCHOLARSHIP: 'Post-Matric Scholarship',
  CENTRAL_SECTOR_SCHOLARSHIP: 'Central Sector Scholarship',
  COLLEGE_ADMISSION: 'College Admission',
};

const STEP_LABELS = ['', 'Select State', 'Select Category', 'Select Type', 'Questions', 'Documents', 'Preview', 'Download'];

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/applications')
      .then((res) => res.json())
      .then((data) => { if (Array.isArray(data)) setApplications(data); })
      .finally(() => setLoading(false));
  }, []);

  const STATUS_FILTERS = ['ALL', 'DRAFT', 'IN_PROGRESS', 'DOCUMENTS_PENDING', 'READY', 'DOWNLOADED', 'SUBMITTED'];

  const filtered = applications.filter((app) => {
    if (filter !== 'ALL' && app.status !== filter) return false;
    if (search && !APP_TYPE_LABELS[app.applicationType]?.toLowerCase().includes(search.toLowerCase()) &&
        !STATE_LABELS[app.state]?.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-label mb-1">MY APPLICATIONS</p>
          <h1 className="text-heading-xl">Applications</h1>
        </div>
        <Link href="/applications/new" className="btn-primary">
          <Plus size={15} />
          New Application
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-4 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" />
          <input
            type="text"
            placeholder="Search applications..."
            className="form-input pl-8 py-2 text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {STATUS_FILTERS.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                filter === s
                  ? 'bg-[#1a73e8] text-white'
                  : 'bg-[#f3f4f6] text-[#6b7280] hover:bg-[#e5e7eb]'
              }`}
            >
              {s === 'ALL' ? 'All' : STATUS_LABELS[s] || s}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card">
              <div className="space-y-2">
                <div className="skeleton h-5 w-3/4 rounded" />
                <div className="skeleton h-3 w-1/2 rounded" />
                <div className="skeleton h-2 w-full rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="card py-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#e8f0fe] flex items-center justify-center mx-auto mb-4">
            <FileText size={28} className="text-[#1a73e8]" />
          </div>
          <h3 className="text-heading-sm mb-2">
            {applications.length === 0 ? 'No applications yet' : 'No matching applications'}
          </h3>
          <p className="text-[#6b7280] text-sm mb-5">
            {applications.length === 0
              ? 'Create your first application to get started.'
              : 'Try changing your search or filter criteria.'}
          </p>
          {applications.length === 0 && (
            <Link href="/applications/new" className="btn-primary">
              <Plus size={15} />
              Create First Application
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((app, i) => {
            const colors = STATUS_COLORS[app.status] || STATUS_COLORS.DRAFT;
            const progress = Math.round((app.currentStep / 7) * 100);

            return (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href={`/applications/${app.id}`}>
                  <div className="card card-hover cursor-pointer">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h3 className="font-semibold text-[15px] text-[#1f2937]">
                          {APP_TYPE_LABELS[app.applicationType] || app.applicationType}
                        </h3>
                        <p className="text-sm text-[#6b7280] mt-0.5">
                          {STATE_LABELS[app.state]} · {CATEGORY_LABELS[app.category]}
                        </p>
                      </div>
                      <span className={`badge ${colors.bg} ${colors.text} flex-shrink-0`}>
                        <span className={`badge-dot ${colors.dot}`} />
                        {STATUS_LABELS[app.status]}
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="mb-2">
                      <div className="flex justify-between text-xs text-[#9ca3af] mb-1">
                        <span>{STEP_LABELS[app.currentStep] || `Step ${app.currentStep}`}</span>
                        <span>{app.currentStep}/7 steps</span>
                      </div>
                      <div className="h-1.5 bg-[#f3f4f6] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#1a73e8] rounded-full transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>

                    <p className="text-xs text-[#9ca3af]">Last updated: {formatDateTime(app.updatedAt)}</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
