import type { DocumentType } from './document';

export type ApplicationStatus =
  | 'DRAFT'
  | 'IN_PROGRESS'
  | 'DOCUMENTS_PENDING'
  | 'READY'
  | 'DOWNLOADED'
  | 'SUBMITTED';

export type ApplicationCategory =
  | 'TRANSPORT_LICENSING'
  | 'LOANS_FINANCE'
  | 'CERTIFICATES_DOCUMENTS'
  | 'EDUCATION_SCHOLARSHIPS';

export type ApplicationState =
  | 'ANDHRA_PRADESH'
  | 'TELANGANA'
  | 'MAHARASHTRA'
  | 'TAMIL_NADU'
  | 'KARNATAKA'
  | 'KERALA'
  | 'UTTAR_PRADESH'
  | 'DELHI';

export type ApplicationType =
  // Transport & Licensing
  | 'DL_LEARNERS_PERMIT'
  | 'DL_PERMANENT'
  | 'DL_RENEWAL'
  | 'RC_NEW_VEHICLE'
  | 'RC_TRANSFER_OWNERSHIP'
  // Loans & Finance
  | 'EDUCATION_LOAN'
  | 'PERSONAL_LOAN'
  | 'PM_MUDRA_LOAN'
  | 'PM_AWAS_YOJANA'
  // Certificates & Documents
  | 'INCOME_CERTIFICATE'
  | 'CASTE_CERTIFICATE'
  | 'DOMICILE_CERTIFICATE'
  | 'BIRTH_CERTIFICATE'
  | 'CHARACTER_CERTIFICATE'
  // Education & Scholarships
  | 'POST_MATRIC_SCHOLARSHIP'
  | 'CENTRAL_SECTOR_SCHOLARSHIP'
  | 'COLLEGE_ADMISSION';

export interface Application {
  id: string;
  userId: string;
  state: ApplicationState;
  category: ApplicationCategory;
  applicationType: ApplicationType;
  status: ApplicationStatus;
  currentStep: number;
  followUpAnswers: Record<string, string | boolean | number> | null;
  documentCheckResults: DocumentCheckResult[] | null;
  generatedFormData: Record<string, string> | null;
  pdfUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  // joined
  template?: ApplicationTemplate;
}

export interface DocumentCheckResult {
  documentType: DocumentType;
  label: string;
  mandatory: boolean;
  status: 'AVAILABLE' | 'MISSING' | 'NEEDS_REVIEW' | 'OPTIONAL_MISSING';
  documentId?: string;
  note?: string;
  howToObtain?: string;
}

export interface FollowUpQuestion {
  id: string;
  question: string;
  type: 'text' | 'select' | 'radio' | 'checkbox' | 'number' | 'date';
  options?: string[];
  required: boolean;
  dependsOn?: {
    questionId: string;
    value: string;
  };
  placeholder?: string;
  helperText?: string;
}

export interface RequiredDocument {
  documentType: DocumentType;
  label: string;
  mandatory: boolean;
  description: string;
  alternatives?: DocumentType[];
  howToObtain?: string;
  downloadUrl?: string;
}

export interface EligibilityCriterion {
  criterion: string;
  field: string;
  condition: '>=' | '<=' | '==' | '!=' | 'contains' | 'exists';
  value: string | number | boolean;
}

export interface FormField {
  fieldId: string;
  label: string;
  type: 'text' | 'date' | 'select' | 'radio' | 'checkbox' | 'textarea' | 'number' | 'photo' | 'signature';
  section: string;
  sourceDocument?: DocumentType;
  sourceField?: string;
  followUpSource?: string;
  required: boolean;
  validation?: string;
  format?: string;
  options?: string[];
  placeholder?: string;
}

export interface SubmissionInstructions {
  online?: string;
  offline?: string;
  officeAddress?: string;
  portalSteps?: string[];
  documentsToCarry?: string[];
}

export interface ApplicationTemplate {
  id: string;
  state: ApplicationState;
  category: ApplicationCategory;
  applicationType: ApplicationType;
  displayName: string;
  description: string;
  requiredDocuments: RequiredDocument[];
  eligibilityCriteria: EligibilityCriterion[];
  followUpQuestions: FollowUpQuestion[];
  formTemplate: FormField[];
  officialPortalUrl: string;
  fees: string;
  processingTime: string;
  submissionInstructions: SubmissionInstructions;
  createdAt: Date;
  updatedAt: Date;
}
