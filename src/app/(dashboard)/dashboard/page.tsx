'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Plus, ArrowRight, Lightbulb } from 'lucide-react';
import { useUserStore } from '@/store/useUserStore';
import { useLanguage } from '@/context/LanguageContext';
import { STATUS_COLORS, STATUS_LABELS, CATEGORY_LABELS, STATE_LABELS, formatDateTime } from '@/lib/utils';
import type { DashboardStats } from '@/types/user';

interface RecentApplication {
  id: string;
  state: string;
  category: string;
  applicationType: string;
  status: string;
  currentStep: number;
  updatedAt: string;
}

const DEFAULT_TIPS = [
  'Your documents are fetched directly from DigiLocker — they are digitally verified and accepted by all government portals.',
  'Always double-check auto-filled fields before submitting. While we extract data accurately, you can edit any field.',
  'Save your application progress at any step. You can come back and continue later.',
  'Documents in DigiLocker never expire — they are always accessible when you need them.',
  'Income certificates must be recent (usually within 1 year) for scholarship applications. Check the dates!',
];

const APPLICATION_TYPE_LABELS: Record<string, string> = {
  DL_LEARNERS_PERMIT: "DL — Learner's Permit",
  DL_PERMANENT: 'DL — Permanent',
  DL_RENEWAL: 'DL — Renewal',
  RC_NEW_VEHICLE: 'RC — New Vehicle',
  RC_TRANSFER_OWNERSHIP: 'RC — Ownership Transfer',
  INCOME_CERTIFICATE: 'Income Certificate',
  CASTE_CERTIFICATE: 'Caste Certificate',
  DOMICILE_CERTIFICATE: 'Domicile Certificate',
  BIRTH_CERTIFICATE: 'Birth Certificate',
  CHARACTER_CERTIFICATE: 'Character Certificate',
  EDUCATION_LOAN: 'Education Loan',
  PERSONAL_LOAN: 'Personal Loan',
  PM_MUDRA_LOAN: 'PM Mudra Loan',
  PM_AWAS_YOJANA: 'PM Awas Yojana',
  POST_MATRIC_SCHOLARSHIP: 'Post-Matric Scholarship',
  CENTRAL_SECTOR_SCHOLARSHIP: 'Central Sector Scholarship',
  COLLEGE_ADMISSION: 'College Admission',
};

