/**
 * Mock DigiLocker Service
 * 
 * Returns realistic dummy data for development/demo purposes.
 * Toggle mock mode in Settings → DigiLocker → "Use Mock Data"
 */

import type { Document, ExtractedAadhaarData, ExtractedPanData, ExtractedMarksheetData } from '@/types/document';

export const MOCK_USER_PROFILE = {
  sub: 'mock-digilocker-uid-12345',
  name: 'Rahul Sharma',
  dob: '1998-08-15',
  gender: 'M',
  phone: '+919876543210',
  email: 'rahul.sharma@example.com',
  aadhaar_number: 'XXXX XXXX 7890',
  digilocker_id: 'rahulsharma@digi',
};

export const MOCK_EXTRACTED_AADHAAR: ExtractedAadhaarData = {
  fullName: 'RAHUL SHARMA',
  dob: '15/08/1998',
  gender: 'MALE',
  address: 'H.No. 42, Srinagar Colony, Hyderabad, Telangana - 500082',
  houseNumber: '42',
  street: 'Srinagar Colony',
  locality: 'Srinagar Colony',
  district: 'Hyderabad',
  state: 'Telangana',
  pincode: '500082',
  fatherName: 'SURESH SHARMA',
  aadhaarNumber: 'XXXX XXXX 7890',
};

export const MOCK_EXTRACTED_PAN: ExtractedPanData = {
  fullName: 'RAHUL SHARMA',
  fatherName: 'SURESH SHARMA',
  dob: '15/08/1998',
  panNumber: 'ABCPS1234D',
};

export const MOCK_EXTRACTED_MARKSHEET_10: ExtractedMarksheetData = {
  studentName: 'RAHUL SHARMA',
  fatherName: 'SURESH SHARMA',
  motherName: 'ANITA SHARMA',
  dob: '15/08/1998',
  boardName: 'Board of Secondary Education, Telangana',
  rollNumber: 'TS2014AB1234',
  yearOfPassing: '2014',
  percentage: '85.6',
  grade: 'A1',
};

export const MOCK_EXTRACTED_MARKSHEET_12: ExtractedMarksheetData = {
  studentName: 'RAHUL SHARMA',
  fatherName: 'SURESH SHARMA',
  motherName: 'ANITA SHARMA',
  boardName: 'Board of Intermediate Education, Telangana',
  rollNumber: 'TS2016BC5678',
  yearOfPassing: '2016',
  percentage: '78.2',
  grade: 'B1',
};

export const MOCK_DOCUMENTS: Omit<Document, 'id' | 'userId' | 'createdAt' | 'updatedAt'>[] = [
  {
    type: 'AADHAAR',
    name: 'Aadhaar Card',
    issuingAuthority: 'UIDAI',
    issueDate: new Date('2016-03-10'),
    expiryDate: null,
    verified: true,
    digilockerDocId: 'mock-aadhaar-001',
    extractedData: MOCK_EXTRACTED_AADHAAR as unknown as Record<string, string>,
    rawFileUrl: null,
  },
  {
    type: 'PAN',
    name: 'PAN Card',
    issuingAuthority: 'Income Tax Department, Govt. of India',
    issueDate: new Date('2018-06-20'),
    expiryDate: null,
    verified: true,
    digilockerDocId: 'mock-pan-001',
    extractedData: MOCK_EXTRACTED_PAN as unknown as Record<string, string>,
    rawFileUrl: null,
  },
  {
    type: 'MARKSHEET_10',
    name: 'Class 10 Marksheet (2014)',
    issuingAuthority: 'Board of Secondary Education, Telangana',
    issueDate: new Date('2014-06-01'),
    expiryDate: null,
    verified: true,
    digilockerDocId: 'mock-marksheet10-001',
    extractedData: MOCK_EXTRACTED_MARKSHEET_10 as unknown as Record<string, string>,
    rawFileUrl: null,
  },
  {
    type: 'MARKSHEET_12',
    name: 'Class 12 Marksheet (2016)',
    issuingAuthority: 'Board of Intermediate Education, Telangana',
    issueDate: new Date('2016-06-01'),
    expiryDate: null,
    verified: true,
    digilockerDocId: 'mock-marksheet12-001',
    extractedData: MOCK_EXTRACTED_MARKSHEET_12 as unknown as Record<string, string>,
    rawFileUrl: null,
  },
  {
    type: 'CASTE_CERT',
    name: 'OBC Caste Certificate',
    issuingAuthority: 'Revenue Divisional Officer, Hyderabad',
    issueDate: new Date('2020-09-14'),
    expiryDate: null,
    verified: true,
    digilockerDocId: 'mock-caste-001',
    extractedData: {
      fullName: 'RAHUL SHARMA',
      fatherName: 'SURESH SHARMA',
      caste: 'Yadav',
      category: 'OBC',
      certificateNumber: 'HYD/OBC/2020/12345',
      issuingAuthority: 'RDO Hyderabad',
      issueDate: '14/09/2020',
      state: 'Telangana',
    },
    rawFileUrl: null,
  },
  {
    type: 'DEGREE',
    name: 'B.Tech Degree Certificate — JNTU Hyderabad',
    issuingAuthority: 'Jawaharlal Nehru Technological University, Hyderabad',
    issueDate: new Date('2020-11-01'),
    expiryDate: null,
    verified: true,
    digilockerDocId: 'mock-degree-001',
    extractedData: {
      studentName: 'RAHUL SHARMA',
      fatherName: 'SURESH SHARMA',
      university: 'JNTU Hyderabad',
      course: 'Bachelor of Technology (B.Tech)',
      branch: 'Computer Science Engineering',
      yearOfPassing: '2020',
      enrollmentNumber: 'JNTU17CSE1234',
      division: 'First Class with Distinction',
    },
    rawFileUrl: null,
  },
];

export function getMockDocuments(): typeof MOCK_DOCUMENTS {
  return MOCK_DOCUMENTS;
}

export function getMockExtractedData(docType: string): Record<string, string> | null {
  switch (docType) {
    case 'AADHAAR':
      return MOCK_EXTRACTED_AADHAAR as unknown as Record<string, string>;
    case 'PAN':
      return MOCK_EXTRACTED_PAN as unknown as Record<string, string>;
    case 'MARKSHEET_10':
      return MOCK_EXTRACTED_MARKSHEET_10 as unknown as Record<string, string>;
    case 'MARKSHEET_12':
      return MOCK_EXTRACTED_MARKSHEET_12 as unknown as Record<string, string>;
    default:
      return null;
  }
}
