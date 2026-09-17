'use client';

import Link from 'next/link';
import { Plus, HelpCircle, Bell } from 'lucide-react';

interface TopBarProps {
  title?: string;
}

export default function TopBar({ title }: TopBarProps) {
  return (
    <header className="h-14 bg-white border-b border-[#e5e7eb] flex items-center justify-between px-6 sticky top-0 z-30">
      {title && (
        <h1 className="text-[15px] font-semibold text-[#1f2937]">{title}</h1>
      )}
      {!title && <div />}

      <div className="flex items-center gap-3">
        <a
          href="mailto:support@formshield.in"
          className="flex items-center gap-1.5 text-sm text-[#6b7280] hover:text-[#1a73e8] transition-colors font-medium"
        >
          <HelpCircle size={15} />
          Need help?
        </a>

        <button className="relative w-9 h-9 rounded-full hover:bg-[#f3f4f6] flex items-center justify-center transition-colors text-[#6b7280]">
          <Bell size={17} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#1a73e8] rounded-full" />
        </button>

        <Link
          href="/applications/new"
          className="btn-primary text-sm py-2 px-4"
        >
          <Plus size={15} />
          New Application
        </Link>
      </div>
    </header>
  );
}
