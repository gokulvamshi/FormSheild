'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Shield,
  CheckCircle2,
  Lock,
  ArrowRight,
  FileText,
  AlertTriangle,
  Sparkles,
  Award,
  ChevronDown,
  Building2,
  GraduationCap,
  Car,
  Landmark,
  ExternalLink,
  Users,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSelector from '@/components/common/LanguageSelector';

const SUPPORTED_STATES_LIST = [
  { name: 'Telangana', count: '17 Schemes', code: 'TELANGANA' },
  { name: 'Andhra Pradesh', count: '17 Schemes', code: 'ANDHRA_PRADESH' },
  { name: 'Maharashtra', count: '17 Schemes', code: 'MAHARASHTRA' },
  { name: 'Karnataka', count: '17 Schemes', code: 'KARNATAKA' },
  { name: 'Tamil Nadu', count: '17 Schemes', code: 'TAMIL_NADU' },
  { name: 'Uttar Pradesh', count: '17 Schemes', code: 'UTTAR_PRADESH' },
  { name: 'Kerala', count: '17 Schemes', code: 'KERALA' },
  { name: 'Delhi (NCT)', count: '17 Schemes', code: 'DELHI' },
];

const CATEGORY_ICONS = [Car, Landmark, Building2, GraduationCap];
const CATEGORY_COLORS = [
  'text-blue-600 bg-blue-50 border-blue-200',
  'text-emerald-600 bg-emerald-50 border-emerald-200',
  'text-amber-600 bg-amber-50 border-amber-200',
  'text-purple-600 bg-purple-50 border-purple-200',
];

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { t, tObj } = useLanguage();

  const rejectionItems = tObj<Array<{ issue: string; manual: string; formshield: string }>>('rejection.items') || [];
  const stepsList = tObj<Array<{ step: string; title: string; desc: string }>>('howItWorks.steps') || [];
  const categoryItems = tObj<Array<{ title: string; schemes: string[] }>>('schemes.categories') || [];
  const validationCriteria = tObj<Array<{ id: string; title: string; desc: string }>>('validation.criteria') || [];
  const faqsList = tObj<Array<{ q: string; a: string }>>('faqs.list') || [];

  return (
    <div className="min-h-screen bg-[#fafbfc] text-[#1f2937] flex flex-col font-sans">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-[#1a73e8] via-[#2563eb] to-[#0d9488] text-white text-xs py-2 px-4 font-medium flex items-center justify-between sm:justify-center gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{t('announcement.text')}</span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link href="/login" className="underline font-bold hover:text-blue-100 hidden sm:inline">
            {t('announcement.tryLiveDemo')}
          </Link>
          {/* Top Announcement Bar Language Selector for Quick Mobile Access */}
          <div className="sm:hidden">
            <LanguageSelector variant="bar" />
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#e5e7eb] px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Top-Left: Language Selector Dropdown & Brand */}
          <div className="flex items-center gap-3">
            {/* Dedicated Top-Left Language Selector */}
            <div className="hidden sm:block">
              <LanguageSelector variant="header" />
            </div>

            <div className="h-5 w-px bg-slate-200 hidden sm:block" />

            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1a73e8] to-[#0d9488] flex items-center justify-center shadow-md">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-bold text-lg text-[#1f2937]">{t('nav.brandName')}</span>
                <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.5 rounded ml-1.5 align-middle">
                  {t('nav.badgeIndia')}
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#4b5563]">
            <a href="#how-it-works" className="hover:text-[#1a73e8] transition-colors">
              {t('nav.howItWorks')}
            </a>
            <a href="#schemes" className="hover:text-[#1a73e8] transition-colors">
              {t('nav.supportedSchemes')}
            </a>
            <a href="#rejection-defense" className="hover:text-[#1a73e8] transition-colors">
              {t('nav.zeroRejection')}
            </a>
            <a href="#faqs" className="hover:text-[#1a73e8] transition-colors">
              {t('nav.faqs')}
            </a>
          </nav>

          {/* Actions & Mobile Language Dropdown */}
          <div className="flex items-center gap-2.5">
            <div className="sm:hidden">
              <LanguageSelector variant="header" />
            </div>
            <Link
              href="/login"
              className="text-sm font-semibold text-[#4b5563] hover:text-[#1a73e8] px-3 py-2 transition-colors"
            >
              {t('nav.signIn')}
            </Link>
            <Link
              href="/login"
              className="btn-primary text-sm py-2 px-3.5 sm:px-4 shadow-sm hover:shadow-md transition-shadow"
            >
              {t('nav.getStarted')}
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-14 sm:pt-16 pb-20 px-6 overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-[#fafbfc]">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold mb-6 shadow-sm flex-wrap justify-center"
          >
            <Shield className="w-3.5 h-3.5 text-[#1a73e8]" />
            <span>{t('hero.badge')}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            <span className="text-[#1a73e8]">{t('hero.poweredBy')}</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#111827] tracking-tight leading-[1.18] mb-6"
          >
            {t('hero.titlePrefix')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1a73e8] via-[#2563eb] to-[#0d9488]">
              {t('hero.titleHighlight')}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-[#4b5563] max-w-3xl mx-auto leading-relaxed mb-8"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-12"
          >
            <Link
              href="/login"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#1a73e8] hover:bg-[#1557b0] text-white font-semibold text-base shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2"
            >
              <span>{t('hero.startApplication')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/login"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-[#f3f4f6] text-[#1f2937] font-semibold text-base border border-[#d1d5db] transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-[#1a73e8]" />
              <span>{t('hero.demoLogin')}</span>
            </Link>
          </motion.div>

          {/* Key Assurance Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-medium text-[#6b7280]">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#1a73e8]" />
              <span>{t('hero.dpdpCompliant')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#d97706]" />
              <span>{t('hero.itActRule')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Rejection Defense Comparison */}
      <section id="rejection-defense" className="py-16 px-6 bg-white border-y border-[#e5e7eb]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-[#1a73e8] uppercase tracking-wider">
              {t('rejection.badge')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] mt-2">
              {t('rejection.title')}
            </h2>
            <p className="text-sm text-[#6b7280] mt-2 max-w-2xl mx-auto">
              {t('rejection.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rejectionItems.map((item, idx) => (
              <div
                key={idx}
                className="card p-5 border border-[#e5e7eb] hover:shadow-md transition-shadow"
              >
                <h3 className="font-bold text-sm text-[#111827] mb-3">{item.issue}</h3>
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-red-50 text-red-800 border border-red-100 leading-relaxed">
                    {item.manual}
                  </div>
                  <div className="p-2.5 rounded-lg bg-green-50 text-green-900 border border-green-100 leading-relaxed font-medium">
                    {item.formshield}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6 bg-[#fafbfc]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-[#1a73e8] uppercase tracking-wider">
              {t('howItWorks.badge')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] mt-2">
              {t('howItWorks.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stepsList.map((step, idx) => (
              <div key={idx} className="card relative p-6 bg-white border border-[#e5e7eb]">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1a73e8] font-bold text-base flex items-center justify-center mb-4">
                  {step.step}
                </div>
                <h3 className="font-bold text-base text-[#111827] mb-2">{step.title}</h3>
                <p className="text-xs text-[#6b7280] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Schemes & Categories */}
      <section id="schemes" className="py-20 px-6 bg-white border-t border-[#e5e7eb]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-bold text-[#1a73e8] uppercase tracking-wider">
              {t('schemes.badge')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] mt-2">
              {t('schemes.title')}
            </h2>
            <p className="text-sm text-[#6b7280] mt-2">
              {t('schemes.subtitle')}
            </p>
          </div>

          {/* States Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {SUPPORTED_STATES_LIST.map((state) => (
              <div
                key={state.code}
                className="px-3.5 py-1.5 rounded-full bg-[#f3f4f6] text-xs font-medium text-[#4b5563] flex items-center gap-1.5 border border-[#e5e7eb]"
              >
                <span>📍</span>
                <span className="font-semibold text-[#1f2937]">{state.name}</span>
                <span className="text-[10px] text-[#1a73e8] font-bold">({state.count})</span>
              </div>
            ))}
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categoryItems.map((cat, idx) => {
              const Icon = CATEGORY_ICONS[idx % CATEGORY_ICONS.length];
              const color = CATEGORY_COLORS[idx % CATEGORY_COLORS.length];
              return (
                <div key={idx} className="card p-6 border border-[#e5e7eb]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2.5 rounded-xl border ${color}`}>
                      <Icon size={22} />
                    </div>
                    <h3 className="font-bold text-base text-[#111827]">{cat.title}</h3>
                  </div>

                  <div className="space-y-2">
                    {cat.schemes.map((scheme, sIdx) => (
                      <div
                        key={sIdx}
                        className="flex items-center gap-2 text-xs text-[#4b5563] py-1 border-b border-[#f3f4f6] last:border-0"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a] shrink-0" />
                        <span>{scheme}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 14 Validation Criteria Section */}
      <section id="validation-criteria" className="py-20 px-6 bg-gradient-to-b from-[#fafbfc] to-blue-50/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-bold text-[#1a73e8] uppercase tracking-wider">
              {t('validation.badge')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] mt-2">
              {t('validation.title')}
            </h2>
            <p className="text-sm text-[#6b7280] mt-2 max-w-2xl mx-auto">
              {t('validation.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {validationCriteria.map((criterion) => (
              <div
                key={criterion.id}
                className="card p-5 bg-white border border-[#e5e7eb] rounded-xl hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-2.5 mb-2.5">
                  <span className="w-7 h-7 rounded-lg bg-blue-50 text-[#1a73e8] font-bold text-xs flex items-center justify-center shrink-0">
                    {criterion.id}
                  </span>
                  <h3 className="font-semibold text-xs text-[#111827] leading-snug">
                    {criterion.title}
                  </h3>
                </div>
                <p className="text-[11px] text-[#6b7280] leading-relaxed">
                  {criterion.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section id="faqs" className="py-20 px-6 bg-white border-t border-[#e5e7eb]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-[#1a73e8] uppercase tracking-wider">
              {t('faqs.badge')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] mt-2">
              {t('faqs.title')}
            </h2>
          </div>

          <div className="space-y-3">
            {faqsList.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="border border-[#e5e7eb] rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-left font-semibold text-sm text-[#1f2937] flex items-center justify-between gap-4 hover:bg-[#fafafa] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#6b7280] transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-[#6b7280] leading-relaxed border-t border-[#f3f4f6]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Floating CTA Banner */}
      <section className="py-16 px-6 bg-gradient-to-r from-[#1a73e8] to-[#0d9488] text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-extrabold mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-sm sm:text-base text-blue-100 max-w-2xl mx-auto mb-8">
            {t('cta.subtitle')}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/login"
              className="px-8 py-3.5 rounded-xl bg-white text-[#1a73e8] font-bold text-sm hover:bg-blue-50 transition-colors shadow-lg"
            >
              {t('cta.getStarted')}
            </Link>
            <Link
              href="/login"
              className="px-6 py-3.5 rounded-xl bg-black/20 hover:bg-black/30 text-white font-semibold text-sm border border-white/20 transition-colors"
            >
              {t('cta.tryDemo')}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#111827] text-white py-12 px-6 text-xs">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-gray-800">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1a73e8] to-[#0d9488] flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-base">{t('nav.brandName')}</span>
            </div>
            <p className="text-gray-400 text-[11px] leading-relaxed">
              {t('footer.about')}
            </p>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-3 text-gray-200">{t('footer.supportedStates')}</h4>
            <ul className="space-y-1.5 text-gray-400">
              <li>Telangana & Andhra Pradesh</li>
              <li>Maharashtra & Karnataka</li>
              <li>Tamil Nadu & Kerala</li>
              <li>Uttar Pradesh & Delhi (NCT)</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-3 text-gray-200">{t('footer.keySchemes')}</h4>
            <ul className="space-y-1.5 text-gray-400">
              <li>Driving License (LLR & Permanent)</li>
              <li>Income & Caste Certificates</li>
              <li>PM Mudra & Education Loans</li>
              <li>Post-Matric Scholarships</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-3 text-gray-200">{t('footer.legalSecurity')}</h4>
            <ul className="space-y-1.5 text-gray-400">
              <li>DPDP Act 2023 Compliant</li>
              <li>IT Act 2000 Rule 9A Acceptance</li>
              <li>DigiLocker Partner API Specs</li>
              <li>256-Bit SSL Data Encryption</li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between text-gray-500 text-[11px] gap-4">
          <p>© {new Date().getFullYear()} {t('footer.copyright')}</p>
          <p>{t('footer.complianceNote')}</p>
        </div>
      </footer>
    </div>
  );
}
