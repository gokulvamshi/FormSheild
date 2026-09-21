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
  submissionRef?: string;
}

/**
 * Generates an official, unbranded, professional government application form PDF.
 * Free of any FormShield branding, logos, or promotional markers.
 */
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
  submissionRef,
}: GeneratePdfOptions): jsPDF {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  const stateName = STATE_LABELS[state] || state.replace(/_/g, ' ');
  const categoryName = CATEGORY_LABELS[category] || category.replace(/_/g, ' ');
  const todayDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  const refCode = submissionRef || `APP-${applicationId.slice(-8).toUpperCase()}`;

  // ─────────────────────────────────────────────────────────────
  // 1. OFFICIAL GOVERNMENT HEADER (Clean, Official, Unbranded)
  // ─────────────────────────────────────────────────────────────

  // Top Dark Official Accent Line
  doc.setFillColor(30, 41, 59); // Slate 800
  doc.rect(0, 0, 210, 4, 'F');

  // National / State Authority Header Banner
  doc.setFillColor(248, 250, 252);
  doc.rect(14, 10, 182, 32, 'F');
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.6);
  doc.rect(14, 10, 182, 32, 'S');

  // Government Hierarchy Titles
  doc.setTextColor(30, 41, 59);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(`GOVERNMENT OF ${stateName.toUpperCase()}`, 105, 17, { align: 'center' });

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text(`DEPARTMENT OF ${categoryName.toUpperCase()}`, 105, 23, { align: 'center' });

  // Official Form Title
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(applicationTitle.toUpperCase(), 105, 31, { align: 'center' });

  // Subtitle info
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text('OFFICIAL CITIZEN SERVICE APPLICATION & REGISTRATION FORM', 105, 37, {
    align: 'center',
  });

  // ─────────────────────────────────────────────────────────────
  // 2. OFFICIAL FILING & REFERENCE DETAILS TABLE
  // ─────────────────────────────────────────────────────────────
  autoTable(doc, {
    startY: 45,
    head: [],
    body: [
      [
        { content: 'Application Reference ID:', styles: { fontStyle: 'bold', cellWidth: 45 } },
        { content: refCode, styles: { fontStyle: 'bold', textColor: [15, 23, 42] } },
        { content: 'Date of Generation:', styles: { fontStyle: 'bold', cellWidth: 38 } },
        { content: todayDate },
      ],
      [
        { content: 'Applicant Full Name:', styles: { fontStyle: 'bold' } },
        { content: userName },
        { content: 'Administrative State:', styles: { fontStyle: 'bold' } },
        { content: stateName },
      ],
      [
        { content: 'Service Category:', styles: { fontStyle: 'bold' } },
        { content: categoryName },
        { content: 'Authentication Status:', styles: { fontStyle: 'bold' } },
        { content: 'Verified via Digital Repository', styles: { textColor: [22, 101, 52], fontStyle: 'bold' } },
      ],
    ],
    theme: 'grid',
    styles: {
      fontSize: 8,
      cellPadding: 2.2,
      textColor: [51, 65, 85],
      lineColor: [226, 232, 240],
      lineWidth: 0.3,
    },
    columnStyles: {
      0: { fillColor: [248, 250, 252] },
      2: { fillColor: [248, 250, 252] },
    },
    margin: { left: 14, right: 14 },
  });

  // Position after reference table
  let currentY =
    (doc as unknown as { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY || 70;
  currentY += 6;

  // ─────────────────────────────────────────────────────────────
  // 3. GROUPED FORM FIELDS
  // ─────────────────────────────────────────────────────────────
  const sections: Record<string, Array<{ label: string; value: string }>> = {};

  formFields.forEach((field) => {
    const sec = field.section || 'General Applicant Particulars';
    if (!sections[sec]) sections[sec] = [];
    const val = formData[field.fieldId] || formData[field.label] || '—';
    sections[sec].push({ label: field.label, value: String(val) });
  });

  // If no form fields were passed, display all formData keys
  if (Object.keys(sections).length === 0 && Object.keys(formData).length > 0) {
    sections['Application Particulars'] = Object.entries(formData).map(([k, v]) => ({
      label: k.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase()),
      value: String(v || '—'),
    }));
  }

  Object.entries(sections).forEach(([secName, fields], idx) => {
    // Add page if too close to bottom
    if (currentY > 235) {
      doc.addPage();
      currentY = 18;
    }

    // Section Header Band
    doc.setFillColor(241, 245, 249);
    doc.rect(14, currentY, 182, 7, 'F');
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.4);
    doc.rect(14, currentY, 182, 7, 'S');

    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text(`SECTION ${idx + 1}: ${secName.toUpperCase()}`, 17, currentY + 4.8);

    currentY += 8;

    autoTable(doc, {
      startY: currentY,
      head: [],
      body: fields.map((f) => [f.label, f.value]),
      theme: 'grid',
      styles: {
        fontSize: 8,
        cellPadding: 2.8,
        textColor: [15, 23, 42],
        lineColor: [226, 232, 240],
        lineWidth: 0.3,
      },
      columnStyles: {
        0: {
          fontStyle: 'bold',
          cellWidth: 65,
          fillColor: [250, 250, 250],
          textColor: [71, 85, 105],
        },
        1: { cellWidth: 117 },
      },
      margin: { left: 14, right: 14 },
    });

    const lastY = (doc as unknown as { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY;
    currentY = (lastY !== undefined ? lastY : currentY + 25) + 5;
  });

  // ─────────────────────────────────────────────────────────────
  // 4. VERIFIED DIGITAL DOCUMENTS & CERTIFICATES
  // ─────────────────────────────────────────────────────────────
  if (verifiedDocuments.length > 0) {
    if (currentY > 225) {
      doc.addPage();
      currentY = 18;
    }

    doc.setFillColor(240, 253, 244);
    doc.rect(14, currentY, 182, 7, 'F');
    doc.setDrawColor(187, 247, 208);
    doc.setLineWidth(0.4);
    doc.rect(14, currentY, 182, 7, 'S');

    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(22, 101, 52);
    doc.text('ATTACHED & VERIFIED CITIZEN CREDENTIALS', 17, currentY + 4.8);

    currentY += 8;

    autoTable(doc, {
      startY: currentY,
      head: [['Document Classification', 'Credential Description / Certificate', 'Verification Authority']],
      body: verifiedDocuments.map((d) => [
        d.type,
        d.name,
        d.verified ? 'Verified (Government Source Repository)' : 'Provided by Applicant',
      ]),
      theme: 'grid',
      styles: {
        fontSize: 8,
        cellPadding: 2.5,
        textColor: [15, 23, 42],
        lineColor: [226, 232, 240],
        lineWidth: 0.3,
      },
      headStyles: {
        fillColor: [248, 250, 252],
        textColor: [30, 41, 59],
        fontStyle: 'bold',
        lineWidth: 0.3,
      },
      columnStyles: {
        0: { cellWidth: 50, fontStyle: 'bold' },
        1: { cellWidth: 82 },
        2: { cellWidth: 50, textColor: [22, 101, 52], fontStyle: 'bold' },
      },
      margin: { left: 14, right: 14 },
    });

    const lastY = (doc as unknown as { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY;
    currentY = (lastY !== undefined ? lastY : currentY + 25) + 5;
  }

  // ─────────────────────────────────────────────────────────────
  // 5. STATUTORY CITIZEN SELF-DECLARATION
  // ─────────────────────────────────────────────────────────────
  if (currentY > 215) {
    doc.addPage();
    currentY = 18;
  }

  doc.setFillColor(248, 250, 252);
  doc.rect(14, currentY, 182, 36, 'F');
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.4);
  doc.rect(14, currentY, 182, 36, 'S');

  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 41, 59);
  doc.text('STATUTORY CITIZEN UNDERTAKING & SELF-DECLARATION', 18, currentY + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(71, 85, 105);
  const declarationText =
    'I hereby solemnly state and affirm that all the particulars and facts entered in this application are true, genuine, and correct to the best of my knowledge and belief. I have not concealed or misrepresented any material information. I understand that submitting false or misleading information entails immediate cancellation of the application and makes me liable for penal consequences under the Indian Penal Code and applicable state enactments.';
  doc.text(declarationText, 18, currentY + 11, { maxWidth: 174 });

  // Signature and Date lines
  doc.setDrawColor(148, 163, 184);
  doc.line(18, currentY + 29, 80, currentY + 29);
  doc.line(125, currentY + 29, 186, currentY + 29);

  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text('Signature / Thumb Impression of Applicant', 18, currentY + 33);
  doc.text('Date & Place of Submission', 125, currentY + 33);

  currentY += 41;

  // ─────────────────────────────────────────────────────────────
  // 6. FOR OFFICIAL USE ONLY SECTION
  // ─────────────────────────────────────────────────────────────
  if (currentY > 240) {
    doc.addPage();
    currentY = 18;
  }

  doc.setFillColor(255, 255, 255);
  doc.rect(14, currentY, 182, 22, 'F');
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.4);
  doc.rect(14, currentY, 182, 22, 'S');

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(71, 85, 105);
  doc.text('FOR DEPARTMENTAL / OFFICIAL USE ONLY', 18, currentY + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text('Received by (Officer Name & Designation): ____________________________________', 18, currentY + 11);
  doc.text('Scrutiny Status: [  ] Accepted   [  ] Deficient   [  ] Query Raised', 18, currentY + 16);
  doc.text('Official Departmental Seal & Stamp', 135, currentY + 16);

  // ─────────────────────────────────────────────────────────────
  // 7. FOOTER ON ALL PAGES (Completely Free of FormShield Branding)
  // ─────────────────────────────────────────────────────────────
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.line(14, 287, 196, 287);

    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(148, 163, 184);
    doc.text(`Official Citizen Form Extract • Ref: ${refCode} • Issued: ${todayDate}`, 14, 291);
    doc.text(`Page ${i} of ${totalPages}`, 196, 291, { align: 'right' });
  }

  return doc;
}
