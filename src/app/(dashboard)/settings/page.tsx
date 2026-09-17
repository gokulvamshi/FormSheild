'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Shield, Globe, Trash2, CheckCircle2 } from 'lucide-react';
import { useUserStore } from '@/store/useUserStore';

const LANGUAGES = [
  { code: 'ENGLISH', label: 'English' },
  { code: 'HINDI', label: 'हिन्दी (Hindi)' },
  { code: 'TELUGU', label: 'తెలుగు (Telugu)' },
  { code: 'TAMIL', label: 'தமிழ் (Tamil)' },
  { code: 'MARATHI', label: 'मराठी (Marathi)' },
  { code: 'KANNADA', label: 'ಕನ್ನಡ (Kannada)' },
  { code: 'MALAYALAM', label: 'മലയാളം (Malayalam)' },
];

export default function SettingsPage() {
  const { user, updateUser } = useUserStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [language, setLanguage] = useState('ENGLISH');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setLanguage(user.language || 'ENGLISH');
    }
  }, [user]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, language }),
      });
      const data = await res.json();
      if (!data.error) {
        updateUser({ name: data.name, email: data.email, language: data.language });
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } finally {
      setSaving(false);
    }
  };

  const SECTIONS = [
    {
      id: 'profile',
      title: 'Profile',
      icon: <User size={18} />,
      content: (
        <div className="space-y-4">
          <div>
            <label className="form-label">Google Account Email</label>
            <input type="email" className="form-input bg-slate-50 text-slate-600" value={user?.email || email || ''} disabled />
            <p className="text-xs text-[#9ca3af] mt-1">Verified via Google Sign-In. It&apos;s your persistent citizen ID.</p>
          </div>
          <div>
            <label className="form-label">Full Name</label>
            <input type="text" className="form-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" />
          </div>
          <div>
            <label className="form-label">Contact Phone Number (Optional)</label>
            <input type="text" className="form-input" value={user?.phone || ''} disabled placeholder="From DigiLocker / Aadhaar KYC" />
            <p className="text-xs text-[#9ca3af] mt-1">Automatically linked during DigiLocker Aadhaar KYC.</p>
          </div>
        </div>
      ),
    },
    {
      id: 'language',
      title: 'Language',
      icon: <Globe size={18} />,
      content: (
        <div>
          <label className="form-label">Preferred Language</label>
          <select className="form-input" value={language} onChange={(e) => setLanguage(e.target.value)}>
            {LANGUAGES.map((l) => (
              <option key={l.code} value={l.code}>{l.label}</option>
            ))}
          </select>
          <p className="text-xs text-[#9ca3af] mt-1">Note: Application forms are only available in English in Version 1. Language support for Hindi and regional languages is coming soon.</p>
        </div>
      ),
    },
    {
      id: 'digilocker',
      title: 'Setu DigiLocker Gateway',
      icon: <Shield size={18} />,
      content: (
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 rounded-lg bg-[#f0fdf4] border border-[#bbf7d0]">
            <div>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-sm text-[#166534]">Production Setu Bridge Active</p>
                <span className="px-2 py-0.5 text-[10px] bg-[#dcfce7] text-[#15803d] font-bold rounded-full">SANDBOX</span>
              </div>
              <p className="text-xs text-[#15803d] mt-1">
                Connected to Setu API Gateway for live Aadhaar KYC, Driving License, RC, and PAN retrieval.
              </p>
            </div>
            <a
              href="/digilocker"
              className="btn-primary text-xs py-2 px-3 whitespace-nowrap"
            >
              Manage Documents &rarr;
            </a>
          </div>
          <div className="p-3 bg-[#f9fafb] border border-[#e5e7eb] rounded-lg text-xs text-[#6b7280]">
            🔒 All document transfers are encrypted using 256-bit SSL and authenticated via official DigiLocker OAuth2 consent flows.
          </div>
        </div>
      ),
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: <Bell size={18} />,
      content: (
        <div className="space-y-3">
          {[
            { label: 'Document expiry reminders', desc: 'Get notified 30 days before your documents expire' },
            { label: 'Application status updates', desc: 'Updates on your application progress' },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between p-3 rounded-lg bg-[#f9fafb] border border-[#e5e7eb]">
              <div>
                <p className="text-sm font-medium text-[#1f2937]">{item.label}</p>
                <p className="text-xs text-[#6b7280]">{item.desc}</p>
              </div>
              <div className="w-10 h-5 rounded-full bg-[#e5e7eb] relative">
                <span className="block w-4 h-4 rounded-full bg-white shadow-sm absolute left-0.5 top-0.5" />
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'security',
      title: 'Security & Data',
      icon: <Trash2 size={18} />,
      content: (
        <div className="space-y-3">
          <div className="p-4 rounded-lg bg-[#fef2f2] border border-[#fca5a5]">
            <p className="font-semibold text-sm text-[#991b1b] mb-1">Delete Account</p>
            <p className="text-xs text-[#7f1d1d] mb-3">This will permanently delete your account and all applications. This action cannot be undone.</p>
            <button className="text-xs text-[#dc2626] font-medium border border-[#dc2626] px-3 py-1.5 rounded-lg hover:bg-[#dc2626] hover:text-white transition-all">
              Delete My Account
            </button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <p className="text-label mb-1">ACCOUNT SETTINGS</p>
        <h1 className="text-heading-xl">Settings</h1>
      </div>

      <div className="space-y-4">
        {SECTIONS.map((section, i) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="card"
          >
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#e8f0fe] flex items-center justify-center text-[#1a73e8]">
                {section.icon}
              </div>
              <h2 className="text-heading-sm">{section.title}</h2>
            </div>
            {section.content}
          </motion.div>
        ))}
      </div>

      {/* Save Button */}
      <div className="flex items-center gap-3 mt-6">
        <button onClick={handleSave} disabled={saving} className="btn-primary">
          {saving ? (
            <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Saving...</>
          ) : saved ? (
            <><CheckCircle2 size={15} /> Saved!</>
          ) : (
            'Save Changes'
          )}
        </button>
        {saved && <p className="text-sm text-[#16a34a] font-medium">Settings saved successfully.</p>}
      </div>
    </div>
  );
}
