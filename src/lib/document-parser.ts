/**
 * Document data extractor
 * Extracts structured data from DigiLocker document XML/JSON responses
 */

import type { DocumentType } from '@/types/document';

export interface ExtractedData {
  fullName?: string;
  dob?: string;
  gender?: string;
  address?: string;
  houseNumber?: string;
  street?: string;
  locality?: string;
  district?: string;
  state?: string;
  pincode?: string;
  fatherName?: string;
  motherName?: string;
  photo?: string;
  aadhaarNumber?: string;
  panNumber?: string;
  dlNumber?: string;
  dlExpiry?: string;
  vehicleClass?: string;
  rcNumber?: string;
  chassisNumber?: string;
  engineNumber?: string;
  vehicleModel?: string;
  income?: string;
  category?: string;
  caste?: string;
  certificateNumber?: string;
  issuingAuthority?: string;
  issueDate?: string;
  boardName?: string;
  rollNumber?: string;
  yearOfPassing?: string;
  percentage?: string;
  course?: string;
  university?: string;
  [key: string]: string | undefined;
}

/**
 * Parse Aadhaar XML and extract data
 */
export function extractAadhaarData(xmlString: string): ExtractedData {
  const data: ExtractedData = {};

  // Extract name
  const nameMatch = xmlString.match(/name="([^"]+)"/i) || xmlString.match(/<name>([^<]+)<\/name>/i);
  if (nameMatch) data.fullName = nameMatch[1].toUpperCase();

  // Extract DOB
  const dobMatch = xmlString.match(/dob="([^"]+)"/i) || xmlString.match(/<dob>([^<]+)<\/dob>/i);
  if (dobMatch) data.dob = dobMatch[1];

  // Extract gender
  const genderMatch = xmlString.match(/gender="([^"]+)"/i) || xmlString.match(/<gender>([^<]+)<\/gender>/i);
  if (genderMatch) data.gender = genderMatch[1] === 'M' || genderMatch[1].toUpperCase().startsWith('M') ? 'MALE' : 'FEMALE';

  // Extract UID
  const uidMatch = xmlString.match(/uid="([^"]+)"/i);
  if (uidMatch) data.aadhaarNumber = `XXXX XXXX ${uidMatch[1].slice(-4)}`;

  // Extract address components
  const houseMatch = xmlString.match(/house="([^"]+)"/i);
  if (houseMatch) data.houseNumber = houseMatch[1];

  const streetMatch = xmlString.match(/street="([^"]+)"/i);
  if (streetMatch) data.street = streetMatch[1];

  const localityMatch = xmlString.match(/locality="([^"]+)"/i);
  if (localityMatch) data.locality = localityMatch[1];

  const districtMatch = xmlString.match(/dist="([^"]+)"/i) || xmlString.match(/district="([^"]+)"/i);
  if (districtMatch) data.district = districtMatch[1];

  const stateMatch = xmlString.match(/state="([^"]+)"/i);
  if (stateMatch) data.state = stateMatch[1];

  const pincodeMatch = xmlString.match(/pincode="([^"]+)"/i) || xmlString.match(/pc="([^"]+)"/i);
  if (pincodeMatch) data.pincode = pincodeMatch[1];

  // CareOf for fatherName
  const coMatch = xmlString.match(/co="([^"]+)"/i) || xmlString.match(/careof="([^"]+)"/i);
  if (coMatch) {
    const match = coMatch[1].match(/(?:S\/O|D\/O|W\/O|C\/O)\s+(.+)/i);
    if (match) data.fatherName = match[1].trim().toUpperCase();
  }

  // Build full address
  const addressParts = [data.houseNumber, data.street, data.locality, data.district, data.state, data.pincode].filter(Boolean);
  if (addressParts.length > 0) {
    data.address = addressParts.join(', ');
  }

  return data;
}

/**
 * Parse PAN Card XML/JSON and extract data
 */
