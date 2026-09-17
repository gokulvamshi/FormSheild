/**
 * FormShield - Comprehensive Seed Data
 * Application templates for 8 states × all application types
 * 
 * Run with: npm run db:seed
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ─────────────────────────────────────────────────────────────────────────────
// TEMPLATE DATA
// ─────────────────────────────────────────────────────────────────────────────

const DL_LEARNERS_FOLLOW_UP_QUESTIONS = JSON.stringify([
  {
    id: 'vehicle_type',
    question: 'What vehicle type are you applying for?',
    type: 'select',
    options: [
      'Two-wheeler without gear (MCWOG) — Age 16+',
      'Two-wheeler with gear (MCW) — Age 18+',
      'Light Motor Vehicle (LMV) / Car — Age 18+',
      'Both two-wheeler and LMV — Age 18+',
    ],
    required: true,
    helperText: 'Select all vehicle types you want to drive',
  },
  {
    id: 'first_time',
    question: 'Is this your first driving license application?',
    type: 'radio',
    options: ['Yes, this is my first time', 'No, I have a license from another state'],
    required: true,
  },
  {
    id: 'corrective_lenses',
    question: 'Do you wear corrective lenses (glasses/contact lenses)?',
    type: 'radio',
    options: ['Yes', 'No'],
    required: true,
    helperText: 'This will be recorded in your license',
  },
  {
    id: 'blood_group',
    question: 'What is your blood group?',
    type: 'select',
    options: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Not known'],
    required: true,
  },
  {
    id: 'traffic_violation',
    question: 'Do you have any pending traffic violation cases?',
    type: 'radio',
    options: ['No', 'Yes'],
    required: true,
  },
]);

const DL_LEARNERS_REQUIRED_DOCS = JSON.stringify([
  {
    documentType: 'AADHAAR',
    label: 'Aadhaar Card',
    mandatory: true,
    description: 'Required for identity proof and address proof. Aadhaar serves as both.',
    howToObtain: 'Download from UIDAI portal: uidai.gov.in or visit nearest Aadhaar centre',
  },
  {
    documentType: 'MARKSHEET_10',
    label: 'Class 10 Marksheet OR Birth Certificate',
    mandatory: true,
    description: 'Required as proof of date of birth',
    alternatives: ['BIRTH_CERT'],
    howToObtain: 'Obtain from your school or state board. Can also upload to DigiLocker from board website.',
  },
  {
    documentType: 'MEDICAL_CERT',
    label: 'Medical Fitness Certificate (Form 1A)',
    mandatory: true,
    description: 'Medical fitness certificate from a registered medical practitioner. Must include blood group, vision test results, and declaration of no disability affecting driving.',
    howToObtain: 'Visit any MBBS doctor or government hospital. Download Form 1A template from parivahan.gov.in. Cost: ₹50–₹200 at private clinics.',
    downloadUrl: 'https://parivahan.gov.in/parivahan//sites/default/files/content_attachments/Form_1A.pdf',
  },
  {
    documentType: 'OTHER',
    label: 'Passport Size Photographs (3 copies)',
    mandatory: true,
    description: 'Recent passport size color photographs with white/light background. Size: 35mm × 45mm',
    howToObtain: 'Get from any photo studio. Many RTO offices also have photo booths.',
  },
]);

const DL_LEARNERS_FORM_TEMPLATE = JSON.stringify([
  { fieldId: 'applicant_name', label: 'Full Name of Applicant', type: 'text', section: 'Personal Information', sourceDocument: 'AADHAAR', sourceField: 'fullName', required: true, format: 'UPPERCASE' },
  { fieldId: 'father_name', label: "Father's / Guardian's Name", type: 'text', section: 'Personal Information', sourceDocument: 'AADHAAR', sourceField: 'fatherName', required: true, format: 'UPPERCASE' },
  { fieldId: 'dob', label: 'Date of Birth', type: 'date', section: 'Personal Information', sourceDocument: 'AADHAAR', sourceField: 'dob', required: true, format: 'DD/MM/YYYY' },
  { fieldId: 'gender', label: 'Gender', type: 'select', section: 'Personal Information', sourceDocument: 'AADHAAR', sourceField: 'gender', required: true, options: ['MALE', 'FEMALE', 'TRANSGENDER'] },
  { fieldId: 'blood_group', label: 'Blood Group', type: 'select', section: 'Personal Information', followUpSource: 'blood_group', required: true, options: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
  { fieldId: 'corrective_lenses', label: 'Do you wear corrective lenses?', type: 'radio', section: 'Personal Information', followUpSource: 'corrective_lenses', required: true, options: ['Yes', 'No'] },
  { fieldId: 'permanent_address', label: 'Permanent Address', type: 'textarea', section: 'Address Details', sourceDocument: 'AADHAAR', sourceField: 'address', required: true },
  { fieldId: 'pincode', label: 'PIN Code', type: 'text', section: 'Address Details', sourceDocument: 'AADHAAR', sourceField: 'pincode', required: true, validation: '^[0-9]{6}$' },
  { fieldId: 'district', label: 'District', type: 'text', section: 'Address Details', sourceDocument: 'AADHAAR', sourceField: 'district', required: true, format: 'UPPERCASE' },
  { fieldId: 'state', label: 'State', type: 'text', section: 'Address Details', sourceDocument: 'AADHAAR', sourceField: 'state', required: true },
  { fieldId: 'vehicle_type', label: 'Class of Vehicle', type: 'select', section: 'License Details', followUpSource: 'vehicle_type', required: true },
  { fieldId: 'aadhaar_number', label: 'Aadhaar Number', type: 'text', section: 'Document Numbers', sourceDocument: 'AADHAAR', sourceField: 'aadhaarNumber', required: true },
  { fieldId: 'declaration_date', label: 'Date of Declaration', type: 'date', section: 'Declaration', required: true },
  { fieldId: 'declaration_place', label: 'Place of Declaration', type: 'text', section: 'Declaration', sourceDocument: 'AADHAAR', sourceField: 'district', required: true },
]);

const INCOME_CERT_FOLLOW_UP = JSON.stringify([
  {
    id: 'income_source',
    question: 'What is your primary source of income?',
    type: 'select',
    options: ['Salaried Employment (Government)', 'Salaried Employment (Private)', 'Self-employed / Business', 'Agriculture / Farming', 'Daily Wages / Labour', 'Pension', 'No regular income'],
    required: true,
  },
  {
    id: 'annual_income',
    question: 'What is your approximate annual household income (₹)?',
    type: 'number',
    required: true,
    placeholder: 'e.g. 250000',
    helperText: 'Include income from all family members combined',
  },
  {
    id: 'purpose',
    question: 'For what purpose do you need this income certificate?',
    type: 'select',
    options: ['Scholarship / Educational purpose', 'Caste/EWS certificate', 'Bank loan', 'Government scheme / subsidy', 'Court / Legal purpose', 'Other'],
    required: true,
  },
  {
    id: 'num_family_members',
    question: 'How many members are there in your family?',
    type: 'number',
    required: true,
    placeholder: 'e.g. 4',
  },
]);

const INCOME_CERT_REQUIRED_DOCS = JSON.stringify([
  { documentType: 'AADHAAR', label: 'Aadhaar Card', mandatory: true, description: 'Identity and address proof for the applicant' },
  { documentType: 'VOTER_ID', label: 'Voter ID or Ration Card', mandatory: false, description: 'Additional address/identity proof if available', alternatives: ['OTHER'] },
  { documentType: 'OTHER', label: 'Salary Slip or Form 16 (if salaried)', mandatory: false, description: 'Required for salaried persons to verify income claims. Last 3 months salary slips.', howToObtain: 'Get from your employer / HR department' },
  { documentType: 'OTHER', label: 'Ration Card (for BPL/APL status)', mandatory: false, description: 'If you have a ration card, it helps establish family income status', howToObtain: 'Obtain from Food & Civil Supplies Department' },
]);

const INCOME_CERT_FORM_TEMPLATE = JSON.stringify([
  { fieldId: 'applicant_name', label: 'Name of the Applicant', type: 'text', section: 'Applicant Details', sourceDocument: 'AADHAAR', sourceField: 'fullName', required: true, format: 'UPPERCASE' },
  { fieldId: 'father_name', label: "Father's / Husband's Name", type: 'text', section: 'Applicant Details', sourceDocument: 'AADHAAR', sourceField: 'fatherName', required: true, format: 'UPPERCASE' },
  { fieldId: 'dob', label: 'Date of Birth', type: 'date', section: 'Applicant Details', sourceDocument: 'AADHAAR', sourceField: 'dob', required: true, format: 'DD/MM/YYYY' },
  { fieldId: 'gender', label: 'Gender', type: 'select', section: 'Applicant Details', sourceDocument: 'AADHAAR', sourceField: 'gender', required: true, options: ['MALE', 'FEMALE', 'TRANSGENDER'] },
  { fieldId: 'permanent_address', label: 'Residential Address', type: 'textarea', section: 'Address Details', sourceDocument: 'AADHAAR', sourceField: 'address', required: true },
  { fieldId: 'district', label: 'District', type: 'text', section: 'Address Details', sourceDocument: 'AADHAAR', sourceField: 'district', required: true },
  { fieldId: 'pincode', label: 'PIN Code', type: 'text', section: 'Address Details', sourceDocument: 'AADHAAR', sourceField: 'pincode', required: true },
  { fieldId: 'income_source', label: 'Source of Income', type: 'select', section: 'Income Details', followUpSource: 'income_source', required: true },
  { fieldId: 'annual_income', label: 'Annual Income (₹)', type: 'number', section: 'Income Details', followUpSource: 'annual_income', required: true },
  { fieldId: 'num_family_members', label: 'Number of Family Members', type: 'number', section: 'Income Details', followUpSource: 'num_family_members', required: true },
  { fieldId: 'purpose', label: 'Purpose of Certificate', type: 'select', section: 'Certificate Purpose', followUpSource: 'purpose', required: true },
  { fieldId: 'aadhaar_number', label: 'Aadhaar Number', type: 'text', section: 'Document Numbers', sourceDocument: 'AADHAAR', sourceField: 'aadhaarNumber', required: true },
]);

const CASTE_CERT_FOLLOW_UP = JSON.stringify([
  {
    id: 'caste_category',
    question: 'Which caste category do you belong to?',
    type: 'select',
    options: ['Scheduled Caste (SC)', 'Scheduled Tribe (ST)', 'Other Backward Class (OBC)', 'OBC — Non-Creamy Layer (OBC-NCL)', 'Economically Weaker Section (EWS)'],
    required: true,
  },
  {
    id: 'caste_name',
    question: 'What is your specific caste / sub-caste name?',
    type: 'text',
    required: true,
    placeholder: 'e.g. Yadav, Goud, Reddy, Nair, etc.',
  },
  {
    id: 'father_has_cert',
    question: "Does your father already have a caste certificate?",
    type: 'radio',
    options: ['Yes', 'No'],
    required: true,
    helperText: "If yes, your father's certificate number will speed up processing",
  },
  {
    id: 'father_cert_number',
    question: "Father's caste certificate number (if available)",
    type: 'text',
    required: false,
    dependsOn: { questionId: 'father_has_cert', value: 'Yes' },
    placeholder: 'Certificate number',
  },
  {
    id: 'purpose',
    question: 'For what purpose do you need the caste certificate?',
    type: 'select',
    options: ['Education / Admission', 'Government Job / Recruitment', 'Scholarship', 'Marriage assistance scheme', 'Land / Property matters', 'Other'],
    required: true,
  },
]);

const CASTE_CERT_REQUIRED_DOCS = JSON.stringify([
  { documentType: 'AADHAAR', label: 'Aadhaar Card', mandatory: true, description: 'Identity and address proof' },
  { documentType: 'MARKSHEET_10', label: 'Class 10 Certificate (for DOB proof)', mandatory: true, description: 'Date of birth and name proof from educational records', alternatives: ['BIRTH_CERT'] },
  { documentType: 'OTHER', label: "Father's Caste Certificate (if available)", mandatory: false, description: "A parent's caste certificate as hereditary proof. This significantly speeds up approval.", howToObtain: 'Obtain from the Revenue Department / Mandal Office where your father resides' },
  { documentType: 'OTHER', label: 'Ration Card / Family Card', mandatory: false, description: 'Helps establish family residential and social details', howToObtain: 'Get from Food & Civil Supplies Department' },
  { documentType: 'INCOME_CERT', label: 'Income Certificate (for EWS/OBC-NCL)', mandatory: false, description: 'Required for EWS and OBC-Non Creamy Layer applicants to prove income below ₹8 lakh per annum', howToObtain: 'Apply first for Income Certificate from Tahsildar' },
]);

const EDU_LOAN_FOLLOW_UP = JSON.stringify([
  {
    id: 'institution_name',
    question: 'Name of the Institution you have been admitted to',
    type: 'text',
    required: true,
    placeholder: 'e.g. IIT Hyderabad, JNTU, Osmania University',
  },
  {
    id: 'course_name',
    question: 'Course name and duration',
    type: 'text',
    required: true,
    placeholder: 'e.g. B.Tech Computer Science Engineering (4 years)',
  },
  {
    id: 'total_course_fee',
    question: 'Total course fee (₹)',
    type: 'number',
    required: true,
    placeholder: 'e.g. 500000',
    helperText: 'Total fee for the entire duration of the course',
  },
  {
    id: 'loan_amount',
    question: 'Loan amount required (₹)',
    type: 'number',
    required: true,
    placeholder: 'e.g. 400000',
    helperText: 'Amount you wish to borrow. Max: ₹20 lakh (India), ₹1.5 crore (abroad)',
  },
  {
    id: 'family_income',
    question: "Annual family income (₹)",
    type: 'number',
    required: true,
    placeholder: 'e.g. 600000',
  },
  {
    id: 'co_applicant',
    question: 'Do you have a co-applicant (parent/guardian)?',
    type: 'radio',
    options: ['Yes', 'No'],
    required: true,
    helperText: 'Co-applicant is mandatory for most education loans',
  },
  {
    id: 'co_applicant_name',
    question: "Co-applicant's full name",
    type: 'text',
    required: false,
    dependsOn: { questionId: 'co_applicant', value: 'Yes' },
  },
  {
    id: 'collateral',
    question: 'What collateral can you provide? (for loans > ₹7.5 lakh)',
    type: 'select',
    options: ['No collateral (loan ≤ ₹7.5 lakh)', 'Immovable property (land/house)', 'Fixed Deposit / NSC / LIC Policy', 'Government securities / Bank guarantee'],
    required: true,
  },
]);

const EDU_LOAN_REQUIRED_DOCS = JSON.stringify([
  { documentType: 'AADHAAR', label: 'Aadhaar Card (Applicant & Co-applicant)', mandatory: true, description: 'KYC identity and address proof for both applicant and co-applicant (parent/guardian)' },
  { documentType: 'PAN', label: 'PAN Card (Applicant & Co-applicant)', mandatory: true, description: 'PAN for both applicant and co-applicant for financial due diligence' },
  { documentType: 'MARKSHEET_10', label: 'Class 10 Marksheet', mandatory: true, description: 'Educational qualification proof — Class 10 board certificate' },
  { documentType: 'MARKSHEET_12', label: 'Class 12 Marksheet', mandatory: true, description: 'Educational qualification proof — Class 12 / Intermediate board certificate' },
  { documentType: 'DEGREE', label: 'Previous Degree Certificate (if applicable)', mandatory: false, description: 'For PG courses — graduation degree/marksheet required' },
  { documentType: 'INCOME_CERT', label: 'Income Certificate / ITR / Salary Slips', mandatory: true, description: "Co-applicant's income proof. Either Income Certificate (government employees) or last 2 years ITR and 3 months salary slips", howToObtain: 'Get salary slips from employer. ITR from Income Tax portal: incometax.gov.in' },
  { documentType: 'OTHER', label: 'Admission Letter / Fee Structure', mandatory: true, description: 'Official admission letter from the institution with fee structure / fee receipt', howToObtain: 'Obtain from your institution admission office' },
]);

const POST_MATRIC_SCHOLARSHIP_FOLLOW_UP = JSON.stringify([
  {
    id: 'category',
    question: 'Which category scholarship are you applying for?',
    type: 'select',
    options: ['SC — Scheduled Caste', 'ST — Scheduled Tribe', 'OBC — Other Backward Class', 'EBC — Economically Backward Class', 'Minority (Muslim, Christian, Buddhist, Sikh, Parsi, Jain)'],
    required: true,
  },
  {
    id: 'course_level',
    question: 'Current course level',
    type: 'select',
    options: ['Class 11 or 12 (Post-matric Class I)', 'Diploma / ITI (Post-matric Class I & II)', 'Undergraduate Degree (BA/BSc/BCom/B.Tech etc.)', 'Postgraduate Degree (MA/MSc/MTech/MBA etc.)', 'PhD / Research'],
    required: true,
  },
  {
    id: 'family_income',
    question: "Annual family income (₹) — Must be below ₹2.5 lakh for SC/ST, ₹1 lakh for OBC",
    type: 'number',
    required: true,
    placeholder: 'e.g. 150000',
  },
  {
    id: 'institution_name',
    question: 'Current institution name',
    type: 'text',
    required: true,
    placeholder: 'e.g. Government Degree College, Hyderabad',
  },
  {
    id: 'hosteller',
    question: 'Are you a hosteller or day scholar?',
    type: 'radio',
    options: ['Hosteller (living in institution hostel)', 'Day Scholar (commuting from home)'],
    required: true,
  },
]);

const POST_MATRIC_SCHOLARSHIP_REQUIRED_DOCS = JSON.stringify([
  { documentType: 'AADHAAR', label: 'Aadhaar Card', mandatory: true, description: 'Identity proof for applicant' },
  { documentType: 'CASTE_CERT', label: 'Caste Certificate (SC/ST/OBC/EBC)', mandatory: true, description: 'Current/valid caste certificate from Tahsildar. Must be in the applicant\'s name or father\'s name.' },
  { documentType: 'INCOME_CERT', label: 'Income Certificate', mandatory: true, description: 'Annual family income certificate from Tahsildar. Must show income below the threshold for your category.' },
  { documentType: 'MARKSHEET_10', label: 'Class 10 Marksheet', mandatory: true, description: 'Previous qualification proof' },
  { documentType: 'MARKSHEET_12', label: 'Class 12 / Intermediate Marksheet', mandatory: false, description: 'Previous qualification (required for UG and above)', alternatives: ['DEGREE'] },
  { documentType: 'OTHER', label: 'Bonafide Certificate from Institution', mandatory: true, description: 'Certificate from current institution proving you are enrolled as a regular student in the current academic year', howToObtain: 'Obtain from your college / institution office' },
  { documentType: 'OTHER', label: 'Fee Receipts of Current Year', mandatory: true, description: 'Fee payment receipts for the current academic year showing tuition and other fees paid', howToObtain: 'Collect from your institution accounts department' },
  { documentType: 'OTHER', label: 'Bank Account Details (Passbook/Statement)', mandatory: true, description: 'Bank account in applicant\'s own name for direct benefit transfer (DBT). Account should be linked to Aadhaar.', howToObtain: 'Open a bank account in your name. Link Aadhaar at your bank branch.' },
]);

// ─────────────────────────────────────────────────────────────────────────────
// STATE-SPECIFIC SUBMISSION INSTRUCTIONS
// ─────────────────────────────────────────────────────────────────────────────

const statePortals = {
  ANDHRA_PRADESH: {
    dl: 'https://parivahan.gov.in/parivahan/',
    income: 'https://meeseva.ap.gov.in/',
    caste: 'https://meeseva.ap.gov.in/',
    scholarship: 'https://scholarships.gov.in/',
    eduLoan: 'https://www.sbi.co.in/web/personal-banking/loans/education-loans',
    rc: 'https://parivahan.gov.in/parivahan/',
  },
  TELANGANA: {
    dl: 'https://parivahan.gov.in/parivahan/',
    income: 'https://ts.meeseva.telangana.gov.in/',
    caste: 'https://ts.meeseva.telangana.gov.in/',
    scholarship: 'https://scholarships.gov.in/',
    eduLoan: 'https://www.sbi.co.in/web/personal-banking/loans/education-loans',
    rc: 'https://parivahan.gov.in/parivahan/',
  },
  MAHARASHTRA: {
    dl: 'https://parivahan.gov.in/parivahan/',
    income: 'https://aaplesamachar.maharashtra.gov.in/',
    caste: 'https://aaplesamachar.maharashtra.gov.in/',
    scholarship: 'https://scholarships.gov.in/',
    eduLoan: 'https://www.sbi.co.in/web/personal-banking/loans/education-loans',
    rc: 'https://parivahan.gov.in/parivahan/',
  },
  TAMIL_NADU: {
    dl: 'https://parivahan.gov.in/parivahan/',
    income: 'https://www.tnedistrict.tn.gov.in/',
    caste: 'https://www.tnedistrict.tn.gov.in/',
    scholarship: 'https://scholarships.gov.in/',
    eduLoan: 'https://www.sbi.co.in/web/personal-banking/loans/education-loans',
    rc: 'https://parivahan.gov.in/parivahan/',
  },
  KARNATAKA: {
    dl: 'https://parivahan.gov.in/parivahan/',
    income: 'https://nadakacheri.karnataka.gov.in/',
    caste: 'https://nadakacheri.karnataka.gov.in/',
    scholarship: 'https://scholarships.gov.in/',
    eduLoan: 'https://www.sbi.co.in/web/personal-banking/loans/education-loans',
    rc: 'https://parivahan.gov.in/parivahan/',
  },
  KERALA: {
    dl: 'https://parivahan.gov.in/parivahan/',
    income: 'https://revenue.kerala.gov.in/',
    caste: 'https://revenue.kerala.gov.in/',
    scholarship: 'https://scholarships.gov.in/',
    eduLoan: 'https://www.sbi.co.in/web/personal-banking/loans/education-loans',
    rc: 'https://parivahan.gov.in/parivahan/',
  },
  UTTAR_PRADESH: {
    dl: 'https://parivahan.gov.in/parivahan/',
    income: 'https://edistrict.up.gov.in/',
    caste: 'https://edistrict.up.gov.in/',
    scholarship: 'https://scholarships.gov.in/',
    eduLoan: 'https://www.sbi.co.in/web/personal-banking/loans/education-loans',
    rc: 'https://parivahan.gov.in/parivahan/',
  },
  DELHI: {
    dl: 'https://parivahan.gov.in/parivahan/',
    income: 'https://edistrict.delhigovt.nic.in/',
    caste: 'https://edistrict.delhigovt.nic.in/',
    scholarship: 'https://scholarships.gov.in/',
    eduLoan: 'https://www.sbi.co.in/web/personal-banking/loans/education-loans',
    rc: 'https://parivahan.gov.in/parivahan/',
  },
};

const dlLearnerInstructions = (state: string) => JSON.stringify({
  online: 'Apply online at Parivahan Sarathi portal (sarathi.parivahan.gov.in). Select your state, fill the application form, upload documents, pay fees online, and book your slot for LL test at the RTO.',
  offline: 'Visit your nearest RTO with all original documents and 3 passport-size photographs. Collect Form 2 from the RTO, fill it, and submit along with the required fees.',
  officeAddress: `Your nearest Regional Transport Office (RTO) in ${state.replace(/_/g, ' ')}`,
  portalSteps: [
    'Visit sarathi.parivahan.gov.in',
    'Select your state',
    'Click "Learner\'s License" under "Apply Online"',
    'Fill personal and address details',
    'Upload scanned documents',
    'Pay fee of ₹200 online',
    'Book your LL test slot at the RTO',
    'Visit RTO on scheduled date for biometric and test',
    'Receive LL within 30 minutes if test passed',
  ],
  documentsToCarry: ['Aadhaar original + photocopy', 'DOB proof original + photocopy', 'Medical certificate (Form 1A)', 'Passport size photographs (3 copies)', 'Fee payment receipt', 'Filled application form (Form 2)'],
});

const incomeCertInstructions = (state: string, portal: string) => JSON.stringify({
  online: `Apply online at ${portal}. Create an account, select "Income Certificate" from services, fill the form, upload Aadhaar and supporting documents, pay nominal fee (₹10–₹50), and track status.`,
  offline: 'Visit your nearest Mandal Revenue Office / Tahsildar office. Collect the application form (usually free), fill it, attach photocopies of documents, and submit. Collect certificate in 7–15 working days.',
  officeAddress: 'Your nearest Mandal Revenue Office (MRO) / Tahsildar Office',
  portalSteps: [
    `Visit ${portal}`,
    'Register / Login with Aadhaar or mobile number',
    'Select "Income Certificate" from citizen services',
    'Fill applicant and income details',
    'Upload Aadhaar and supporting documents',
    'Pay nominal fee (₹10–₹50)',
    'Note the application reference number',
    'Track status online',
    'Download certificate once approved (7–15 days)',
  ],
  documentsToCarry: ['Aadhaar original + photocopy', 'Ration card (if available)', 'Salary slips / bank passbook (if employed)', 'Filled application form'],
});

const casteCertInstructions = (state: string, portal: string) => JSON.stringify({
  online: `Apply online at ${portal}. Select "Caste Certificate", fill details, upload Aadhaar, DOB proof, and father's caste certificate (if available). Submit and track.`,
  offline: 'Visit your nearest Mandal/Tehsil Revenue Office. Collect and fill Form I (application for caste certificate). Submit with documents. Processing may take 15–30 days with field verification.',
  officeAddress: 'Mandal Revenue Office (MRO) / Sub-Collector\'s Office / District Collector\'s Office',
  portalSteps: [
    `Visit ${portal}`,
    'Login with Aadhaar-linked mobile OTP',
    'Select "Caste Certificate"',
    'Fill caste, sub-caste, and personal details',
    'Upload supporting documents',
    'Submit application and note reference number',
    'Field verification by Revenue Inspector may occur',
    'Approved certificate downloadable within 15–30 days',
  ],
  documentsToCarry: ["Aadhaar original + photocopy", "DOB proof (Class 10 or birth certificate)", "Father's caste certificate (if available)", "Ration card / family card", "Filled application form"],
});

// ─────────────────────────────────────────────────────────────────────────────
// BUILD ALL TEMPLATES
// ─────────────────────────────────────────────────────────────────────────────

const STATES = ['ANDHRA_PRADESH', 'TELANGANA', 'MAHARASHTRA', 'TAMIL_NADU', 'KARNATAKA', 'KERALA', 'UTTAR_PRADESH', 'DELHI'];

function buildTemplates() {
  const templates = [];

  for (const state of STATES) {
    const portals = statePortals[state as keyof typeof statePortals];

    // ── DL LEARNER'S PERMIT ──
    templates.push({
      state,
      category: 'TRANSPORT_LICENSING',
      applicationType: 'DL_LEARNERS_PERMIT',
      displayName: "Driving License — Learner's Permit (New)",
      description: `Apply for a new Learner's License in ${state.replace(/_/g, ' ')}. The LL is valid for 6 months and allows you to practice driving under supervision before obtaining a permanent DL.`,
      requiredDocuments: DL_LEARNERS_REQUIRED_DOCS,
      eligibilityCriteria: JSON.stringify([
        { criterion: 'Minimum age 16 years for two-wheeler without gear (MCWOG)', field: 'age', condition: '>=', value: 16 },
        { criterion: 'Minimum age 18 years for all other vehicle types', field: 'age', condition: '>=', value: 18 },
        { criterion: 'Must be medically fit to drive', field: 'medicalFitness', condition: '==', value: true },
      ]),
      followUpQuestions: DL_LEARNERS_FOLLOW_UP_QUESTIONS,
      formTemplate: DL_LEARNERS_FORM_TEMPLATE,
      officialPortalUrl: portals.dl,
      fees: '₹200 for Learner\'s License + ₹50 for smart card fee (payable online at Parivahan portal)',
      processingTime: 'Same day to 7 working days (instant if passed LL test at RTO)',
      submissionInstructions: dlLearnerInstructions(state),
    });

    // ── DL PERMANENT ──
    templates.push({
      state,
      category: 'TRANSPORT_LICENSING',
      applicationType: 'DL_PERMANENT',
      displayName: 'Driving License — Permanent (New)',
      description: `Apply for a permanent driving license in ${state.replace(/_/g, ' ')} after 30+ days of holding a valid Learner's License. Must pass the driving test at the RTO.`,
      requiredDocuments: JSON.stringify([
        { documentType: 'AADHAAR', label: 'Aadhaar Card', mandatory: true, description: 'Identity and address proof' },
        { documentType: 'DL', label: "Valid Learner's License (30+ days old)", mandatory: true, description: 'Your existing Learner\'s License must be at least 30 days old but not expired', howToObtain: 'Apply for Learner\'s License first through FormShield' },
        { documentType: 'MEDICAL_CERT', label: 'Medical Fitness Certificate (Form 1A)', mandatory: true, description: 'From a registered medical practitioner' },
        { documentType: 'OTHER', label: 'Passport Size Photographs (3 copies)', mandatory: true, description: 'Recent passport size color photographs' },
      ]),
      eligibilityCriteria: JSON.stringify([
        { criterion: 'Must hold a valid Learner\'s License for at least 30 days', field: 'llAge', condition: '>=', value: 30 },
        { criterion: 'Must pass the driving test at RTO', field: 'drivingTest', condition: '==', value: true },
        { criterion: 'Minimum age 18 years', field: 'age', condition: '>=', value: 18 },
      ]),
      followUpQuestions: DL_LEARNERS_FOLLOW_UP_QUESTIONS,
      formTemplate: DL_LEARNERS_FORM_TEMPLATE,
      officialPortalUrl: portals.dl,
      fees: '₹700 for Permanent DL (LMV + two-wheeler) + ₹200 driving test fee',
      processingTime: '7–30 working days after passing driving test',
      submissionInstructions: JSON.stringify({
        online: 'Apply at sarathi.parivahan.gov.in for driving test appointment after 30 days of LL issuance',
        offline: 'Visit RTO with LL, documents, and fee payment receipt on the scheduled test date',
        documentsToCarry: ['Learner\'s License original', 'Aadhaar original + photocopy', 'Medical certificate', '3 passport size photos', 'Fee payment receipt'],
      }),
    });

    // ── DL RENEWAL ──
    templates.push({
      state,
      category: 'TRANSPORT_LICENSING',
      applicationType: 'DL_RENEWAL',
      displayName: 'Driving License — Renewal',
      description: `Renew your existing driving license in ${state.replace(/_/g, ' ')}. Apply up to 1 year before expiry or within 1 year after expiry without penalty.`,
      requiredDocuments: JSON.stringify([
        { documentType: 'AADHAAR', label: 'Aadhaar Card', mandatory: true, description: 'Identity and current address proof' },
        { documentType: 'DL', label: 'Existing Driving License (to be renewed)', mandatory: true, description: 'Your current/expired driving license' },
        { documentType: 'MEDICAL_CERT', label: 'Medical Fitness Certificate (Form 1A)', mandatory: true, description: 'Required for LMV renewal. Mandatory for age 40+.' },
        { documentType: 'OTHER', label: 'Passport Size Photographs (3 copies)', mandatory: true, description: 'Recent passport size color photographs' },
      ]),
      eligibilityCriteria: JSON.stringify([
        { criterion: 'License must be within 1 year of expiry or expired for less than 5 years', field: 'dlExpiry', condition: '==', value: 'valid_range' },
      ]),
      followUpQuestions: JSON.stringify([
        { id: 'dl_number', question: 'Your current Driving License number', type: 'text', required: true, placeholder: 'e.g. AP09-1234567890' },
        { id: 'dl_expiry', question: 'Expiry date of your current DL', type: 'date', required: true },
        { id: 'vehicle_class', question: 'Vehicle class on your existing DL', type: 'select', options: ['MCWOG', 'MCW', 'LMV', 'LMV + MCW', 'HMV', 'Transport Vehicle'], required: true },
        { id: 'blood_group', question: 'Blood group', type: 'select', options: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], required: true },
      ]),
      formTemplate: DL_LEARNERS_FORM_TEMPLATE,
      officialPortalUrl: portals.dl,
      fees: '₹250 for renewal + ₹50 for smart card',
      processingTime: '7–15 working days',
      submissionInstructions: JSON.stringify({
        online: 'Apply at sarathi.parivahan.gov.in → "Renewal of DL". Submit documents online and visit RTO for biometrics.',
        offline: 'Visit RTO with existing DL and all documents',
      }),
    });

    // ── INCOME CERTIFICATE ──
    templates.push({
      state,
      category: 'CERTIFICATES_DOCUMENTS',
      applicationType: 'INCOME_CERTIFICATE',
      displayName: 'Income Certificate',
      description: `Apply for an official annual income certificate from the ${state.replace(/_/g, ' ')} government. Issued by the Tahsildar/MRO, required for scholarships, government schemes, and bank loans.`,
      requiredDocuments: INCOME_CERT_REQUIRED_DOCS,
      eligibilityCriteria: JSON.stringify([
        { criterion: 'Applicant must be a resident of the state', field: 'residence', condition: '==', value: state },
      ]),
      followUpQuestions: INCOME_CERT_FOLLOW_UP,
      formTemplate: INCOME_CERT_FORM_TEMPLATE,
      officialPortalUrl: portals.income,
      fees: '₹10–₹50 (nominal service charge for online applications)',
      processingTime: '7–15 working days',
      submissionInstructions: incomeCertInstructions(state, portals.income),
    });

    // ── CASTE CERTIFICATE ──
    templates.push({
      state,
      category: 'CERTIFICATES_DOCUMENTS',
      applicationType: 'CASTE_CERTIFICATE',
      displayName: 'Caste Certificate (SC/ST/OBC)',
      description: `Apply for a caste certificate (SC/ST/OBC/EWS) in ${state.replace(/_/g, ' ')}. Required for government job reservations, educational admissions, scholarships, and welfare schemes.`,
      requiredDocuments: CASTE_CERT_REQUIRED_DOCS,
      eligibilityCriteria: JSON.stringify([
        { criterion: 'Applicant must belong to SC, ST, OBC, or EWS category as notified by the Government of India and the state government', field: 'caste', condition: 'exists', value: true },
        { criterion: 'Must be a resident of the state', field: 'residence', condition: '==', value: state },
      ]),
      followUpQuestions: CASTE_CERT_FOLLOW_UP,
      formTemplate: JSON.stringify([
        { fieldId: 'applicant_name', label: 'Full Name', type: 'text', section: 'Personal Details', sourceDocument: 'AADHAAR', sourceField: 'fullName', required: true, format: 'UPPERCASE' },
        { fieldId: 'father_name', label: "Father's Name", type: 'text', section: 'Personal Details', sourceDocument: 'AADHAAR', sourceField: 'fatherName', required: true, format: 'UPPERCASE' },
        { fieldId: 'dob', label: 'Date of Birth', type: 'date', section: 'Personal Details', sourceDocument: 'AADHAAR', sourceField: 'dob', required: true, format: 'DD/MM/YYYY' },
        { fieldId: 'gender', label: 'Gender', type: 'select', section: 'Personal Details', sourceDocument: 'AADHAAR', sourceField: 'gender', required: true },
        { fieldId: 'caste_category', label: 'Caste Category', type: 'select', section: 'Caste Details', followUpSource: 'caste_category', required: true },
        { fieldId: 'caste_name', label: 'Caste / Sub-caste Name', type: 'text', section: 'Caste Details', followUpSource: 'caste_name', required: true },
        { fieldId: 'purpose', label: 'Purpose', type: 'select', section: 'Purpose', followUpSource: 'purpose', required: true },
        { fieldId: 'permanent_address', label: 'Residential Address', type: 'textarea', section: 'Address', sourceDocument: 'AADHAAR', sourceField: 'address', required: true },
        { fieldId: 'district', label: 'District', type: 'text', section: 'Address', sourceDocument: 'AADHAAR', sourceField: 'district', required: true },
        { fieldId: 'pincode', label: 'PIN Code', type: 'text', section: 'Address', sourceDocument: 'AADHAAR', sourceField: 'pincode', required: true },
        { fieldId: 'aadhaar_number', label: 'Aadhaar Number', type: 'text', section: 'Document Numbers', sourceDocument: 'AADHAAR', sourceField: 'aadhaarNumber', required: true },
      ]),
      officialPortalUrl: portals.caste,
      fees: '₹10–₹30 (nominal service charge)',
      processingTime: '15–30 working days (field verification required)',
      submissionInstructions: casteCertInstructions(state, portals.caste),
    });

    // ── EDUCATION LOAN ──
    templates.push({
      state,
      category: 'LOANS_FINANCE',
      applicationType: 'EDUCATION_LOAN',
      displayName: 'Education Loan — SBI / PNB Format',
      description: `Apply for an education loan in ${state.replace(/_/g, ' ')} following the standard SBI/PNB format. Covers courses in India and abroad. Up to ₹20 lakh without collateral, higher amounts with collateral.`,
      requiredDocuments: EDU_LOAN_REQUIRED_DOCS,
      eligibilityCriteria: JSON.stringify([
        { criterion: 'Must be an Indian citizen', field: 'citizenship', condition: '==', value: 'Indian' },
        { criterion: 'Must have secured admission in a recognized institution', field: 'admission', condition: '==', value: true },
        { criterion: 'Course must be recognized by AICTE/UGC/MCI or equivalent', field: 'courseRecognition', condition: '==', value: true },
      ]),
      followUpQuestions: EDU_LOAN_FOLLOW_UP,
      formTemplate: JSON.stringify([
        { fieldId: 'applicant_name', label: 'Student Name (Borrower)', type: 'text', section: 'Student Details', sourceDocument: 'AADHAAR', sourceField: 'fullName', required: true, format: 'UPPERCASE' },
        { fieldId: 'dob', label: 'Date of Birth', type: 'date', section: 'Student Details', sourceDocument: 'AADHAAR', sourceField: 'dob', required: true },
        { fieldId: 'gender', label: 'Gender', type: 'select', section: 'Student Details', sourceDocument: 'AADHAAR', sourceField: 'gender', required: true },
        { fieldId: 'aadhaar_number', label: 'Aadhaar Number', type: 'text', section: 'Student Details', sourceDocument: 'AADHAAR', sourceField: 'aadhaarNumber', required: true },
        { fieldId: 'pan_number', label: 'PAN Number', type: 'text', section: 'Student Details', sourceDocument: 'PAN', sourceField: 'panNumber', required: true },
        { fieldId: 'permanent_address', label: 'Permanent Address', type: 'textarea', section: 'Address', sourceDocument: 'AADHAAR', sourceField: 'address', required: true },
        { fieldId: 'institution_name', label: 'Name of Institution', type: 'text', section: 'Course Details', followUpSource: 'institution_name', required: true },
        { fieldId: 'course_name', label: 'Course Name and Duration', type: 'text', section: 'Course Details', followUpSource: 'course_name', required: true },
        { fieldId: 'total_course_fee', label: 'Total Course Fee (₹)', type: 'number', section: 'Loan Details', followUpSource: 'total_course_fee', required: true },
        { fieldId: 'loan_amount', label: 'Loan Amount Required (₹)', type: 'number', section: 'Loan Details', followUpSource: 'loan_amount', required: true },
        { fieldId: 'family_income', label: "Annual Family Income (₹)", type: 'number', section: 'Income Details', followUpSource: 'family_income', required: true },
        { fieldId: 'co_applicant_name', label: "Co-applicant Name", type: 'text', section: 'Co-applicant Details', followUpSource: 'co_applicant_name', required: false },
        { fieldId: 'collateral', label: 'Collateral Security (if any)', type: 'select', section: 'Loan Details', followUpSource: 'collateral', required: true },
        { fieldId: 'father_name', label: "Father's Name", type: 'text', section: 'Student Details', sourceDocument: 'AADHAAR', sourceField: 'fatherName', required: true },
      ]),
      officialPortalUrl: portals.eduLoan,
      fees: 'No application fee. Interest rate: 8.15%–11.15% p.a. (varies by bank and loan amount)',
      processingTime: '15–30 working days after document submission and verification',
      submissionInstructions: JSON.stringify({
        online: 'Apply online at SBI website (sbi.co.in) or visit SBI branch. Also available at PNB, Bank of Baroda, and other nationalised banks.',
        offline: 'Visit your nearest SBI/PNB branch with all documents. Fill the education loan application form at the branch.',
        portalSteps: [
          'Visit sbi.co.in or your preferred bank\'s website',
          'Navigate to "Loans" → "Education Loans"',
          'Click "Apply Now" or "Online Application"',
          'Fill student and co-applicant details',
          'Upload all required documents',
          'Submit and note application reference number',
          'Bank representative will contact you for verification',
          'Loan sanctioned after institution and document verification',
        ],
        documentsToCarry: ['Aadhaar (applicant + co-applicant)', 'PAN (applicant + co-applicant)', 'Admission letter + fee structure', 'Marksheets (Class 10, 12, Graduation if applicable)', 'Income proof of co-applicant', 'Collateral documents (if loan > ₹7.5 lakh)', '6-month bank statements (co-applicant)'],
      }),
    });

    // ── POST MATRIC SCHOLARSHIP ──
    templates.push({
      state,
      category: 'EDUCATION_SCHOLARSHIPS',
      applicationType: 'POST_MATRIC_SCHOLARSHIP',
      displayName: 'Post-Matric Scholarship (State + NSP)',
      description: `Apply for state government and National Scholarship Portal (NSP) Post-Matric Scholarship for ${state.replace(/_/g, ' ')} students from SC/ST/OBC/EBC/Minority categories pursuing education beyond Class 10.`,
      requiredDocuments: POST_MATRIC_SCHOLARSHIP_REQUIRED_DOCS,
      eligibilityCriteria: JSON.stringify([
        { criterion: 'Must belong to SC/ST/OBC/EBC/Minority community with valid certificate', field: 'caste', condition: 'exists', value: true },
        { criterion: 'Annual family income must be within category limits (SC/ST: ₹2.5L, OBC: ₹1L)', field: 'income', condition: '<=', value: 250000 },
        { criterion: 'Must be enrolled in a recognized institution for post-matric course', field: 'enrollment', condition: '==', value: true },
        { criterion: 'Must not be availing any other similar scholarship', field: 'otherScholarship', condition: '==', value: false },
      ]),
      followUpQuestions: POST_MATRIC_SCHOLARSHIP_FOLLOW_UP,
      formTemplate: JSON.stringify([
        { fieldId: 'applicant_name', label: 'Student Name', type: 'text', section: 'Student Information', sourceDocument: 'AADHAAR', sourceField: 'fullName', required: true, format: 'UPPERCASE' },
        { fieldId: 'dob', label: 'Date of Birth', type: 'date', section: 'Student Information', sourceDocument: 'AADHAAR', sourceField: 'dob', required: true },
        { fieldId: 'gender', label: 'Gender', type: 'select', section: 'Student Information', sourceDocument: 'AADHAAR', sourceField: 'gender', required: true },
        { fieldId: 'father_name', label: "Father's Name", type: 'text', section: 'Student Information', sourceDocument: 'AADHAAR', sourceField: 'fatherName', required: true },
        { fieldId: 'aadhaar_number', label: 'Aadhaar Number', type: 'text', section: 'Student Information', sourceDocument: 'AADHAAR', sourceField: 'aadhaarNumber', required: true },
        { fieldId: 'caste_category', label: 'Category (SC/ST/OBC/EBC)', type: 'select', section: 'Category Details', followUpSource: 'category', required: true },
        { fieldId: 'caste_cert_number', label: 'Caste Certificate Number', type: 'text', section: 'Category Details', sourceDocument: 'CASTE_CERT', sourceField: 'certificateNumber', required: true },
        { fieldId: 'family_income', label: "Annual Family Income (₹)", type: 'number', section: 'Income Details', followUpSource: 'family_income', required: true },
        { fieldId: 'income_cert_number', label: 'Income Certificate Number', type: 'text', section: 'Income Details', sourceDocument: 'INCOME_CERT', sourceField: 'certificateNumber', required: true },
        { fieldId: 'institution_name', label: 'Current Institution Name', type: 'text', section: 'Course Details', followUpSource: 'institution_name', required: true },
        { fieldId: 'course_level', label: 'Course Level', type: 'select', section: 'Course Details', followUpSource: 'course_level', required: true },
        { fieldId: 'hosteller', label: 'Hosteller / Day Scholar', type: 'radio', section: 'Course Details', followUpSource: 'hosteller', required: true },
        { fieldId: 'permanent_address', label: 'Permanent Address', type: 'textarea', section: 'Address', sourceDocument: 'AADHAAR', sourceField: 'address', required: true },
        { fieldId: 'pincode', label: 'PIN Code', type: 'text', section: 'Address', sourceDocument: 'AADHAAR', sourceField: 'pincode', required: true },
      ]),
      officialPortalUrl: portals.scholarship,
      fees: 'No application fee. Scholarship amount varies by course level and category.',
      processingTime: '30–60 days. Applications usually open from August to November each year.',
      submissionInstructions: JSON.stringify({
        online: 'Apply at National Scholarship Portal: scholarships.gov.in. Register with your mobile and Aadhaar, fill the application, upload documents, and submit before the deadline.',
        offline: 'Apply through your institution. Submit documents to the Scholarship Section at your college/school.',
        portalSteps: [
          'Visit scholarships.gov.in',
          'Click "New Registration" as a student',
          'Register with Aadhaar and mobile number',
          'Login and select "Post Matric Scholarship" for your state',
          'Fill the application with personal and academic details',
          'Enter bank account details (Aadhaar-linked)',
          'Upload caste certificate, income certificate, bonafide certificate, fee receipt',
          'Submit and note the application ID',
          'Your institution will verify the application',
          'Scholarship disbursed via DBT to your bank account',
        ],
        documentsToCarry: ['Aadhaar', 'Caste certificate', 'Income certificate', 'Previous marksheets', 'Bonafide from institution', 'Fee receipts', 'Bank passbook (Aadhaar-linked)'],
      }),
    });

    // ── DOMICILE CERTIFICATE ──
    templates.push({
      state,
      category: 'CERTIFICATES_DOCUMENTS',
      applicationType: 'DOMICILE_CERTIFICATE',
      displayName: 'Domicile / Residence Certificate',
      description: `Apply for a domicile certificate in ${state.replace(/_/g, ' ')} to prove permanent residence. Required for state government jobs, educational admissions under state quota, and welfare schemes.`,
      requiredDocuments: JSON.stringify([
        { documentType: 'AADHAAR', label: 'Aadhaar Card', mandatory: true, description: 'Address proof showing current state address' },
        { documentType: 'VOTER_ID', label: 'Voter ID Card (EPIC)', mandatory: false, description: 'Additional address/residence proof', alternatives: ['OTHER'] },
        { documentType: 'OTHER', label: 'Ration Card', mandatory: false, description: 'Family ration card showing state address', howToObtain: 'Get from Food & Civil Supplies Department' },
        { documentType: 'OTHER', label: 'Property Tax Receipt / Electricity Bill', mandatory: false, description: 'Utility bills showing state residence for 3+ years', howToObtain: 'Obtain from DISCOM or municipality office' },
      ]),
      eligibilityCriteria: JSON.stringify([
        { criterion: `Must have resided in ${state.replace(/_/g, ' ')} for a continuous period of 3 years or more`, field: 'residenceDuration', condition: '>=', value: 3 },
      ]),
      followUpQuestions: JSON.stringify([
        { id: 'years_of_residence', question: 'How many years have you been residing in this state?', type: 'number', required: true, placeholder: 'e.g. 15' },
        { id: 'purpose', question: 'Purpose of domicile certificate', type: 'select', options: ['Government job / Public service', 'Educational admission (state quota)', 'Welfare schemes / benefits', 'Passport application', 'Other'], required: true },
        { id: 'birth_place', question: 'Were you born in this state?', type: 'radio', options: ['Yes', 'No'], required: true },
      ]),
      formTemplate: JSON.stringify([
        { fieldId: 'applicant_name', label: 'Full Name', type: 'text', section: 'Personal Details', sourceDocument: 'AADHAAR', sourceField: 'fullName', required: true, format: 'UPPERCASE' },
        { fieldId: 'father_name', label: "Father's Name", type: 'text', section: 'Personal Details', sourceDocument: 'AADHAAR', sourceField: 'fatherName', required: true },
        { fieldId: 'dob', label: 'Date of Birth', type: 'date', section: 'Personal Details', sourceDocument: 'AADHAAR', sourceField: 'dob', required: true },
        { fieldId: 'permanent_address', label: 'Permanent Address in State', type: 'textarea', section: 'Address', sourceDocument: 'AADHAAR', sourceField: 'address', required: true },
        { fieldId: 'district', label: 'District', type: 'text', section: 'Address', sourceDocument: 'AADHAAR', sourceField: 'district', required: true },
        { fieldId: 'pincode', label: 'PIN Code', type: 'text', section: 'Address', sourceDocument: 'AADHAAR', sourceField: 'pincode', required: true },
        { fieldId: 'years_of_residence', label: 'Years of Residence in State', type: 'number', section: 'Residence Details', followUpSource: 'years_of_residence', required: true },
        { fieldId: 'purpose', label: 'Purpose', type: 'select', section: 'Purpose', followUpSource: 'purpose', required: true },
        { fieldId: 'aadhaar_number', label: 'Aadhaar Number', type: 'text', section: 'Document Numbers', sourceDocument: 'AADHAAR', sourceField: 'aadhaarNumber', required: true },
      ]),
      officialPortalUrl: portals.income,
      fees: '₹10–₹30',
      processingTime: '7–21 working days',
      submissionInstructions: JSON.stringify({
        online: `Apply at ${portals.income} or your state's e-district portal. Select Domicile/Residence Certificate service.`,
        offline: 'Visit Mandal Revenue Office or Tehsil office with all documents.',
      }),
    });

    // ── PM MUDRA LOAN ──
    templates.push({
      state,
      category: 'LOANS_FINANCE',
      applicationType: 'PM_MUDRA_LOAN',
      displayName: 'PM Mudra Loan (PMMY) Application',
      description: `Apply for PM Mudra Yojana loan in ${state.replace(/_/g, ' ')} for micro and small business financing. Three categories: Shishu (up to ₹50,000), Kishor (₹50,001–₹5 lakh), Tarun (₹5 lakh–₹10 lakh).`,
      requiredDocuments: JSON.stringify([
        { documentType: 'AADHAAR', label: 'Aadhaar Card', mandatory: true, description: 'KYC identity proof' },
        { documentType: 'PAN', label: 'PAN Card', mandatory: true, description: 'Required for financial due diligence' },
        { documentType: 'OTHER', label: 'Business Proof / Registration', mandatory: true, description: 'Udyam Registration, shop license, or business existence proof', howToObtain: 'Register at udyamregistration.gov.in (free) or get shop license from municipality' },
        { documentType: 'OTHER', label: 'Bank Statement (6 months)', mandatory: true, description: 'Last 6 months bank account statement', howToObtain: 'Get from your bank or download from net banking' },
        { documentType: 'OTHER', label: 'Passport Size Photographs (2 copies)', mandatory: true, description: 'Recent passport size photographs' },
        { documentType: 'CASTE_CERT', label: 'Caste Certificate (SC/ST/OBC)', mandatory: false, description: 'For priority lending and preferential interest rates' },
      ]),
      eligibilityCriteria: JSON.stringify([
        { criterion: 'Must be an Indian citizen', field: 'citizenship', condition: '==', value: 'Indian' },
        { criterion: 'Non-farm business / enterprise / income-generating activity', field: 'businessType', condition: '==', value: 'non-farm' },
        { criterion: 'No existing default with any financial institution', field: 'creditDefault', condition: '==', value: false },
      ]),
      followUpQuestions: JSON.stringify([
        { id: 'mudra_category', question: 'Which Mudra loan category do you need?', type: 'select', options: ['Shishu — up to ₹50,000 (new business / startup)', 'Kishor — ₹50,001 to ₹5 lakh (existing business, expansion)', 'Tarun — ₹5 lakh to ₹10 lakh (well-established business)'], required: true },
        { id: 'business_type', question: 'Nature of your business / enterprise', type: 'text', required: true, placeholder: 'e.g. Tailoring shop, Mobile repair, Food stall, Auto rickshaw' },
        { id: 'loan_amount', question: 'Loan amount required (₹)', type: 'number', required: true, placeholder: 'e.g. 200000' },
        { id: 'years_in_business', question: 'How many years has your business been operational?', type: 'number', required: false, placeholder: 'e.g. 3' },
      ]),
      formTemplate: JSON.stringify([
        { fieldId: 'applicant_name', label: 'Name of Applicant', type: 'text', section: 'Applicant Details', sourceDocument: 'AADHAAR', sourceField: 'fullName', required: true, format: 'UPPERCASE' },
        { fieldId: 'dob', label: 'Date of Birth', type: 'date', section: 'Applicant Details', sourceDocument: 'AADHAAR', sourceField: 'dob', required: true },
        { fieldId: 'gender', label: 'Gender', type: 'select', section: 'Applicant Details', sourceDocument: 'AADHAAR', sourceField: 'gender', required: true },
        { fieldId: 'aadhaar_number', label: 'Aadhaar Number', type: 'text', section: 'Applicant Details', sourceDocument: 'AADHAAR', sourceField: 'aadhaarNumber', required: true },
        { fieldId: 'pan_number', label: 'PAN Number', type: 'text', section: 'Applicant Details', sourceDocument: 'PAN', sourceField: 'panNumber', required: true },
        { fieldId: 'permanent_address', label: 'Permanent Address', type: 'textarea', section: 'Address', sourceDocument: 'AADHAAR', sourceField: 'address', required: true },
        { fieldId: 'mudra_category', label: 'Mudra Category', type: 'select', section: 'Loan Details', followUpSource: 'mudra_category', required: true },
        { fieldId: 'business_type', label: 'Business Activity', type: 'text', section: 'Business Details', followUpSource: 'business_type', required: true },
        { fieldId: 'loan_amount', label: 'Loan Amount (₹)', type: 'number', section: 'Loan Details', followUpSource: 'loan_amount', required: true },
      ]),
      officialPortalUrl: 'https://www.mudra.org.in/',
      fees: 'No application fee. Processing fee: Nil for Shishu, 0.50% for Kishor/Tarun',
      processingTime: '7–15 working days at bank',
      submissionInstructions: JSON.stringify({
        online: 'Apply at mudra.org.in or via your bank\'s net banking portal. Also available on Jan Samarth portal: jansamarth.in',
        offline: 'Visit any public sector bank, regional rural bank, or microfinance institution',
      }),
    });

    // ── CENTRAL SECTOR SCHOLARSHIP ──
    templates.push({
      state,
      category: 'EDUCATION_SCHOLARSHIPS',
      applicationType: 'CENTRAL_SECTOR_SCHOLARSHIP',
      displayName: 'Central Sector Scholarship (NSP — Merit-based)',
      description: `Apply for the Central Sector Scheme of Scholarships for College and University Students. Merit-based scholarship from Ministry of Education for students scoring above 80th percentile in Class 12.`,
      requiredDocuments: JSON.stringify([
        { documentType: 'AADHAAR', label: 'Aadhaar Card', mandatory: true, description: 'Identity and DBT bank linkage' },
        { documentType: 'MARKSHEET_12', label: 'Class 12 Marksheet', mandatory: true, description: 'Must show marks above 80th percentile in the respective board exam' },
        { documentType: 'INCOME_CERT', label: 'Income Certificate', mandatory: true, description: 'Annual family income must be below ₹8 lakh per annum', howToObtain: 'Get from Tahsildar' },
        { documentType: 'OTHER', label: 'Bonafide Certificate from College/University', mandatory: true, description: 'Proof of regular enrollment in current academic year', howToObtain: 'Obtain from college admin office' },
        { documentType: 'OTHER', label: 'Bank Passbook (Aadhaar-linked)', mandatory: true, description: 'Bank account in student\'s own name, linked to Aadhaar for DBT' },
      ]),
      eligibilityCriteria: JSON.stringify([
        { criterion: 'Must have scored above 80th percentile in Class 12 board exam', field: 'class12Percentile', condition: '>=', value: 80 },
        { criterion: 'Annual family income must be below ₹8 lakh per annum', field: 'familyIncome', condition: '<=', value: 800000 },
        { criterion: 'Must be pursuing regular course in college/university (not distance/correspondence)', field: 'enrollmentType', condition: '==', value: 'regular' },
        { criterion: 'Not availing any other central government scholarship', field: 'otherScholarship', condition: '==', value: false },
      ]),
      followUpQuestions: JSON.stringify([
        { id: 'class12_marks', question: 'Class 12 percentage / marks obtained', type: 'number', required: true, placeholder: 'e.g. 88.5' },
        { id: 'family_income', question: "Annual family income (₹) — must be below ₹8 lakh", type: 'number', required: true, placeholder: 'e.g. 500000' },
        { id: 'institution_name', question: 'Current college/university name', type: 'text', required: true },
        { id: 'course_name', question: 'Current course name', type: 'text', required: true, placeholder: 'e.g. B.Sc Mathematics Honours' },
        { id: 'year_of_study', question: 'Current year of study', type: 'select', options: ['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year'], required: true },
      ]),
      formTemplate: JSON.stringify([
        { fieldId: 'applicant_name', label: 'Student Name', type: 'text', section: 'Student Information', sourceDocument: 'AADHAAR', sourceField: 'fullName', required: true, format: 'UPPERCASE' },
        { fieldId: 'dob', label: 'Date of Birth', type: 'date', section: 'Student Information', sourceDocument: 'AADHAAR', sourceField: 'dob', required: true },
        { fieldId: 'aadhaar_number', label: 'Aadhaar Number', type: 'text', section: 'Student Information', sourceDocument: 'AADHAAR', sourceField: 'aadhaarNumber', required: true },
        { fieldId: 'father_name', label: "Father's Name", type: 'text', section: 'Student Information', sourceDocument: 'AADHAAR', sourceField: 'fatherName', required: true },
        { fieldId: 'class12_marks', label: 'Class 12 Percentage', type: 'number', section: 'Academic Details', followUpSource: 'class12_marks', required: true },
        { fieldId: 'family_income', label: "Annual Family Income (₹)", type: 'number', section: 'Income Details', followUpSource: 'family_income', required: true },
        { fieldId: 'institution_name', label: 'College / University Name', type: 'text', section: 'Course Details', followUpSource: 'institution_name', required: true },
        { fieldId: 'course_name', label: 'Course Name', type: 'text', section: 'Course Details', followUpSource: 'course_name', required: true },
        { fieldId: 'year_of_study', label: 'Year of Study', type: 'select', section: 'Course Details', followUpSource: 'year_of_study', required: true },
        { fieldId: 'permanent_address', label: 'Permanent Address', type: 'textarea', section: 'Address', sourceDocument: 'AADHAAR', sourceField: 'address', required: true },
      ]),
      officialPortalUrl: 'https://scholarships.gov.in/',
      fees: 'No application fee. Scholarship amount: ₹12,000/year (day scholar), ₹20,000/year (hosteller)',
      processingTime: '30–90 days. Apply by November 30 of each academic year.',
      submissionInstructions: JSON.stringify({
        online: 'Only mode available. Apply exclusively at scholarships.gov.in (National Scholarship Portal). Complete online process.',
        portalSteps: [
          'Visit scholarships.gov.in',
          'Register as new student with Aadhaar and mobile',
          'Select "Central Sector Scheme of Scholarships"',
          'Fill academic and personal details',
          'Enter Class 12 roll number and marks',
          'Upload all documents',
          'Submit before November 30 deadline',
          'Track status on NSP portal',
        ],
      }),
    });

    // ── CHARACTER CERTIFICATE ──
    templates.push({
      state,
      category: 'CERTIFICATES_DOCUMENTS',
      applicationType: 'CHARACTER_CERTIFICATE',
      displayName: 'Character / Police Verification Certificate',
      description: `Apply for a police character verification certificate in ${state.replace(/_/g, ' ')} for employment, passport, visa, and other official purposes. Issued by local police station after background verification.`,
      requiredDocuments: JSON.stringify([
        { documentType: 'AADHAAR', label: 'Aadhaar Card', mandatory: true, description: 'Identity and current address proof' },
        { documentType: 'OTHER', label: 'Passport Size Photographs (2 copies)', mandatory: true, description: 'Recent photographs on white background' },
        { documentType: 'OTHER', label: 'Employer Letter / Appointment Letter', mandatory: false, description: 'Letter from employer stating purpose of police verification' },
        { documentType: 'MARKSHEET_10', label: 'Class 10 Certificate (for DOB proof)', mandatory: false, description: 'Date of birth proof', alternatives: ['BIRTH_CERT', 'AADHAAR'] },
      ]),
      eligibilityCriteria: JSON.stringify([
        { criterion: 'Must be a resident at the address mentioned for at least 6 months', field: 'residenceDuration', condition: '>=', value: 0.5 },
      ]),
      followUpQuestions: JSON.stringify([
        { id: 'purpose', question: 'Purpose of police verification', type: 'select', options: ['Government/Public sector employment', 'Private sector employment', 'Passport application', 'Visa application', 'Educational admission', 'Arms license', 'Other'], required: true },
        { id: 'employer_name', question: 'Employer / Organization name (if for employment)', type: 'text', required: false, dependsOn: { questionId: 'purpose', value: 'Government/Public sector employment' } },
      ]),
      formTemplate: JSON.stringify([
        { fieldId: 'applicant_name', label: 'Full Name', type: 'text', section: 'Personal Details', sourceDocument: 'AADHAAR', sourceField: 'fullName', required: true, format: 'UPPERCASE' },
        { fieldId: 'father_name', label: "Father's Name", type: 'text', section: 'Personal Details', sourceDocument: 'AADHAAR', sourceField: 'fatherName', required: true },
        { fieldId: 'dob', label: 'Date of Birth', type: 'date', section: 'Personal Details', sourceDocument: 'AADHAAR', sourceField: 'dob', required: true },
        { fieldId: 'gender', label: 'Gender', type: 'select', section: 'Personal Details', sourceDocument: 'AADHAAR', sourceField: 'gender', required: true },
        { fieldId: 'permanent_address', label: 'Permanent Address', type: 'textarea', section: 'Address', sourceDocument: 'AADHAAR', sourceField: 'address', required: true },
        { fieldId: 'district', label: 'District', type: 'text', section: 'Address', sourceDocument: 'AADHAAR', sourceField: 'district', required: true },
        { fieldId: 'purpose', label: 'Purpose', type: 'select', section: 'Purpose', followUpSource: 'purpose', required: true },
        { fieldId: 'aadhaar_number', label: 'Aadhaar Number', type: 'text', section: 'Document Numbers', sourceDocument: 'AADHAAR', sourceField: 'aadhaarNumber', required: true },
      ]),
      officialPortalUrl: portals.income, // State e-district portal
      fees: '₹50–₹200',
      processingTime: '15–30 working days (police field verification required)',
      submissionInstructions: JSON.stringify({
        online: `Apply at ${portals.income} or visit your nearest police station's e-service desk.`,
        offline: 'Visit your nearest police station with all documents. Submit application to the Station House Officer (SHO).',
      }),
    });
  }

  return templates;
}

// ─────────────────────────────────────────────────────────────────────────────
// SEED FUNCTION
// ─────────────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🌱 Starting FormShield database seed...');

  // Clear existing templates
  await prisma.applicationTemplate.deleteMany();
  console.log('✓ Cleared existing templates');

  const templates = buildTemplates();
  
  let created = 0;
  for (const template of templates) {
    try {
      await prisma.applicationTemplate.create({ data: template });
      created++;
    } catch (error) {
      console.error(`✗ Failed to create template: ${template.state} / ${template.applicationType}`, error);
    }
  }

  console.log(`✓ Created ${created} application templates across ${STATES.length} states`);
  console.log('✅ Database seed complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
