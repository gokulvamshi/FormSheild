/**
 * Form Auto-Fill Engine
 * Maps extracted DigiLocker data to application form fields
 */

import type { FormField } from '@/types/application';
import type { ExtractedData } from './document-parser';

export interface FilledFormData {
  [fieldId: string]: string;
}

/**
 * Auto-fill form fields using extracted document data + follow-up answers
 */
export function autoFillForm(
  formFields: FormField[],
  extractedData: ExtractedData,
  followUpAnswers: Record<string, string | boolean | number>
): FilledFormData {
  const filledData: FilledFormData = {};

  for (const field of formFields) {
    let value = '';

    // 1. Try follow-up source first (user-provided answers)
    if (field.followUpSource && followUpAnswers[field.followUpSource] !== undefined) {
      value = String(followUpAnswers[field.followUpSource]);
    }
    // 2. Try document data mapping
    else if (field.sourceField && extractedData[field.sourceField]) {
      value = extractedData[field.sourceField]!;
    }
    // 3. Fallback: try by field ID heuristics
    else {
      value = inferValueByFieldId(field.fieldId, field.label, extractedData);
    }

    // Apply formatting
    if (value && field.format) {
      value = applyFormat(value, field.format);
    }

    if (value) {
      filledData[field.fieldId] = value;
    }
  }

  return filledData;
}

/**
 * Heuristic mapping: guess field value from field ID/label patterns
 */
function inferValueByFieldId(
  fieldId: string,
  label: string,
  data: ExtractedData
): string {
  const id = fieldId.toLowerCase();
  const lbl = label.toLowerCase();

  // Full name
  if (id.includes('full_name') || id.includes('applicant_name') || id.includes('student_name') || lbl.includes('full name') || lbl.includes('name of applicant')) {
    return data.fullName || '';
  }

  // Father's name
  if (id.includes('father') || lbl.includes("father's name") || lbl.includes("father / husband")) {
    return data.fatherName || '';
  }

  // Mother's name
  if (id.includes('mother') || lbl.includes("mother's name")) {
    return data.motherName || '';
  }

  // Date of birth
  if (id.includes('dob') || id.includes('date_of_birth') || lbl.includes('date of birth')) {
    return data.dob || '';
  }

  // Gender
  if (id.includes('gender') || lbl.includes('gender') || lbl.includes('sex')) {
    return data.gender || '';
  }

  // Full address
  if (id.includes('permanent_address') || id.includes('address') || lbl.includes('permanent address') || lbl.includes('residential address')) {
    return data.address || '';
  }

  // Pincode
  if (id.includes('pincode') || id.includes('pin_code') || lbl.includes('pin code') || id.includes('pin')) {
    return data.pincode || '';
  }

  // District
  if (id.includes('district') || lbl.includes('district')) {
    return data.district || '';
  }

  // State
  if (id.includes('state') && !id.includes('appli')) {
    return data.state || '';
  }

  // Aadhaar number
  if (id.includes('aadhaar') || id.includes('aadhar') || lbl.includes('aadhaar')) {
    return data.aadhaarNumber || '';
  }

  // PAN number
  if (id.includes('pan') || lbl.includes('pan')) {
    return data.panNumber || '';
  }

  // Driving License number & expiry
  if (id.includes('dl_number') || id.includes('driving_license') || lbl.includes('driving license') || lbl.includes('dl number')) {
    return data.dlNumber || '';
  }
  if (id.includes('dl_expiry') || lbl.includes('dl expiry')) {
    return data.dlExpiry || '';
  }
  if (id.includes('vehicle_class') || lbl.includes('vehicle class')) {
    return data.vehicleClass || '';
  }

  // Vehicle Registration (RC)
  if (id.includes('rc_number') || id.includes('registration_number') || lbl.includes('registration number') || lbl.includes('rc number')) {
    return data.rcNumber || '';
  }
  if (id.includes('chassis') || lbl.includes('chassis')) {
    return data.chassisNumber || '';
  }
  if (id.includes('engine') || lbl.includes('engine')) {
    return data.engineNumber || '';
  }
  if (id.includes('maker') || id.includes('model') || lbl.includes('maker') || lbl.includes('model')) {
    return data.vehicleModel || '';
  }

  // Annual income
  if (id.includes('income') || lbl.includes('annual income')) {
    return data.income || '';
  }

  // Caste / category
  if (id.includes('caste') || lbl.includes('caste')) {
    return data.caste || '';
  }
  if (id.includes('category') || lbl.includes('category')) {
    return data.category || '';
  }
  if (id.includes('certificate_number') || lbl.includes('certificate number')) {
    return data.certificateNumber || '';
  }

  // Educational qualifications
  if (id.includes('qualification') || lbl.includes('qualification')) {
    return data.course ? `${data.course} from ${data.university || 'University'}, ${data.yearOfPassing || ''}` : '';
  }

  // Roll number & marksheet
  if (id.includes('roll') || lbl.includes('roll number')) {
    return data.rollNumber || '';
  }
  if (id.includes('board') || lbl.includes('board name')) {
    return data.boardName || '';
  }

  // Declaration date & place
  if (id.includes('declaration_date') || id.includes('application_date')) {
    return new Date().toLocaleDateString('en-IN');
  }
  if (id.includes('declaration_place')) {
    return data.district || data.state || '';
  }

  return '';
}

/**
 * Format a value according to format spec
 */
function applyFormat(value: string, format: string): string {
  switch (format) {
    case 'UPPERCASE':
      return value.toUpperCase();
    case 'TITLE_CASE':
      return value.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase());
    case 'DD/MM/YYYY':
      // Standardize date to DD/MM/YYYY
      if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        const [y, m, d] = value.split('-');
        return `${d}/${m}/${y}`;
      }
      return value;
    case 'UPPERCASE_NO_SPACE':
      return value.toUpperCase().replace(/\s+/g, '');
    default:
      return value;
  }
}

/**
 * Validate all required fields are filled
 */
export function validateFilledForm(
  formFields: FormField[],
  filledData: FilledFormData
): { isValid: boolean; missingFields: string[] } {
  const missingFields: string[] = [];

  for (const field of formFields) {
    if (field.required && (!filledData[field.fieldId] || filledData[field.fieldId].trim() === '')) {
      missingFields.push(field.label);
    }
  }

  return {
    isValid: missingFields.length === 0,
    missingFields,
  };
}

/**
 * Get the source of a filled field value (for UI highlighting)
 */
export function getFieldSource(
  field: FormField,
  filledData: FilledFormData,
  followUpAnswers: Record<string, string | boolean | number>
): 'digilocker' | 'user-input' | 'follow-up' | 'empty' {
  if (!filledData[field.fieldId]) return 'empty';
  if (field.followUpSource && followUpAnswers[field.followUpSource] !== undefined) return 'follow-up';
  if (field.sourceDocument || field.sourceField) return 'digilocker';
  return 'user-input';
}
