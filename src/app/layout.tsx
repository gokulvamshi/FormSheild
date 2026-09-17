export const runtime = 'edge';
import type { Metadata } from 'next';
import './globals.css';
import { ToastProvider } from '@/components/common/Toast';
import { AuthProvider } from '@/context/AuthContext';

export const metadata: Metadata = {
  title: {
    default: 'FormShield — Pre-Submission Intelligence for Indian Citizens',
    template: '%s | FormShield',
  },
  description:
    'FormShield helps Indian citizens create error-free, rejection-proof government applications by auto-filling forms using DigiLocker-verified documents.',
  keywords: ['government forms', 'DigiLocker', 'India', 'driving license', 'income certificate', 'caste certificate', 'scholarship'],
  openGraph: {
    title: 'FormShield — Pre-Submission Intelligence',
    description: 'Auto-fill government forms using your DigiLocker documents. Zero rejections.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        <ToastProvider>
          <AuthProvider>{children}</AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