export default function DashboardPage() {
  const { user } = useUserStore();
  const { t, tObj } = useLanguage();
  const [stats, setStats] = useState<DashboardStats>({
    activeApplications: 0,
    readyToSubmit: 0,
    needsAttention: 0,
    documentsConnected: 0,
  });
  const [recentApplications, setRecentApplications] = useState<RecentApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [tipIndex] = useState(() => Math.floor(Math.random() * DEFAULT_TIPS.length));

  useEffect(() => {
    fetch('/api/user/dashboard')
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setStats(data.stats);
          setRecentApplications(data.recentApplications);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const hour = new Date().getHours();
  const greeting =
    hour < 12
      ? t('dashboard.greeting.morning', 'Good morning')
      : hour < 17
      ? t('dashboard.greeting.afternoon', 'Good afternoon')
      : t('dashboard.greeting.evening', 'Good evening');

  const firstName = user?.name?.split(' ')[0] || '';

  const translatedTips = tObj<string[]>('dashboard.tips') || DEFAULT_TIPS;
  const currentTip = translatedTips[tipIndex % translatedTips.length] || DEFAULT_TIPS[tipIndex];

  const STAT_CARDS = [
    {
      label: t('dashboard.stats.activeApplications', 'Active Applications'),
      value: stats.activeApplications,
      sub: t('dashboard.stats.inProgress', 'In progress'),
      color: 'text-[#3b82f6]',
      bg: 'bg-[#eff6ff]',
      border: 'border-[#bfdbfe]',
    },
    {
      label: t('dashboard.stats.readyToSubmit', 'Ready to Submit'),
      value: stats.readyToSubmit,
      sub: t('dashboard.stats.allChecksComplete', 'All checks complete'),
      color: 'text-[#16a34a]',
      bg: 'bg-[#f0fdf4]',
      border: 'border-[#bbf7d0]',
    },
    {
      label: t('dashboard.stats.needsAttention', 'Needs Attention'),
      value: stats.needsAttention,
      sub: t('dashboard.stats.reviewRequired', 'Review required'),
      color: 'text-[#d97706]',
      bg: 'bg-[#fffbeb]',
      border: 'border-[#fde68a]',
    },
    {
      label: t('dashboard.stats.documentsConnected', 'Documents Connected'),
      value: stats.documentsConnected,
      sub: `${stats.documentsConnected} ${t('dashboard.stats.verified', 'verified')}`,
      color: 'text-[#0d9488]',
      bg: 'bg-[#f0fdfa]',
      border: 'border-[#99f6e4]',
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Greeting */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <div className="text-label mb-1.5">{t('dashboard.tagline', 'FORMSHIELD DASHBOARD')}</div>
        <h1 className="text-heading-xl mb-1">
          {greeting}{firstName ? `, ${firstName}` : ''}! 👋
        </h1>
        <p className="text-[#6b7280] text-[15px]">
          {t('dashboard.subtitle', "Let's make sure your next application is ready before you submit it.")}
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {STAT_CARDS.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className={`card border ${card.border} bg-white hover:shadow-md transition-shadow`}
          >
            {loading ? (
              <div className="space-y-2">
                <div className="skeleton h-8 w-12 rounded" />
                <div className="skeleton h-3 w-24 rounded" />
                <div className="skeleton h-3 w-16 rounded" />
              </div>
            ) : (
              <>
                <p className={`text-3xl font-bold mb-1 ${card.color}`}>{card.value}</p>
                <p className="text-[13px] font-semibold text-[#1f2937] mb-0.5 truncate">{card.label}</p>
                <p className={`text-xs font-medium ${card.color} truncate`}>{card.sub}</p>
              </>
            )}
          </motion.div>
        ))}
      </div>

      {/* Recent Applications */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="card mb-4"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-heading-md">{t('dashboard.recentApplications', 'Recent Applications')}</h2>
          <Link href="/applications" className="text-sm text-[#1a73e8] font-medium hover:underline flex items-center gap-1">
            {t('dashboard.viewAll', 'View all')} <ArrowRight size={14} />
          </Link>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 py-3 border-b border-[#f3f4f6]">
                <div className="skeleton h-4 w-48 rounded" />
                <div className="skeleton h-4 w-24 rounded" />
                <div className="skeleton h-6 w-20 rounded-full" />
                <div className="skeleton h-4 w-28 rounded" />
              </div>
            ))}
          </div>
        ) : recentApplications.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-2xl bg-[#e8f0fe] flex items-center justify-center mx-auto mb-4">
              <Plus size={28} className="text-[#1a73e8]" />
            </div>
            <h3 className="text-heading-sm mb-2">{t('dashboard.empty.title', 'No applications yet')}</h3>
            <p className="text-[#6b7280] text-sm mb-4">
              {t('dashboard.empty.desc', 'Start your first application to get rejection-proof results.')}
            </p>
            <Link href="/applications/new" className="btn-primary">
              <Plus size={15} />
              {t('dashboard.empty.button', 'Create First Application')}
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#f3f4f6]">
                  <th className="text-left text-label py-2 pr-4 w-[40%]">
                    {t('dashboard.table.application', 'APPLICATION')}
                  </th>
                  <th className="text-left text-label py-2 pr-4 w-[20%]">
                    {t('dashboard.table.type', 'TYPE')}
                  </th>
                  <th className="text-left text-label py-2 pr-4 w-[20%]">
                    {t('dashboard.table.status', 'STATUS')}
                  </th>
                  <th className="text-left text-label py-2 w-[20%]">
                    {t('dashboard.table.lastChecked', 'LAST CHECKED')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentApplications.map((app, i) => {
                  const colors = STATUS_COLORS[app.status] || STATUS_COLORS.DRAFT;
                  const localizedStatus = t(`statuses.${app.status}`, STATUS_LABELS[app.status] || app.status);
                  const localizedAppType = t(`applicationTypes.${app.applicationType}`, APPLICATION_TYPE_LABELS[app.applicationType] || app.applicationType);
                  const localizedCategory = t(`categories.${app.category}`, CATEGORY_LABELS[app.category] || app.category);

                  return (
                    <motion.tr
                      key={app.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.35 + i * 0.06 }}
                      className="border-b border-[#f9fafb] hover:bg-[#fafafa] cursor-pointer group"
                      onClick={() => window.location.href = `/applications/${app.id}`}
                    >
                      <td className="py-3 pr-4">
                        <div className="font-semibold text-sm text-[#1f2937] group-hover:text-[#1a73e8] transition-colors">
                          {localizedAppType}
                        </div>
                        <div className="text-xs text-[#9ca3af] mt-0.5">
                          {STATE_LABELS[app.state] || app.state}
                        </div>
                      </td>
                      <td className="py-3 pr-4">
                        <span className="text-xs text-[#6b7280]">
                          {localizedCategory}
                        </span>
                      </td>
                      <td className="py-3 pr-4">
                        <span className={`badge ${colors.bg} ${colors.text}`}>
                          <span className={`badge-dot ${colors.dot}`} />
                          {localizedStatus}
                        </span>
                      </td>
                      <td className="py-3">
                        <span className="text-xs text-[#9ca3af]">
                          {formatDateTime(app.updatedAt)}
                        </span>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Tip Banner */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="tip-banner"
      >
        <div className="flex items-start gap-3">
          <Lightbulb size={18} className="text-[#f59e0b] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-[#92400e] mb-0.5">
              💡 {t('dashboard.tipOfTheDay', 'Tip of the day')}
            </p>
            <p className="text-sm text-[#78350f]">{currentTip}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