export function extractPanData(content: string): ExtractedData {
  const data: ExtractedData = {};

  const nameMatch = content.match(/name="([^"]+)"/i) || content.match(/"name":\s*"([^"]+)"/i);
  if (nameMatch) data.fullName = nameMatch[1].toUpperCase();

  const fatherMatch = content.match(/father[_-]?name="([^"]+)"/i) || content.match(/"fatherName":\s*"([^"]+)"/i);
  if (fatherMatch) data.fatherName = fatherMatch[1].toUpperCase();

  const dobMatch = content.match(/dob="([^"]+)"/i) || content.match(/"dob":\s*"([^"]+)"/i);
  if (dobMatch) data.dob = dobMatch[1];

  const panMatch = content.match(/pan="([^"]+)"/i) || content.match(/pan_no="([^"]+)"/i) || content.match(/"pan":\s*"([^"]+)"/i);
  if (panMatch) data.panNumber = panMatch[1].toUpperCase();

  return data;
}

/**
 * Parse Driving License XML/JSON
 */
export function extractDrivingLicenseData(content: string): ExtractedData {
  const data: ExtractedData = {};

  const dlMatch = content.match(/dl_?no="([^"]+)"/i) || content.match(/dlNumber="([^"]+)"/i) || content.match(/"dlno":\s*"([^"]+)"/i) || content.match(/"dlNumber":\s*"([^"]+)"/i);
  if (dlMatch) data.dlNumber = dlMatch[1].toUpperCase();

  const nameMatch = content.match(/name="([^"]+)"/i) || content.match(/"name":\s*"([^"]+)"/i);
  if (nameMatch) data.fullName = nameMatch[1].toUpperCase();

  const fatherMatch = content.match(/father[_-]?name="([^"]+)"/i) || content.match(/"fatherName":\s*"([^"]+)"/i);
  if (fatherMatch) data.fatherName = fatherMatch[1].toUpperCase();

  const dobMatch = content.match(/dob="([^"]+)"/i) || content.match(/"dob":\s*"([^"]+)"/i);
  if (dobMatch) data.dob = dobMatch[1];

  const expiryMatch = content.match(/valid_?upto="([^"]+)"/i) || content.match(/expiry="([^"]+)"/i) || content.match(/"validUpto":\s*"([^"]+)"/i);
  if (expiryMatch) data.dlExpiry = expiryMatch[1];

  const classMatch = content.match(/cov="([^"]+)"/i) || content.match(/vehicle_?class="([^"]+)"/i) || content.match(/"vehicleClass":\s*"([^"]+)"/i);
  if (classMatch) data.vehicleClass = classMatch[1];

  return data;
}

/**
 * Parse Vehicle RC XML/JSON
 */
export function extractRcData(content: string): ExtractedData {
  const data: ExtractedData = {};

  const rcMatch = content.match(/reg_?no="([^"]+)"/i) || content.match(/rc_?number="([^"]+)"/i) || content.match(/"rcNumber":\s*"([^"]+)"/i);
  if (rcMatch) data.rcNumber = rcMatch[1].toUpperCase();

  const nameMatch = content.match(/owner_?name="([^"]+)"/i) || content.match(/"ownerName":\s*"([^"]+)"/i);
  if (nameMatch) data.fullName = nameMatch[1].toUpperCase();

  const chassisMatch = content.match(/chassis_?no="([^"]+)"/i) || content.match(/"chassisNo":\s*"([^"]+)"/i);
  if (chassisMatch) data.chassisNumber = chassisMatch[1].toUpperCase();

  const engineMatch = content.match(/engine_?no="([^"]+)"/i) || content.match(/"engineNo":\s*"([^"]+)"/i);
  if (engineMatch) data.engineNumber = engineMatch[1].toUpperCase();

  const modelMatch = content.match(/model="([^"]+)"/i) || content.match(/maker_?model="([^"]+)"/i) || content.match(/"makerModel":\s*"([^"]+)"/i);
  if (modelMatch) data.vehicleModel = modelMatch[1];

  return data;
}

/**
 * Parse Marksheet XML and extract data
 */
