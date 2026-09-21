'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Shield,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Lock,
  FileCheck,
  Zap,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/common/Toast';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSelector from '@/components/common/LanguageSelector';

export default function LoginPage() {
  const router = useRouter();
  const { loginWithGoogle, user, isConfigured, loading: authLoading } = useAuth();
  const { showToast } = useToast();
  const { t } = useLanguage();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Automatically route to dashboard if already authenticated
  useEffect(() => {
    if (!authLoading && user) {
      router.push('/dashboard');
    }
  }, [user, authLoading, router]);

  const handleGoogleSignIn = async () => {
    setError('');

    if (!isConfigured) {
      const msg = 'Firebase credentials are not configured in your .env file.';
      setError(msg);
      showToast(msg, 'error');
      return;
    }

    setLoading(true);

    try {
      const dbUser = await loginWithGoogle();
      const displayName = dbUser.name ? ` ${dbUser.name}` : '';
      showToast(`Welcome${displayName}! Redirecting to dashboard...`, 'success');
      router.push('/dashboard');
    } catch (err: any) {
      console.error('Google Sign-In Error:', err);

      let friendlyMsg = 'Failed to sign in with Google. Please try again.';

      if (err.code === 'auth/popup-closed-by-user') {
        friendlyMsg = 'Sign-in cancelled. The Google popup was closed.';
        showToast(friendlyMsg, 'info');
      } else if (err.code === 'auth/cancelled-popup-request') {
        friendlyMsg = 'Authentication request cancelled.';
        showToast(friendlyMsg, 'info');
      } else if (err.code === 'auth/popup-blocked') {
        friendlyMsg = 'Sign-in popup was blocked by your browser. Please allow popups.';
        showToast(friendlyMsg, 'warning');
      } else if (err.code === 'auth/network-request-failed') {
        friendlyMsg = 'Network error. Please check your internet connection.';
        showToast(friendlyMsg, 'error');
      } else {
        friendlyMsg = err.message || friendlyMsg;
        showToast(friendlyMsg, 'error');
      }

      setError(friendlyMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8fafd] via-white to-[#f0fdf4] flex flex-col justify-center items-center p-4 relative">
      {/* Top Language Selector */}
      <div className="absolute top-4 right-4 sm:right-6">
        <LanguageSelector variant="header" />
      </div>

      {/* Brand Header */}
      <div className="text-center mb-8">
        <Link href="/" className="inline-flex items-center gap-2.5 mb-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#1a73e8] to-[#0d9488] flex items-center justify-center shadow-md shadow-blue-500/20">
            <Shield size={22} className="text-white" />
          </div>
          <span className="font-bold text-2xl tracking-tight text-[#111827]">
            Form<span className="text-[#1a73e8]">Shield</span>
          </span>
        </Link>
        <p className="text-xs font-semibold tracking-wider text-[#6b7280] uppercase">
          {t('login.brandTagline')}
        </p>
      </div>

      {/* Main Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-md bg-white rounded-2xl border border-[#e5e7eb] shadow-xl shadow-slate-200/50 p-8"
      >
        {/* Environment Notice if Firebase keys missing */}
        {!isConfigured && (
          <div className="mb-6 p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold mb-0.5">Firebase Configuration Required</p>
              <p className="text-amber-700 leading-relaxed">
                Add your Firebase web app keys (<code className="font-mono bg-amber-100 px-1 py-0.5 rounded">NEXT_PUBLIC_FIREBASE_*</code>) to <code className="font-mono bg-amber-100 px-1 py-0.5 rounded">.env</code> to activate live Google authentication.
              </p>
            </div>
          </div>
        )}

        {/* Card Header */}
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold text-[#111827]">{t('login.cardTitle')}</h1>
          <p className="text-sm text-[#6b7280] mt-1.5 leading-relaxed">
            {t('login.cardSubtitle')}
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2 text-xs text-[#dc2626]"
          >
            <AlertCircle size={15} className="flex-shrink-0 mt-0.5 text-red-500" />
            <span className="leading-relaxed">{error}</span>
          </motion.div>
        )}

        {/* Google Sign-In Button */}
        <div className="space-y-4">
          <button
            id="google-signin-button"
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-xl border border-[#d1d5db] bg-white hover:bg-slate-50 active:bg-slate-100 text-[#374151] font-semibold text-sm transition-all shadow-sm hover:shadow hover:border-[#9ca3af] disabled:opacity-60 disabled:cursor-not-allowed group cursor-pointer"
          >
            {loading ? (
              <>
                <RefreshCw size={18} className="animate-spin text-[#1a73e8]" />
                <span>{t('login.connecting')}</span>
              </>
            ) : (
              <>
                {/* Official Google G Icon */}
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                  {t('login.continueGoogle')}
                </span>
              </>
            )}
          </button>
        </div>

        {/* Feature Highlights */}
        <div className="mt-8 pt-6 border-t border-[#f3f4f6] space-y-3">
          <div className="flex items-start gap-2.5 text-xs text-[#4b5563]">
            <Zap className="w-4 h-4 text-[#1a73e8] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-[#111827]">{t('login.features.instantSync')}:</span>{' '}
              {t('login.features.instantSyncDesc')}
            </div>
          </div>
          <div className="flex items-start gap-2.5 text-xs text-[#4b5563]">
            <FileCheck className="w-4 h-4 text-[#16a34a] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-[#111827]">{t('login.features.shield')}:</span>{' '}
              {t('login.features.shieldDesc')}
            </div>
          </div>
          <div className="flex items-start gap-2.5 text-xs text-[#4b5563]">
            <Lock className="w-4 h-4 text-[#0d9488] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-[#111827]">{t('login.features.persistence')}:</span>{' '}
              {t('login.features.persistenceDesc')}
            </div>
          </div>
        </div>

        {/* Security & Compliance Badges */}
        <div className="mt-6 pt-5 border-t border-[#f3f4f6] flex items-center justify-center gap-4 text-[11px] text-[#6b7280]">
          <div className="flex items-center gap-1">
            <Lock className="w-3.5 h-3.5 text-[#16a34a]" />
            <span>256-bit SSL</span>
          </div>
          <span className="text-[#d1d5db]">•</span>
          <div className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#1a73e8]" />
            <span>DigiLocker Partner</span>
          </div>
          <span className="text-[#d1d5db]">•</span>
          <div className="flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-[#0d9488]" />
            <span>DPDP Act 2023</span>
          </div>
        </div>
      </motion.div>

      {/* Footer disclaimer */}
      <p className="text-xs text-[#9ca3af] mt-6 text-center max-w-sm leading-relaxed">
        {t('login.disclaimer')}
      </p>
    </div>
  );
}