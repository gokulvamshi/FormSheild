'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { LanguageCode, LanguageInfo, SUPPORTED_LANGUAGES, translate } from '@/lib/i18n';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string, fallback?: string) => string;
  tObj: <T = any>(key: string, fallback?: T) => T;
  languages: LanguageInfo[];
  currentLanguage: LanguageInfo;
}

const STORAGE_KEY = 'formshield_language';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>('en');
  const [mounted, setMounted] = useState(false);

  // Initialize from localStorage on mount
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem(STORAGE_KEY) as LanguageCode;
      if (savedLang && SUPPORTED_LANGUAGES.some((l) => l.code === savedLang)) {
        setLanguageState(savedLang);
        document.documentElement.lang = savedLang;
      } else {
        document.documentElement.lang = 'en';
      }
    } catch {
      // Ignore localStorage errors (e.g. incognito)
    }
    setMounted(true);
  }, []);

  const setLanguage = useCallback((newLang: LanguageCode) => {
    setLanguageState(newLang);
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
      document.documentElement.lang = newLang;
    } catch {
      // Ignore error
    }
  }, []);

  const t = useCallback(
    (key: string, fallback?: string): string => {
      const res = translate(language, key, fallback);
      return typeof res === 'string' ? res : fallback || key;
    },
    [language]
  );

  const tObj = useCallback(
    <T = any,>(key: string, fallback?: T): T => {
      const res = translate(language, key, fallback as any);
      return res !== undefined ? (res as T) : (fallback as T);
    },
    [language]
  );

  const currentLanguage = useMemo(() => {
    return SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t,
      tObj,
      languages: SUPPORTED_LANGUAGES,
      currentLanguage,
    }),
    [language, setLanguage, t, tObj, currentLanguage]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
