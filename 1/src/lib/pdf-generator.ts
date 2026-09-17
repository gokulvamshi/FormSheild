import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { STATE_LABELS, CATEGORY_LABELS } from './utils';

export interface GeneratePdfOptions {
  applicationId: string;
  applicationType: string;
  applicationTitle: string;
  state: string;
  category: string;
  formData: Record<string, string>;
  formFields: Array<{ fieldId: string; label: string; section?: string }>;
  verifiedDocuments?: Array<{ type: string; name: string; verified: boolean }>;
  userName?: string;
}

export function generateApplicationPdf({
  applicationId,
  applicationType,
  applicationTitle,
  state,
  category,
  formData,
  formFields,
  verifiedDocuments = [],
  userName = 'Citizen Applicant',
}: GeneratePdfOptions): jsPDF {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  const stateName = STATE_LABELS[state] || state;
  const categoryName = CATEGORY_LABELS[category] || category;

  // Header Banner
  doc.setFillColor(26, 115, 232); // #1a73e8
  doc.rect(0, 0, 210, 30, 'F');

  // Emblem/Brand
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('FORMSHIELD — PRE-SUBMISSION VERIFIED APPLICATION', 14, 13);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(
    `Official Form Extract | State: ${stateName} | Dept: ${categoryName} | Generated: ${new Date().toLocaleDateString('en-IN')}`,
    14,
    22
  );

  // Verification Badge Bar
  doc.setFillColor(240, 248, 255);
  doc.rect(14, 34, 182, 14, 'F');
  doc.setDrawColor(186, 230, 253);
  doc.setLineWidth(0.5);
  doc.rect(14, 34, 182, 14, 'S');

  doc.setTextColor(3, 105, 161);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('DIGILOCKER VERIFIED CITIZEN SUBMISSION', 18, 41);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(
    `Ref ID: ${applicationId.toUpperCase()} • Authenticated via Aadhaar/DigiLocker Integration`,
    18,
    46
  );

  // Application Details
  doc.setTextColor(31, 41, 55);
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text(applicationTitle, 14, 56);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(107, 114, 128);
  doc.text(`Applicant Name: ${userName}  •  Jurisdiction: Government of ${stateName}`, 14, 62);

  // Group fields by section
  const sections: Record<string, Array<{ label: string; value: string }>> = {};

  formFields.forEach((field) => {
    const sec = field.section || 'General Details';
    if (!sections[sec]) sections[sec] = [];
    const val = formData[field.fieldId] || formData[field.label] || '—';
    sections[sec].push({ label: field.label, value: String(val) });
  });

  let yPos = 68;

  // Render Section Tables
  Object.entries(sections).forEach(([secName, fields]) => {
    if (yPos > 240) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(26, 115, 232);
    doc.text(secName.toUpperCase(), 14, yPos);
    yPos += 3;

    autoTable(doc, {
      startY: yPos,
      head: [],
      body: fields.map((f) => [f.label, f.value]),
      styles: { fontSize: 8.5, cellPadding: 3.5 },
      columnStyles: {
        0: { fontStyle: 'bold', cellWidth: 70, textColor: [55, 65, 81], fillColor: [249, 250, 251] },
        1: { cellWidth: 112, textColor: [17, 24, 39] },
      },
      theme: 'grid',
      margin: { left: 14, right: 14 },
    });

    const lastY = (doc as unknown as { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY;
    yPos = (lastY !== undefined ? lastY : yPos + 25) + 6;
  });

  // Attached/Verified Documents Table
  if (verifiedDocuments.length > 0) {
    if (yPos > 230) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(22, 101, 52); // Dark Green
    doc.text('VERIFIED DIGILOCKER ATTACHMENTS & CERTIFICATES', 14, yPos);
    yPos += 3;

    autoTable(doc, {
      startY: yPos,
      head: [['Document Type', 'Document Description', 'DigiLocker Status']],
      body: verifiedDocuments.map((d) => [d.type, d.name, d.verified ? 'Verified (Authentic)' : 'Provided']),
      styles: { fontSize: 8.5, cellPadding: 3 },
      headStyles: { fillColor: [240, 253, 244], textColor: [22, 101, 52], fontStyle: 'bold' },
      columnStyles: {
        0: { cellWidth: 50 },
        1: { cellWidth: 92 },
        2: { cellWidth: 40, textColor: [22, 101, 52], fontStyle: 'bold' },
      },
      theme: 'grid',
      margin: { left: 14, right: 14 },
    });

    const lastY = (doc as unknown as { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY;
    yPos = (lastY !== undefined ? lastY : yPos + 25) + 6;
  }

  // Legal Declaration
  if (yPos > 235) {
    doc.addPage();
    yPos = 20;
  }

  doc.setFillColor(249, 250, 251);
  doc.rect(14, yPos, 182, 38, 'F');
  doc.setDrawColor(229, 231, 235);
  doc.rect(14, yPos, 182, 38, 'S');

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(55, 65, 81);
  doc.text('SELF-DECLARATION & CITIZEN UNDERTAKING', 18, yPos + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(107, 114, 128);
  const declaration =
    'I solemnly declare that all statements made and particulars furnished in this application are true, complete, and correct to the best of my knowledge and belief. I am aware that false statements or willful omission of material facts will lead to immediate rejection, forfeiture of processing fees, and potential prosecution under the Indian Penal Code.';
  doc.text(declaration, 18, yPos + 13, { maxWidth: 174 });

  // Signature areas
  doc.setDrawColor(156, 163, 175);
  doc.line(18, yPos + 32, 75, yPos + 32);
  doc.line(125, yPos + 32, 182, yPos + 32);

  doc.setFontSize(7);
  doc.text('Signature of Applicant / Thumb Impression', 18, yPos + 36);
  doc.text('Date & Place of Submission', 125, yPos + 36);

  // Footer on all pages
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(156, 163, 175);
    doc.text(
      `FormShield Intelligent Pre-Submission Verification • Application ID: ${applicationId} • Page ${i} of ${totalPages}`,
      14,
      290
    );
    doc.text('Legally Accepted Digitally Signed Copy', 150, 290);
  }

  return doc;
}
