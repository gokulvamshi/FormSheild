/**
 * DigiLocker API Client
 * OAuth 2.0 flow for DigiLocker Partner API
 * Docs: https://partners.digitallocker.gov.in/
 */

const DIGILOCKER_BASE_URL = 'https://digilocker.meripehchaan.gov.in';
const DIGILOCKER_API_URL = 'https://api.digitallocker.gov.in';

export interface DigiLockerTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

export interface DigiLockerUserInfo {
  sub: string;
  name: string;
  dob: string;
  gender: string;
  phone: string;
  email: string;
  aadhaar_number?: string;
  digilocker_id: string;
}

export interface DigiLockerIssuedDocument {
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

/**
 * Build the OAuth authorization URL to redirect the user to DigiLocker
 */
export function buildAuthorizationUrl(state: string): string {
  const clientId = process.env.DIGILOCKER_CLIENT_ID;
  const redirectUri = process.env.DIGILOCKER_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    throw new Error('DigiLocker credentials not configured. Please set DIGILOCKER_CLIENT_ID and DIGILOCKER_REDIRECT_URI.');
  }

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: redirectUri,
    state,
    scope: 'openid',
  });

  return `${DIGILOCKER_BASE_URL}/public/oauth2/1/authorize?${params.toString()}`;
}

/**
 * Exchange authorization code for access token
 */
export async function exchangeCodeForToken(code: string): Promise<DigiLockerTokenResponse> {
  const clientId = process.env.DIGILOCKER_CLIENT_ID!;
  const clientSecret = process.env.DIGILOCKER_CLIENT_SECRET!;
  const redirectUri = process.env.DIGILOCKER_REDIRECT_URI!;

  const response = await fetch(`${DIGILOCKER_API_URL}/public/oauth2/1/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      client_id: clientId,
      client_secret: clientSecret,
    }).toString(),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`DigiLocker token exchange failed: ${error}`);
  }

  return response.json();
}

/**
 * Refresh an expired access token
 */
export async function refreshAccessToken(refreshToken: string): Promise<DigiLockerTokenResponse> {
  const clientId = process.env.DIGILOCKER_CLIENT_ID!;
  const clientSecret = process.env.DIGILOCKER_CLIENT_SECRET!;

  const response = await fetch(`${DIGILOCKER_API_URL}/public/oauth2/1/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: clientId,
      client_secret: clientSecret,
    }).toString(),
  });

  if (!response.ok) {
    throw new Error('Failed to refresh DigiLocker token');
  }

  return response.json();
}

/**
 * Get user profile information from DigiLocker
 */
export async function getUserInfo(accessToken: string): Promise<DigiLockerUserInfo> {
  const response = await fetch(`${DIGILOCKER_API_URL}/public/oauth2/1/userinfo`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch DigiLocker user info');
  }

  return response.json();
}

/**
 * Get list of issued documents from DigiLocker
 */
export async function getIssuedDocuments(accessToken: string): Promise<DigiLockerIssuedDocument[]> {
  const response = await fetch(`${DIGILOCKER_API_URL}/public/oauth2/3/files/issued`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch DigiLocker documents');
  }

  const data = await response.json();
  return data.items || [];
}

/**
 * Get a specific document's data by URI
 */
export async function getDocumentByUri(accessToken: string, uri: string): Promise<string> {
  const response = await fetch(`${DIGILOCKER_API_URL}/public/oauth2/2/file/${encodeURIComponent(uri)}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch document: ${uri}`);
  }

  return response.text();
}

/**
 * Get document XML data (for data extraction)
 */
export async function getDocumentXml(accessToken: string, uri: string): Promise<string> {
  const response = await fetch(`${DIGILOCKER_API_URL}/public/oauth2/1/xml/${encodeURIComponent(uri)}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch document XML: ${uri}`);
  }

  return response.text();
}

/**
 * Map DigiLocker document type to our internal DocumentType
 */
export function mapDigiLockerDocType(doctype: string, issuer: string): string {
  const lowerDoctype = doctype.toLowerCase();
  const lowerIssuer = issuer.toLowerCase();

  if (lowerDoctype.includes('aadhaar') || lowerIssuer.includes('uidai')) return 'AADHAAR';
  if (lowerDoctype.includes('pan') || lowerIssuer.includes('income tax')) return 'PAN';
  if (lowerDoctype.includes('driving') || lowerDoctype.includes('dl')) return 'DL';
  if (lowerDoctype.includes('sslc') || lowerDoctype.includes('class x') || lowerDoctype.includes('10th')) return 'MARKSHEET_10';
  if (lowerDoctype.includes('hsc') || lowerDoctype.includes('class xii') || lowerDoctype.includes('12th') || lowerDoctype.includes('intermediate')) return 'MARKSHEET_12';
  if (lowerDoctype.includes('degree') || lowerDoctype.includes('graduation')) return 'DEGREE';
  if (lowerDoctype.includes('income')) return 'INCOME_CERT';
  if (lowerDoctype.includes('caste')) return 'CASTE_CERT';
  if (lowerDoctype.includes('domicile') || lowerDoctype.includes('residence')) return 'DOMICILE';
  if (lowerDoctype.includes('birth')) return 'BIRTH_CERT';
  if (lowerDoctype.includes('voter') || lowerDoctype.includes('epic')) return 'VOTER_ID';
  if (lowerDoctype.includes('registration') && lowerDoctype.includes('vehicle')) return 'RC';
  if (lowerDoctype.includes('passport')) return 'PASSPORT';
  if (lowerDoctype.includes('medical')) return 'MEDICAL_CERT';
  return 'OTHER';
}
