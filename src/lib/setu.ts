/**
 * Setu Data Gateway - DigiLocker API Client
 * Official integration for real-time citizen verification and document fetching via Setu.
 * Docs: https://docs.setu.co/data/digilocker
 */

import type { ExtractedData } from '@/lib/document-parser';

const SANDBOX_BASE_URL = 'https://dg-sandbox.setu.co';
const PROD_BASE_URL = 'https://dg.setu.co';

export function getSetuBaseUrl(): string {
  const env = process.env.SETU_ENV || 'sandbox';
  return env.toLowerCase() === 'production' ? PROD_BASE_URL : SANDBOX_BASE_URL;
}

export function getSetuHeaders(): Record<string, string> {
  const clientId = process.env.SETU_CLIENT_ID;
  const clientSecret = process.env.SETU_CLIENT_SECRET;
  const productInstanceId = process.env.SETU_PRODUCT_INSTANCE_ID;

  if (!clientId || !clientSecret || !productInstanceId) {
    throw new Error(
      'Missing Setu credentials. Please ensure SETU_CLIENT_ID, SETU_CLIENT_SECRET, and SETU_PRODUCT_INSTANCE_ID are set in .env'
    );
  }

  return {
    'x-client-id': clientId,
    'x-client-secret': clientSecret,
    'x-product-instance-id': productInstanceId,
    'Content-Type': 'application/json',
  };
}

export interface SetuDigiLockerRequestResponse {
  id: string;
  status: string;
  url: string;
  validUpto?: string;
  [key: string]: unknown;
}

export interface SetuDigiLockerStatusResponse {
  id?: string;
  status: 'unauthenticated' | 'authenticated' | 'expired' | 'failed' | string;
  digilockerUserDetails?: {
    digilockerId?: string;
    email?: string;
    phoneNumber?: string;
  };
  traceId?: string;
  [key: string]: unknown;
}

export interface SetuDocumentFetchOptions {
  docType: string;
  orgId?: string;
  format?: 'pdf' | 'xml';
  consent?: 'Y' | 'N';
  parameters?: Array<{ name: string; value: string }>;
}

export interface SetuDocumentFetchResponse {
  fileUrl: string;
  validUpto?: string;
  [key: string]: unknown;
}

/**
 * Step 1: Create a DigiLocker session with Setu.
 * Returns a hosted URL where citizen grants consent and completes Aadhaar / DigiLocker login.
 */
export async function createDigiLockerRequest(
  redirectUrl: string,
  docType?: string
): Promise<SetuDigiLockerRequestResponse> {
  const baseUrl = getSetuBaseUrl();
  const headers = getSetuHeaders();

  const payload: Record<string, any> = { redirectUrl };
  if (docType) {
    payload.docType = docType;
  }

  const response = await fetch(`${baseUrl}/api/digilocker/`, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Setu createDigiLockerRequest error:', response.status, errorText);
    throw new Error(`Setu API Error (${response.status}): ${errorText}`);
  }

  return response.json();
}

/**
 * Step 2: Check current status of a DigiLocker session.
 * Status turns from 'unauthenticated' to 'authenticated' once user completes consent.
 */
