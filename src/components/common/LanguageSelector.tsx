'use client';

import { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { LanguageCode } from '@/lib/i18n';

interface LanguageSelectorProps {
  variant?: 'header' | 'floating' | 'bar';
  className?: string;
}

export default function LanguageSelector({ variant = 'header', className = '' }: LanguageSelectorProps) {
  const { language, setLanguage, languages, currentLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code: LanguageCode) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        id="language-selector-button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
          variant === 'bar'
            ? 'bg-white/15 hover:bg-white/25 text-white border border-white/20'
            : 'bg-white hover:bg-slate-50 text-[#374151] border border-[#e5e7eb] shadow-sm hover:border-[#cbd5e1]'
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        title="Select Language / भाषा चुनें"
      >
        <Globe size={14} className={variant === 'bar' ? 'text-white' : 'text-[#1a73e8]'} />
        <span className="font-bold tracking-tight">{currentLanguage.nativeName}</span>
        <span className={`text-[10px] hidden sm:inline ${variant === 'bar' ? 'text-blue-100' : 'text-[#6b7280]'}`}>
          ({currentLanguage.name})
        </span>
        <ChevronDown
          size={13}
          className={`transition-transform duration-200 ${
            variant === 'bar' ? 'text-white/80' : 'text-[#9ca3af]'
          } ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-[#e5e7eb] z-50 overflow-hidden animate-fadeInUp">
          {/* Header */}
          <div className="px-4 py-2.5 bg-gradient-to-r from-blue-50/70 to-slate-50 border-b border-[#f1f5f9] flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Globe size={13} className="text-[#1a73e8]" />
              <span className="text-xs font-bold text-[#1e293b]">Indian Languages (12)</span>
            </div>
            <span className="text-[10px] font-semibold text-[#1a73e8] bg-blue-100/60 px-1.5 py-0.5 rounded">
              Dynamic
            </span>
          </div>

          {/* Languages List */}
          <div className="max-h-80 overflow-y-auto p-1.5 grid grid-cols-1 sm:grid-cols-2 gap-1">
            {languages.map((item) => {
              const isSelected = item.code === language;
              return (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => handleSelect(item.code)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-all flex items-center justify-between group cursor-pointer ${
                    isSelected
                      ? 'bg-[#eff6ff] text-[#1d4ed8] font-bold border border-[#bfdbfe]'
                      : 'hover:bg-[#f8fafc] text-[#334155]'
                  }`}
                >
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-semibold truncate leading-tight">
                      {item.nativeName}
                    </span>
                    <span className="text-[10px] text-[#64748b] truncate mt-0.5">
                      {item.name}
                    </span>
                  </div>
                  {isSelected && (
                    <Check size={14} className="text-[#1a73e8] flex-shrink-0 ml-1.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Footer note */}
          <div className="px-3.5 py-2 bg-[#f8fafc] border-t border-[#f1f5f9] text-[10px] text-[#64748b] flex items-center justify-between">
            <span>Language saved in browser</span>
            <span className="font-semibold text-[#1a73e8]">All India</span>
          </div>
        </div>
      )}
    </div>
  );
}
