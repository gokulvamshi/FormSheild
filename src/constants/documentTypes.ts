import type { DocumentType } from '@/types/document';

export interface DocumentTypeInfo {
  code: DocumentType;
  displayName: string;
  shortName: string;
  icon: string;
  issuingAuthority: string;
  description: string;
}

export const DOCUMENT_TYPES: DocumentTypeInfo[] = [
  {
    code: 'AADHAAR',
    displayName: 'Aadhaar Card',
    shortName: 'Aadhaar',
    icon: '🪪',
    issuingAuthority: 'UIDAI',
    description: 'Unique Identification Authority of India — Identity & Address Proof',
  },
  {
    code: 'PAN',
    displayName: 'PAN Card',
    shortName: 'PAN',
    icon: '💳',
    issuingAuthority: 'Income Tax Department',
    description: 'Permanent Account Number — Tax Identity Document',
  },
  {
    code: 'DL',
    displayName: 'Driving License',
    shortName: 'DL',
    icon: '🚗',
    issuingAuthority: 'Regional Transport Office (RTO)',
    description: 'Official Driving License issued by RTO',
  },
  {
    code: 'MARKSHEET_10',
    displayName: 'Class 10 Marksheet',
    shortName: 'Class X',
    icon: '📋',
    issuingAuthority: 'State Board / CBSE / ICSE',
    description: 'Secondary School Certificate — DOB and Education Proof',
  },
  {
    code: 'MARKSHEET_12',
    displayName: 'Class 12 Marksheet',
    shortName: 'Class XII',
    icon: '📋',
    issuingAuthority: 'State Board / CBSE / ISC',
    description: 'Higher Secondary Certificate — Education Qualification Proof',
  },
  {
    code: 'DEGREE',
    displayName: 'Degree Certificate',
    shortName: 'Degree',
    icon: '🎓',
    issuingAuthority: 'University',
    description: 'University Degree Certificate — Higher Education Proof',
  },
  {
    code: 'INCOME_CERT',
    displayName: 'Income Certificate',
    shortName: 'Income Cert',
    icon: '📑',
    issuingAuthority: 'Tahsildar / Mandal Revenue Officer',
    description: 'Annual Family Income Certificate for government schemes',
  },
  {
    code: 'CASTE_CERT',
    displayName: 'Caste Certificate',
    shortName: 'Caste Cert',
    icon: '📜',
    issuingAuthority: 'Tahsildar / District Collector',
    description: 'SC/ST/OBC Category Certificate for reservations and schemes',
  },
  {
    code: 'DOMICILE',
    displayName: 'Domicile Certificate',
    shortName: 'Domicile',
    icon: '🏠',
    issuingAuthority: 'District Magistrate / Tahsildar',
    description: 'Certificate proving state domicile for 3+ years',
  },
  {
    code: 'BIRTH_CERT',
    displayName: 'Birth Certificate',
    shortName: 'Birth Cert',
    icon: '👶',
    issuingAuthority: 'Municipal Corporation / Gram Panchayat',
    description: 'Official Birth Certificate — Date and Place of Birth Proof',
  },
  {
    code: 'VOTER_ID',
    displayName: 'Voter ID Card (EPIC)',
    shortName: 'Voter ID',
    icon: '🗳️',
    issuingAuthority: 'Election Commission of India',
    description: 'Electoral Photo Identity Card — Identity & Address Proof',
  },
  {
    code: 'RC',
    displayName: 'Vehicle Registration Certificate',
    shortName: 'RC',
    icon: '🚘',
    issuingAuthority: 'Regional Transport Office (RTO)',
    description: 'Vehicle Registration Certificate — Proof of Vehicle Ownership',
  },
  {
    code: 'PASSPORT',
    displayName: 'Passport',
    shortName: 'Passport',
    icon: '✈️',
    issuingAuthority: 'Ministry of External Affairs',
    description: 'Indian Passport — Identity & International Travel Document',
  },
  {
    code: 'MEDICAL_CERT',
    displayName: 'Medical Fitness Certificate',
    shortName: 'Medical Cert',
    icon: '⚕️',
    issuingAuthority: 'Registered Medical Practitioner',
    description: 'Medical Fitness Certificate — Form 1A for Driving License',
  },
  {
    code: 'OTHER',
    displayName: 'Other Document',
    shortName: 'Other',
    icon: '📁',
    issuingAuthority: 'Various',
    description: 'Other supporting documents',
  },
];

export const DOCUMENT_TYPE_MAP: Record<DocumentType, DocumentTypeInfo> = Object.fromEntries(
  DOCUMENT_TYPES.map((d) => [d.code, d])
) as Record<DocumentType, DocumentTypeInfo>;
