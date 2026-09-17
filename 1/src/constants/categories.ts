import type { CategoryInfo } from '@/types/template';

export const CATEGORIES: CategoryInfo[] = [
  {
    code: 'TRANSPORT_LICENSING',
    displayName: 'Transport & Licensing',
    icon: '🚗',
    description: 'Driving licenses, vehicle registration, and transport permits',
    color: 'blue',
  },
  {
    code: 'LOANS_FINANCE',
    displayName: 'Loans & Finance',
    icon: '💰',
    description: 'Education loans, personal loans, PM schemes, and financial assistance',
    color: 'green',
  },
  {
    code: 'CERTIFICATES_DOCUMENTS',
    displayName: 'Certificates & Documents',
    icon: '📄',
    description: 'Income, caste, domicile, birth, and character certificates',
    color: 'purple',
  },
  {
    code: 'EDUCATION_SCHOLARSHIPS',
    displayName: 'Education & Scholarships',
    icon: '🎓',
    description: 'Scholarships, admissions, and educational assistance programs',
    color: 'orange',
  },
];

export const CATEGORY_APPLICATIONS: Record<string, Array<{ code: string; displayName: string; description: string; estimatedTime: string }>> = {
  TRANSPORT_LICENSING: [
    { code: 'DL_LEARNERS_PERMIT', displayName: "Driving License — Learner's Permit (New)", description: 'Apply for a new learner\'s license to start driving practice', estimatedTime: '1–7 days' },
    { code: 'DL_PERMANENT', displayName: 'Driving License — Permanent (New)', description: 'Apply for a permanent driving license after passing the driving test', estimatedTime: '7–30 days' },
    { code: 'DL_RENEWAL', displayName: 'Driving License — Renewal', description: 'Renew your existing driving license before or after expiry', estimatedTime: '7–15 days' },
    { code: 'RC_NEW_VEHICLE', displayName: 'Vehicle Registration Certificate (RC) — New Vehicle', description: 'Register your newly purchased vehicle with the RTO', estimatedTime: '7–30 days' },
    { code: 'RC_TRANSFER_OWNERSHIP', displayName: 'Vehicle Registration — Transfer of Ownership', description: 'Transfer vehicle registration when buying/selling a used vehicle', estimatedTime: '14–30 days' },
  ],
  LOANS_FINANCE: [
    { code: 'EDUCATION_LOAN', displayName: 'Education Loan (SBI/PNB format)', description: 'Apply for an education loan for higher studies in India or abroad', estimatedTime: '15–30 days' },
    { code: 'PERSONAL_LOAN', displayName: 'Personal Loan Application', description: 'Apply for a personal loan from a bank or NBFC', estimatedTime: '3–7 days' },
    { code: 'PM_MUDRA_LOAN', displayName: 'PM Mudra Loan (PMMY) Application', description: 'Apply for micro, small & medium enterprise loans under PMMY', estimatedTime: '7–15 days' },
    { code: 'PM_AWAS_YOJANA', displayName: 'PM Awas Yojana (Housing Loan)', description: 'Apply for credit-linked subsidy for housing under PMAY', estimatedTime: '30–60 days' },
  ],
  CERTIFICATES_DOCUMENTS: [
    { code: 'INCOME_CERTIFICATE', displayName: 'Income Certificate', description: 'Official certificate of annual family income issued by Tahsildar', estimatedTime: '7–15 days' },
    { code: 'CASTE_CERTIFICATE', displayName: 'Caste Certificate (SC/ST/OBC)', description: 'Official caste certificate for SC, ST, OBC, or EWS categories', estimatedTime: '15–30 days' },
    { code: 'DOMICILE_CERTIFICATE', displayName: 'Domicile / Residence Certificate', description: 'Certificate proving residence and domicile in the state', estimatedTime: '7–21 days' },
    { code: 'BIRTH_CERTIFICATE', displayName: 'Birth Certificate (Delayed Registration)', description: 'Register a birth that was not registered within the prescribed period', estimatedTime: '30–60 days' },
    { code: 'CHARACTER_CERTIFICATE', displayName: 'Character / Police Verification Certificate', description: 'Police verification certificate for employment or other purposes', estimatedTime: '15–30 days' },
  ],
  EDUCATION_SCHOLARSHIPS: [
    { code: 'POST_MATRIC_SCHOLARSHIP', displayName: 'Post-Matric Scholarship (State Scholarship)', description: 'State government scholarship for SC/ST/OBC students pursuing post-matric education', estimatedTime: '30–60 days' },
    { code: 'CENTRAL_SECTOR_SCHOLARSHIP', displayName: 'Central Sector Scholarship (NSP)', description: 'Merit-based scholarship from Ministry of Education via National Scholarship Portal', estimatedTime: '45–90 days' },
    { code: 'COLLEGE_ADMISSION', displayName: 'University / College Admission Application', description: 'Generic application form for university and college admissions', estimatedTime: '7–21 days' },
  ],
};
