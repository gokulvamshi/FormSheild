'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  Shield,
  Activity,
  Settings,
  LogOut,
  Plus,
  ChevronRight,
} from 'lucide-react';
import { cn, getInitials } from '@/lib/utils';
import { useUserStore } from '@/store/useUserStore';
import { useAuth } from '@/context/AuthContext';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/applications', label: 'My Applications', icon: FileText },
  { href: '/documents', label: 'Documents', icon: FolderOpen },
  { href: '/digilocker', label: 'DigiLocker', icon: Shield },
  { href: '/activity', label: 'Activity', icon: Activity },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUserStore();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    router.push('/login');
  };

  return (
    <aside className="w-60 h-screen bg-[#f8f9fa] border-r border-[#e5e7eb] flex flex-col fixed left-0 top-0 z-40 sidebar-desktop">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-[#e5e7eb]">
        <Link href="/dashboard" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1a73e8] to-[#0d9488] flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L4 6v6c0 5.25 3.25 10.17 8 11.25C16.75 22.17 20 17.25 20 12V6L12 2z"
                fill="white"
                fillOpacity="0.9"
              />
              <path
                d="M9 12l2 2 4-4"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <span className="font-bold text-[15px] text-[#1f2937]">Form</span>
            <span className="font-bold text-[15px] text-[#1a73e8]">Shield</span>
          </div>
        </Link>
        <p className="text-[10px] text-[#9ca3af] mt-0.5 ml-10 font-medium tracking-wide uppercase">
          Pre-Submission Intelligence
        </p>
      </div>

      {/* New Application CTA */}
      <div className="px-4 pt-4 pb-2">
        <Link
          href="/applications/new"
          className="btn-primary w-full justify-center text-sm py-2.5 rounded-lg"
        >
          <Plus size={15} />
          New Application
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + '/');
          return (
            <Link
              key={href}
              href={href}
              className={cn('sidebar-nav-item', isActive && 'active')}
            >
              <Icon size={17} strokeWidth={isActive ? 2.2 : 1.8} />
              <span className="flex-1">{label}</span>
              {isActive && <ChevronRight size={13} className="opacity-50" />}
            </Link>
          );
        })}
      </nav>

      {/* DigiLocker Status */}
      {user && (
        <div className="px-4 py-3 border-t border-[#e5e7eb]">
          <div className={cn(
            'flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium',
            user.digilockerConnected
              ? 'bg-[#f0fdf4] text-[#16a34a]'
              : 'bg-[#fef2f2] text-[#dc2626]'
          )}>
            <div className={cn(
              'w-2 h-2 rounded-full',
              user.digilockerConnected ? 'bg-[#16a34a]' : 'bg-[#dc2626]'
            )} />
            <span>
              {user.digilockerConnected
                ? 'DigiLocker Connected'
                : 'DigiLocker Not Connected'}
            </span>
          </div>
        </div>
      )}

      {/* User Profile Card */}
      {user && (
        <div className="px-4 py-4 border-t border-[#e5e7eb]">
          <div className="flex items-center gap-3 mb-3">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name || 'User'}
                className="w-9 h-9 rounded-full object-cover flex-shrink-0"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1a73e8] to-[#0d9488] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {getInitials(user.name || user.email || '')}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#1f2937] truncate">
                {user.name || 'Citizen User'}
              </p>
              <p className="text-xs text-[#9ca3af] truncate">
                {user.email || user.phone || 'Signed in'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/settings"
              className="text-xs text-[#6b7280] hover:text-[#1a73e8] transition-colors font-medium"
            >
              Privacy & Security
            </Link>
            <span className="text-[#e5e7eb]">·</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-xs text-[#6b7280] hover:text-[#dc2626] transition-colors font-medium"
            >
              <LogOut size={11} />
              Sign out
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