export async function getDigiLockerRequestStatus(
  requestId: string
): Promise<SetuDigiLockerStatusResponse> {
  const baseUrl = getSetuBaseUrl();
  const headers = getSetuHeaders();

  const response = await fetch(`${baseUrl}/api/digilocker/${encodeURIComponent(requestId)}/status`, {
    method: 'GET',
    headers,
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Setu getDigiLockerRequestStatus error:', response.status, errorText);
    throw new Error(`Failed to fetch status for request ${requestId}: ${errorText}`);
  }

  return response.json();
}

/**
 * Step 3: Fetch Aadhaar data once request is authenticated.
 * Returns verified KYC details including demographic info, address, and photo.
 */
export async function fetchAadhaarData(requestId: string): Promise<any> {
  const baseUrl = getSetuBaseUrl();
  const headers = getSetuHeaders();

  const response = await fetch(`${baseUrl}/api/digilocker/${encodeURIComponent(requestId)}/aadhaar`, {
    method: 'GET',
    headers,
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Setu fetchAadhaarData error:', response.status, errorText);
    throw new Error(`Failed to fetch Aadhaar data for request ${requestId}: ${errorText}`);
  }

  return response.json();
}

/**
 * Step 4: Fetch additional consented document from DigiLocker (e.g. Driving License, PAN, RC).
 */
export async function fetchDocument(
  requestId: string,
  options: SetuDocumentFetchOptions
): Promise<SetuDocumentFetchResponse> {
  const baseUrl = getSetuBaseUrl();
  const headers = getSetuHeaders();

  const payload = {
    docType: options.docType,
    orgId: options.orgId || '002202', // Default RTO or Setu issuer
    format: options.format || 'pdf',
    consent: options.consent || 'Y',
    parameters: options.parameters || [],
  };

  const response = await fetch(`${baseUrl}/api/digilocker/${encodeURIComponent(requestId)}/document`, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Setu fetchDocument error (${options.docType}):`, response.status, errorText);
    throw new Error(`Failed to fetch document (${options.docType}): ${errorText}`);
  }

  return response.json();
}

/**
 * Maps raw Setu Aadhaar response to FormShield's standardized ExtractedData interface.
 */
export function mapSetuAadhaarToExtractedData(setuData: any): ExtractedData {
  const aadhaar = setuData?.aadhaar || setuData?.data?.aadhaar || setuData;
  const addressObj = aadhaar?.address || {};

  const extracted: ExtractedData = {};

  if (aadhaar?.name) {
    extracted.fullName = String(aadhaar.name).trim().toUpperCase();
  } else if (aadhaar?.fullName) {
    extracted.fullName = String(aadhaar.fullName).trim().toUpperCase();
  }

  if (aadhaar?.dob) {
    extracted.dob = String(aadhaar.dob).trim();
  } else if (aadhaar?.dateOfBirth) {
    extracted.dob = String(aadhaar.dateOfBirth).trim();
  }

  if (aadhaar?.gender) {
    const g = String(aadhaar.gender).toUpperCase();
    extracted.gender = g.startsWith('M') ? 'MALE' : g.startsWith('F') ? 'FEMALE' : 'OTHER';
  }

  if (aadhaar?.uid) {
    const cleanUid = String(aadhaar.uid).replace(/\s+/g, '');
    const last4 = cleanUid.slice(-4);
    extracted.aadhaarNumber = `XXXX XXXX ${last4}`;
  } else if (aadhaar?.maskedNumber) {
    extracted.aadhaarNumber = String(aadhaar.maskedNumber).replace(/x/gi, 'X');
  }

  if (addressObj.house) extracted.houseNumber = String(addressObj.house);
  if (addressObj.street || addressObj.line1) extracted.street = String(addressObj.street || addressObj.line1);
  if (addressObj.locality || addressObj.landmark || addressObj.line2) {
    extracted.locality = String(addressObj.locality || addressObj.landmark || addressObj.line2);
  }
  if (addressObj.dist || addressObj.district) extracted.district = String(addressObj.dist || addressObj.district);
  if (addressObj.state) extracted.state = String(addressObj.state);
  if (addressObj.pincode || addressObj.pin || addressObj.pc) extracted.pincode = String(addressObj.pincode || addressObj.pin || addressObj.pc);

  // Parse CareOf (e.g. "S/O Ramesh Kumar") for fatherName
  if (addressObj.careOf) {
    const careOf = String(addressObj.careOf).trim();
    const match = careOf.match(/(?:S\/O|D\/O|W\/O|C\/O)\s+(.+)/i);
    if (match) {
      extracted.fatherName = match[1].trim().toUpperCase();
    }
  }

  // Build combined address string
  const addressParts = [
    extracted.houseNumber,
    extracted.street,
    extracted.locality,
    extracted.district,
    extracted.state,
    extracted.pincode,
  ].filter(Boolean);

  if (addressParts.length > 0) {
    extracted.address = addressParts.join(', ');
  } else if (typeof addressObj === 'string') {
    extracted.address = addressObj;
  }

  if (aadhaar?.photo) {
    extracted.photo = aadhaar.photo.startsWith('data:')
      ? aadhaar.photo
      : `data:image/jpeg;base64,${aadhaar.photo}`;
  }

  return extracted;
}
