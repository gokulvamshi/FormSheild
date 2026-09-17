export interface User {
  id: string;
  firebaseUid?: string | null;
  phone?: string | null;
  name: string | null;
  email: string | null;
  avatar?: string | null;
  language: Language;
  digilockerConnected: boolean;
  digilockerAccessToken: string | null;
  digilockerRefreshToken: string | null;
  digilockerTokenExpiry: Date | null;
  digilockerUserId: string | null;
  mockMode: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type Language = 'ENGLISH' | 'HINDI' | 'TELUGU' | 'TAMIL' | 'MARATHI' | 'KANNADA' | 'MALAYALAM';

export interface UserProfile {
  id: string;
  firebaseUid?: string | null;
  phone?: string | null;
  name: string | null;
  email: string | null;
  avatar?: string | null;
  language: Language;
  digilockerConnected: boolean;
  digilockerUserId: string | null;
  mockMode: boolean;
}

export interface OtpSession {
  id: string;
  phone: string;
  otp: string;
  expiresAt: Date;
  attempts: number;
  verified: boolean;
}

export interface DashboardStats {
  activeApplications: number;
  readyToSubmit: number;
  needsAttention: number;
  documentsConnected: number;
}
