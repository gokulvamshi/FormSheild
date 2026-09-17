'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, ChevronRight } from 'lucide-react';
import { CATEGORY_APPLICATIONS } from '@/constants/categories';
import { CATEGORY_LABELS, STATE_LABELS } from '@/lib/utils';

interface ApplicationTypeSelectorProps {
  state: string;
  category: string;
  selected: string | null;
  onSelect: (type: string, templateId: string) => void;
  onBack: () => void;
}

interface TemplateInfo {
  id: string;
  applicationType: string;
  displayName: string;
  description: string;
  fees: string;
  processingTime: string;
}

export default function ApplicationTypeSelector({
  state, category, selected, onSelect, onBack,
}: ApplicationTypeSelectorProps) {
  const [templates, setTemplates] = useState<TemplateInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/templates?state=${state}&category=${category}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setTemplates(data);
      })
      .finally(() => setLoading(false));
  }, [state, category]);

  const localApps = CATEGORY_APPLICATIONS[category] || [];

  return (
    <div>
      <button onClick={onBack} className="btn-ghost mb-4 -ml-2 text-sm">
        <ArrowLeft size={15} />
        Back
      </button>

      <div className="mb-6">
        <div className="text-label mb-1.5">STEP 3 OF 7</div>
        <h2 className="text-heading-lg mb-1">Select Application Type</h2>
        <p className="text-[#6b7280] text-sm">
          <strong className="text-[#1f2937]">{CATEGORY_LABELS[category]}</strong> in{' '}
          <strong className="text-[#1f2937]">{STATE_LABELS[state]}</strong>
        </p>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="card p-5">
              <div className="space-y-2">
                <div className="skeleton h-5 w-3/4 rounded" />
                <div className="skeleton h-3 w-full rounded" />
                <div className="skeleton h-3 w-1/2 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {templates.map((t, i) => {
            const localInfo = localApps.find((a) => a.code === t.applicationType);
            return (
              <motion.button
                key={t.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => onSelect(t.applicationType, t.id)}
                className={`w-full card card-hover text-left p-5 border-2 transition-all ${
                  selected === t.applicationType
                    ? 'border-[#1a73e8] bg-[#e8f0fe]'
                    : 'border-[#e5e7eb] hover:border-[#1a73e8]'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-[15px] text-[#1f2937] mb-1.5">
                      {t.displayName}
                    </h3>
                    <p className="text-xs text-[#6b7280] leading-relaxed mb-2.5">
                      {localInfo?.description || t.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-[#9ca3af]">
                      <span className="flex items-center gap-1">
                        <Clock size={11} />
                        {t.processingTime}
                      </span>
                      <span className="font-medium text-[#1a73e8]">{t.fees}</span>
                    </div>
                  </div>
                  <ChevronRight
                    size={18}
                    className={selected === t.applicationType ? 'text-[#1a73e8]' : 'text-[#d1d5db]'}
                  />
                </div>
              </motion.button>
            );
          })}

          {templates.length === 0 && (
            <div className="card text-center py-10">
              <p className="text-[#9ca3af] mb-2">No applications available for this category in {STATE_LABELS[state]}.</p>
              <p className="text-sm text-[#9ca3af]">We&apos;re working on adding more. Check back soon!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
