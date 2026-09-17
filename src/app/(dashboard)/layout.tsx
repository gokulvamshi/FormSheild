'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import TopBar from '@/components/layout/TopBar';
import { useUserStore } from '@/store/useUserStore';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, setUser } = useUserStore();

  useEffect(() => {
    // Fetch user profile on mount
    fetch('/api/user/profile')
      .then((res) => {
        if (res.status === 401) {
          router.push('/login');
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data && !data.error) {
          setUser(data);
        }
      })
      .catch(() => {
        router.push('/login');
      });
  }, [router, setUser]);

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <Sidebar />
      <main className="flex-1 ml-60 flex flex-col overflow-hidden">
        <TopBar />
        <div className="flex-1 overflow-y-auto bg-[#fafafa]">
          {children}
        </div>
      </main>
    </div>
  );
}
