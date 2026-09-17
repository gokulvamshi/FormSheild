import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return 'N/A';
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function formatDateTime(date: Date | string | null | undefined): string {
  if (!date) return 'N/A';
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export function getInitials(name: string | null | undefined): string {
  if (!name) return 'U';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function parseJsonSafe<T>(json: string | null | undefined, fallback: T): T {
  if (!json) return fallback;
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}

export function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function maskPhone(phone: string): string {
  return phone.replace(/(\+91)(\d{2})\d{6}(\d{2})/, '$1$2XXXXXX$3');
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '…';
}

export const STATUS_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  DRAFT: { bg: 'bg-gray-100', text: 'text-gray-600', dot: 'bg-gray-400' },
  IN_PROGRESS: { bg: 'bg-blue-50', text: 'text-blue-600', dot: 'bg-blue-500' },
  DOCUMENTS_PENDING: { bg: 'bg-amber-50', text: 'text-amber-600', dot: 'bg-amber-500' },
  READY: { bg: 'bg-green-50', text: 'text-green-600', dot: 'bg-green-500' },
  DOWNLOADED: { bg: 'bg-purple-50', text: 'text-purple-600', dot: 'bg-purple-500' },
  SUBMITTED: { bg: 'bg-slate-50', text: 'text-slate-600', dot: 'bg-slate-400' },
};

export const STATUS_LABELS: Record<string, string> = {
  DRAFT: 'Draft',
  IN_PROGRESS: 'In Progress',
  DOCUMENTS_PENDING: 'Needs Attention',
  READY: 'Ready to Submit',
  DOWNLOADED: 'Downloaded',
  SUBMITTED: 'Submitted',
};

export const CATEGORY_LABELS: Record<string, string> = {
  TRANSPORT_LICENSING: 'Transport & Licensing',
  LOANS_FINANCE: 'Loans & Finance',
  CERTIFICATES_DOCUMENTS: 'Certificates & Documents',
  EDUCATION_SCHOLARSHIPS: 'Education & Scholarships',
};

export const STATE_LABELS: Record<string, string> = {
  ANDHRA_PRADESH: 'Andhra Pradesh',
  TELANGANA: 'Telangana',
  MAHARASHTRA: 'Maharashtra',
  TAMIL_NADU: 'Tamil Nadu',
  KARNATAKA: 'Karnataka',
  KERALA: 'Kerala',
  UTTAR_PRADESH: 'Uttar Pradesh',
  DELHI: 'Delhi (NCT)',
};
