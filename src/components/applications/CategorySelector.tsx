'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { CATEGORIES } from '@/constants/categories';
import { STATE_LABELS } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface CategorySelectorProps {
  state: string;
  selected: string | null;
  onSelect: (category: string) => void;
  onBack: () => void;
}

const CATEGORY_COLORS: Record<string, { bg: string; border: string; activeBg: string; text: string }> = {
  TRANSPORT_LICENSING: {
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    activeBg: 'bg-blue-50 border-blue-400',
    text: 'text-blue-600',
  },
  LOANS_FINANCE: {
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
    activeBg: 'bg-emerald-50 border-emerald-400',
    text: 'text-emerald-600',
  },
  CERTIFICATES_DOCUMENTS: {
    bg: 'bg-purple-50',
    border: 'border-purple-100',
    activeBg: 'bg-purple-50 border-purple-400',
    text: 'text-purple-600',
  },
  EDUCATION_SCHOLARSHIPS: {
    bg: 'bg-orange-50',
    border: 'border-orange-100',
    activeBg: 'bg-orange-50 border-orange-400',
    text: 'text-orange-600',
  },
};

export default function CategorySelector({ state, selected, onSelect, onBack }: CategorySelectorProps) {
  return (
    <div>
      <button onClick={onBack} className="btn-ghost mb-4 -ml-2 text-sm">
        <ArrowLeft size={15} />
        Back
      </button>

      <div className="mb-6">
        <div className="text-label mb-1.5">STEP 2 OF 7</div>
        <h2 className="text-heading-lg mb-1">Choose Application Category</h2>
        <p className="text-[#6b7280] text-sm">
          Applying in <strong className="text-[#1f2937]">{STATE_LABELS[state] || state}</strong>.
          Select the category that matches your application.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {CATEGORIES.map((cat, i) => {
          const colors = CATEGORY_COLORS[cat.code];
          const isSelected = selected === cat.code;
          return (
            <motion.button
              key={cat.code}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => onSelect(cat.code)}
              className={cn(
                'card card-hover text-left p-5 border-2 cursor-pointer transition-all',
                isSelected
                  ? `border-[#1a73e8] bg-[#e8f0fe]`
                  : `border-[#e5e7eb] hover:border-[#1a73e8]`
              )}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center text-2xl', colors.bg, colors.border, 'border')}>
                  {cat.icon}
                </div>
                <ChevronRight size={18} className={cn('mt-1', isSelected ? 'text-[#1a73e8]' : 'text-[#d1d5db]')} />
              </div>
              <h3 className="font-bold text-[15px] text-[#1f2937] mb-1.5">{cat.displayName}</h3>
              <p className="text-xs text-[#6b7280] leading-relaxed">{cat.description}</p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
