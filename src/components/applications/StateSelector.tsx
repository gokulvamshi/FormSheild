'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, ArrowRight, Lock } from 'lucide-react';
import { ALL_STATES, SUPPORTED_STATES, STATE_EMOJI } from '@/constants/states';
import { cn } from '@/lib/utils';

interface StateSelectorProps {
  selected: string | null;
  onSelect: (state: string) => void;
}

export default function StateSelector({ selected, onSelect }: StateSelectorProps) {
  const [search, setSearch] = useState('');

  const filtered = ALL_STATES.filter((s) =>
    s.displayName.toLowerCase().includes(search.toLowerCase())
  );

  const supported = filtered.filter((s) => s.supported);
  const unsupported = filtered.filter((s) => !s.supported);

  return (
    <div>
      <div className="mb-6">
        <div className="text-label mb-1.5">STEP 1 OF 7</div>
        <h2 className="text-heading-lg mb-1">Select Your State</h2>
        <p className="text-[#6b7280] text-sm">
          Choose the state where you want to submit your application. We currently support{' '}
          <strong className="text-[#1a73e8]">{SUPPORTED_STATES.length} states</strong> with more
          coming soon.
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" />
        <input
          type="text"
          placeholder="Search for your state..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-input pl-9"
        />
      </div>

      {/* Supported States */}
      {supported.length > 0 && (
        <>
          <h3 className="text-label mb-3 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#16a34a]" />
            FULLY SUPPORTED STATES ({supported.length})
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
            {supported.map((state, i) => (
              <motion.button
                key={state.code}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => onSelect(state.code)}
                className={cn(
                  'card card-hover text-left p-4 cursor-pointer border-2 transition-all',
                  selected === state.code
                    ? 'border-[#1a73e8] bg-[#e8f0fe]'
                    : 'border-[#e5e7eb] hover:border-[#1a73e8]'
                )}
              >
                <div className="text-2xl mb-2">
                  {STATE_EMOJI[state.code] || '🏛️'}
                </div>
                <p className="text-sm font-semibold text-[#1f2937] leading-tight">
                  {state.displayName}
                </p>
                <div className="flex items-center gap-1 mt-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#16a34a]" />
                  <span className="text-[10px] text-[#16a34a] font-medium">Supported</span>
                  {selected === state.code && (
                    <ArrowRight size={11} className="ml-auto text-[#1a73e8]" />
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </>
      )}

      {/* Unsupported States */}
      {unsupported.length > 0 && !search && (
        <>
          <h3 className="text-label mb-3 flex items-center gap-1.5">
            <Lock size={11} />
            COMING SOON — {unsupported.length} MORE STATES
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {unsupported.map((state) => (
              <div
                key={state.code}
                className="px-3 py-2.5 rounded-lg border border-[#e5e7eb] bg-[#f9fafb] opacity-60"
              >
                <div className="flex items-center gap-2">
                  <MapPin size={13} className="text-[#9ca3af]" />
                  <span className="text-sm text-[#6b7280]">{state.displayName}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-[#9ca3af] mt-3 text-center">
            Want your state supported sooner?{' '}
            <a href="mailto:support@formshield.in" className="text-[#1a73e8] hover:underline">
              Request it here
            </a>
          </p>
        </>
      )}

      {filtered.length === 0 && (
        <p className="text-center text-[#9ca3af] py-8">
          No states found for &quot;{search}&quot;
        </p>
      )}
    </div>
  );
}
