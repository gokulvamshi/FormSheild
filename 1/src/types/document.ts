export type DocumentType =
  | 'AADHAAR'
  | 'PAN'
  | 'DL'
  | 'MARKSHEET_10'
  | 'MARKSHEET_12'
  | 'DEGREE'
  | 'INCOME_CERT'
  | 'CASTE_CERT'
  | 'DOMICILE'
  | 'BIRTH_CERT'
  | 'VOTER_ID'
  | 'RC'
  | 'PASSPORT'
  | 'MEDICAL_CERT'
  | 'OTHER';

export interface Document {
  id: string;
  userId: string;
  type: DocumentType;
  name: string;
  issuingAuthority: string | null;
  issueDate: Date | null;
  expiryDate: Date | null;
  verified: boolean;
  digilockerDocId: string | null;
  extractedData: Record<string, string> | null;
  rawFileUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ExtractedAadhaarData {
  fullName: string;
  dob: string;
  gender: string;
  address: string;
  houseNumber?: string;
  street?: string;
  locality?: string;
  district?: string;
  state?: string;
  pincode?: string;
  fatherName?: string;
  aadhaarNumber: string;
  photo?: string; // base64
}

export interface ExtractedPanData {
  fullName: string;
  fatherName: string;
  dob: string;
  panNumber: string;
}

export interface ExtractedMarksheetData {
  studentName: string;
  fatherName: string;
  motherName: string;
  dob?: string;
  boardName: string;
  rollNumber: string;
  yearOfPassing: string;
  percentage?: string;
  grade?: string;
}

export interface ExtractedCasteCertData {
  fullName: string;
  fatherName: string;
  caste: string;
  category: 'SC' | 'ST' | 'OBC' | 'OBC-A' | 'OBC-B' | 'EWS';
  certificateNumber: string;
  issuingAuthority: string;
  issueDate: string;
  state: string;
}

export interface ExtractedIncomeCertData {
  fullName: string;
  fatherName: string;
  annualIncome: string;
  source: string;
  certificateNumber: string;
  issuingAuthority: string;
  issueDate: string;
}

export interface DigiLockerDocument {
  name: string;
  type: string;
  size: string;
  date: string;
  uri: string;
  issuer: string;
  issuerName: string;
  doctype: string;
  description: string;
}
