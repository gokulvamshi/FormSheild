'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Shield, FileText, LogIn, Download, RefreshCw, Settings, Plus, CheckCircle2, AlertCircle } from 'lucide-react';
import { formatDateTime } from '@/lib/utils';

interface ActivityItem {
  id: string;
  action: string;
  details: string | null;
  applicationId: string | null;
  createdAt: string;
}

const ACTION_ICONS: Record<string, React.ReactNode> = {
  ACCOUNT_CREATED: <Plus size={14} />,
  USER_LOGIN: <LogIn size={14} />,
  DIGILOCKER_SYNCED: <Shield size={14} />,
  APPLICATION_CREATED: <FileText size={14} />,
  DOCUMENT_CHECK_COMPLETED: <CheckCircle2 size={14} />,
  APPLICATION_GENERATED: <RefreshCw size={14} />,
  APPLICATION_DOWNLOADED: <Download size={14} />,
  SETTINGS_UPDATED: <Settings size={14} />,
};

const ACTION_COLORS: Record<string, string> = {
  ACCOUNT_CREATED: 'bg-[#f0fdf4] text-[#16a34a]',
  USER_LOGIN: 'bg-[#eff6ff] text-[#3b82f6]',
  DIGILOCKER_SYNCED: 'bg-[#f0fdf4] text-[#0d9488]',
  APPLICATION_CREATED: 'bg-[#eff6ff] text-[#1a73e8]',
  DOCUMENT_CHECK_COMPLETED: 'bg-[#f0fdf4] text-[#16a34a]',
  APPLICATION_GENERATED: 'bg-[#fffbeb] text-[#d97706]',
  APPLICATION_DOWNLOADED: 'bg-[#f0fdf4] text-[#16a34a]',
  SETTINGS_UPDATED: 'bg-[#f9fafb] text-[#6b7280]',
};

const ACTION_LABELS: Record<string, string> = {
  ACCOUNT_CREATED: 'Account Created',
  USER_LOGIN: 'Logged In',
  DIGILOCKER_SYNCED: 'DigiLocker Synced',
  APPLICATION_CREATED: 'Application Created',
  DOCUMENT_CHECK_COMPLETED: 'Document Check Completed',
  APPLICATION_GENERATED: 'Application Generated',
  APPLICATION_DOWNLOADED: 'Application Downloaded',
  SETTINGS_UPDATED: 'Settings Updated',
};

export default function ActivityPage() {
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/activity')
      .then((res) => res.json())
      .then((data) => { if (Array.isArray(data)) setActivity(data); })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <p className="text-label mb-1">ACTIVITY LOG</p>
        <h1 className="text-heading-xl">Activity History</h1>
        <p className="text-sm text-[#6b7280] mt-1">
          A complete record of all your FormShield activity.
        </p>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="card flex gap-4 items-start">
              <div className="skeleton w-9 h-9 rounded-full flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="skeleton h-4 w-48 rounded" />
                <div className="skeleton h-3 w-full rounded" />
                <div className="skeleton h-3 w-32 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : activity.length === 0 ? (
        <div className="card py-16 text-center">
          <Clock size={40} className="text-[#9ca3af] mx-auto mb-4" />
          <h3 className="text-heading-sm mb-2">No Activity Yet</h3>
          <p className="text-[#6b7280] text-sm">Your actions will appear here as you use FormShield.</p>
        </div>
      ) : (
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[18px] top-0 bottom-0 w-px bg-[#e5e7eb]" />

          <div className="space-y-3 pl-1">
            {activity.map((item, i) => {
              const colorClass = ACTION_COLORS[item.action] || 'bg-[#f3f4f6] text-[#6b7280]';
              const icon = ACTION_ICONS[item.action] || <AlertCircle size={14} />;
              const label = ACTION_LABELS[item.action] || item.action;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex gap-4 items-start"
                >
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${colorClass}`}>
                    {icon}
                  </div>
                  <div className="card flex-1 py-3 px-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold text-[#1f2937]">{label}</p>
                        {item.details && (
                          <p className="text-xs text-[#6b7280] mt-0.5">{item.details}</p>
                        )}
                      </div>
                      <span className="text-xs text-[#9ca3af] flex-shrink-0 mt-0.5">
                        {formatDateTime(item.createdAt)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