export function extractMarksheetData(xmlString: string): ExtractedData {
  const data: ExtractedData = {};

  const nameMatch = xmlString.match(/student[_-]?name="([^"]+)"/i) || xmlString.match(/name="([^"]+)"/i);
  if (nameMatch) data.fullName = nameMatch[1].toUpperCase();

  const fatherMatch = xmlString.match(/father[_-]?name="([^"]+)"/i);
  if (fatherMatch) data.fatherName = fatherMatch[1].toUpperCase();

  const motherMatch = xmlString.match(/mother[_-]?name="([^"]+)"/i);
  if (motherMatch) data.motherName = motherMatch[1].toUpperCase();

  const rollMatch = xmlString.match(/roll[_-]?number="([^"]+)"/i);
  if (rollMatch) data.rollNumber = rollMatch[1];

  const yearMatch = xmlString.match(/year[_-]?of[_-]?passing="([^"]+)"/i);
  if (yearMatch) data.yearOfPassing = yearMatch[1];

  const percentMatch = xmlString.match(/percentage="([^"]+)"/i);
  if (percentMatch) data.percentage = percentMatch[1];

  const boardMatch = xmlString.match(/board="([^"]+)"/i) || xmlString.match(/board[_-]?name="([^"]+)"/i);
  if (boardMatch) data.boardName = boardMatch[1];

  return data;
}

/**
 * Parse Caste Certificate XML and extract data
 */
export function extractCasteData(xmlString: string): ExtractedData {
  const data: ExtractedData = {};

  const nameMatch = xmlString.match(/name="([^"]+)"/i);
  if (nameMatch) data.fullName = nameMatch[1].toUpperCase();

  const casteMatch = xmlString.match(/caste="([^"]+)"/i);
  if (casteMatch) data.caste = casteMatch[1];

  const categoryMatch = xmlString.match(/category="([^"]+)"/i);
  if (categoryMatch) data.category = categoryMatch[1];

  const certMatch = xmlString.match(/certificate[_-]?number="([^"]+)"/i);
  if (certMatch) data.certificateNumber = certMatch[1];

  return data;
}

/**
 * Parse Income Certificate XML and extract data
 */
export function extractIncomeData(xmlString: string): ExtractedData {
  const data: ExtractedData = {};

  const nameMatch = xmlString.match(/name="([^"]+)"/i);
  if (nameMatch) data.fullName = nameMatch[1].toUpperCase();

  const incomeMatch = xmlString.match(/annual[_-]?income="([^"]+)"/i) || xmlString.match(/income="([^"]+)"/i);
  if (incomeMatch) data.income = incomeMatch[1];

  const certMatch = xmlString.match(/certificate[_-]?number="([^"]+)"/i);
  if (certMatch) data.certificateNumber = certMatch[1];

  return data;
}

/**
 * Route extraction to correct parser based on document type
 */
export function extractDocumentData(docType: DocumentType, content: string): ExtractedData {
  switch (docType) {
    case 'AADHAAR':
      return extractAadhaarData(content);
    case 'PAN':
      return extractPanData(content);
    case 'DL':
      return extractDrivingLicenseData(content);
    case 'RC':
      return extractRcData(content);
    case 'MARKSHEET_10':
    case 'MARKSHEET_12':
    case 'DEGREE':
      return extractMarksheetData(content);
    case 'CASTE_CERT':
      return extractCasteData(content);
    case 'INCOME_CERT':
      return extractIncomeData(content);
    default:
      return {};
  }
}

/**
 * Merge extracted data from multiple documents (Aadhaar takes priority for personal info)
 */
export function mergeExtractedData(documents: Array<{ type: DocumentType; extractedData: ExtractedData }>): ExtractedData {
  const merged: ExtractedData = {};

  // Priority order: Lower priority first, so higher priority overwrites
  const priority: DocumentType[] = [
    'OTHER',
    'DEGREE',
    'MARKSHEET_12',
    'MARKSHEET_10',
    'CASTE_CERT',
    'INCOME_CERT',
    'RC',
    'DL',
    'PAN',
    'AADHAAR',
  ];

  for (const p of priority) {
    const doc = documents.find((d) => d.type === p);
    if (doc && doc.extractedData) {
      Object.assign(merged, doc.extractedData);
    }
  }

  return merged;
}
