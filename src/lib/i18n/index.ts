import { LanguageCode, LanguageInfo, SUPPORTED_LANGUAGES } from './types';
import en from './translations/en.json';
import hi from './translations/hi.json';
import ta from './translations/ta.json';
import te from './translations/te.json';
import kn from './translations/kn.json';
import ml from './translations/ml.json';
import mr from './translations/mr.json';
import bn from './translations/bn.json';
import gu from './translations/gu.json';
import pa from './translations/pa.json';
import or from './translations/or.json';
import as from './translations/as.json';

export * from './types';

export const TRANSLATIONS: Record<LanguageCode, any> = {
  en,
  hi,
  ta,
  te,
  kn,
  ml,
  mr,
  bn,
  gu,
  pa,
  or,
  as,
};

/**
 * Safely lookup a nested key in an object by dot notation path (e.g. "nav.howItWorks")
 */
export function getNestedValue(obj: any, path: string): any {
  if (!obj || !path) return undefined;
  const parts = path.split('.');
  let current = obj;
  for (const part of parts) {
    if (current === undefined || current === null) return undefined;
    current = current[part];
  }
  return current;
}

/**
 * Retrieve translation string for a given key in specified language.
 * Falls back to English, then to key or custom fallback.
 */
export function translate(
  lang: LanguageCode,
  key: string,
  fallback?: string
): any {
  const currentDict = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const val = getNestedValue(currentDict, key);
  if (val !== undefined && val !== null) return val;

  // Fallback to English dictionary
  if (lang !== 'en') {
    const enVal = getNestedValue(TRANSLATIONS.en, key);
    if (enVal !== undefined && enVal !== null) return enVal;
  }

  return fallback !== undefined ? fallback : key;
}
