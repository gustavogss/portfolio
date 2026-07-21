import { jsPDF } from 'jspdf';

/**
 * Format educational degree with correct status if current year (2026) or "Presente"
 */
function formatEducationTitle(degree: string, period: string): string {
  const isCurrent = period.includes('2026') || period.toLowerCase().includes('presente') || period.toLowerCase().includes('atual');
  if (isCurrent && !degree.toLowerCase().includes('em formação')) {
    return `${degree} (Em formação)`;
  }
  return degree;
}

/**
 * Format certification name with correct status if current year (2026) or "Presente"
 */
function formatCertificationTitle(name: string, date: string): string {
  const isCurrent = date.includes('2026') || date.toLowerCase().includes('presente') || date.toLowerCase().includes('atual');
  if (isCurrent && !name.toLowerCase().includes('especializando-se')) {
    return `${name} (Especializando-se)`;
  }
  return name;
}

/**
 * Generates and downloads a clean, highly formatted, ATS-compliant curriculum PDF using jsPDF.
 * Built strictly according to the portfolio guidelines.
 */
export function generateStaticPDF(portfolioData: any) {
  const {
    settings,
    experiences,
    projects,
    education,
    certifications,
    techCategories
  } = portfolioData || {};

  // Filter out unwanted experiences (non-tech ones like food or travel agency)
  const filteredExperiences = (experiences || []).filter((exp: any) => {
    const companyName = (exp.company || '').toLowerCase();
    const roleName = (exp.role || '').toLowerCase();
    
    const isGugaSabor = companyName.includes('guga sabor') || companyName.includes('sabor artesanal') || roleName.includes('guga sabor');
    const isSouzaSilva = companyName.includes('souza & silva') || companyName.includes('souza e silva') || companyName.includes('viagens');
    
    return !isGugaSabor && !isSouzaSilva;
  });

  // Sort certifications by relevance (internationals first)
  const sortedCertifications = [...(certifications || [])].sort((a: any, b: any) => {
    const isAInternational = a.issuer.toLowerCase().includes('google') || a.issuer.toLowerCase().includes('cloud');
    const isBInternational = b.issuer.toLowerCase().includes('google') || b.issuer.toLowerCase().includes('cloud');
    if (isAInternational && !isBInternational) return -1;
    if (!isAInternational && isBInternational) return 1;
    return 0;
  });

  // Initialize jsPDF with standard A4 settings
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const marginX = 15;
  const writableWidth = 180;
  const pageHeight = 297;
  const marginBottom = 15;
  let currentY = 15;

  // Helper to ensure page flow and prevent text overflow
  const checkPageBreak = (heightNeeded: number) => {
    if (currentY + heightNeeded > pageHeight - marginBottom) {
      doc.addPage();
      currentY = 15;
      return true;
    }
    return false;
  };

  // Helper to draw clean inline bold formatted text
  const drawInlineFormattedText = (text: string, x: number, y: number, fontSize: number, normalColor: number[], boldColor: number[]) => {
    const parts = text.split('**');
    let currentX = x;
    parts.forEach((part, idx) => {
      const isBold = idx % 2 === 1;
      doc.setFont('helvetica', isBold ? 'bold' : 'normal');
      doc.setFontSize(fontSize);
      const color = isBold ? boldColor : normalColor;
      doc.setTextColor(color[0], color[1], color[2]);
      doc.text(part, currentX, y);
      currentX += doc.getTextWidth(part);
    });
  };

  // Helper to draw a paragraph or multiline bullet list with inline formatting support
  const drawParagraphOrBullets = (text: string, x: number, width: number) => {
    const lines = text.split('\n');
    lines.forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed) return;
      if (trimmed.startsWith('-') || trimmed.startsWith('•')) {
        const bulletText = trimmed.substring(1).trim();
        const wrapped = doc.splitTextToSize(bulletText, width - 4);
        wrapped.forEach((wl: string, idx: number) => {
          checkPageBreak(3.8);
          if (idx === 0) {
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(8.5);
            doc.setTextColor(51, 65, 85);
            doc.text('•', x, currentY);
          }
          drawInlineFormattedText(wl, x + 3.5, currentY, 8.5, [51, 65, 85], [15, 23, 42]);
          currentY += 3.8;
        });
      } else {
        const wrapped = doc.splitTextToSize(trimmed, width);
        wrapped.forEach((wl: string) => {
          checkPageBreak(3.8);
          drawInlineFormattedText(wl, x, currentY, 8.5, [51, 65, 85], [15, 23, 42]);
          currentY += 3.8;
        });
      }
    });
  };

  // Helper to draw clean sections
  const drawSectionHeader = (title: string) => {
    checkPageBreak(12);
    currentY += 2;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(5, 150, 105); // #059669 - Accent Green
    doc.text(title.toUpperCase(), marginX, currentY + 3);

    // Draw a thin separator line
    doc.setDrawColor(226, 232, 240); // #e2e8f0
    doc.setLineWidth(0.3);
    doc.line(marginX, currentY + 5, marginX + writableWidth, currentY + 5);

    currentY += 10;
  };

  // --- 1. HEADER (Contact info & Name) ---
  const name = settings?.name || 'Gustavo Souza';
  const role = settings?.title || 'Software Engineer | Full Stack | Mobile | DevSecOps | AppSec';
  const email = settings?.email || 'contato@gustavosouza.dev.br';
  const linkedin = settings?.linkedin ? settings.linkedin.replace('https://www.', '').replace('https://', '') : 'linkedin.com/in/gustavosouza-jp/';
  const github = settings?.github ? settings.github.replace('https://', '') : 'github.com/gustavogss';

  // Draw Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(15, 23, 42); // #0f172a
  doc.text(name, marginX, currentY + 5);
  currentY += 7;

  // Draw Role
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11.5);
  doc.setTextColor(5, 150, 105); // #059669
  doc.text(role, marginX, currentY + 4);
  currentY += 7;

  // Draw Contact Row
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105); // #475569
  const contactText = `Email: ${email}  |  LinkedIn: ${linkedin}  |  GitHub: ${github}`;
  doc.text(contactText, marginX, currentY + 2);
  currentY += 6;

  // Header separator line
  doc.setDrawColor(16, 185, 129); // Brand teal line
  doc.setLineWidth(0.8);
  doc.line(marginX, currentY, marginX + writableWidth, currentY);
  currentY += 8;

  // --- 2. SUMMARY (About) ---
  if (settings?.description) {
    drawSectionHeader('Resumo Profissional');
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(51, 65, 85); // #334155
    
    const summaryLines = doc.splitTextToSize(settings.description, writableWidth);
    const neededHeight = (summaryLines.length * 4.2) + 2;
    checkPageBreak(neededHeight);

    summaryLines.forEach((line: string) => {
      doc.text(line, marginX, currentY);
      currentY += 4.2;
    });
    currentY += 4;
  }

  // --- 4. WORK EXPERIENCE ---
  if (filteredExperiences && filteredExperiences.length > 0) {
    drawSectionHeader('Experiência Profissional');

    filteredExperiences.forEach((exp: any) => {
      const roleTitle = `${exp.role} @ ${exp.company}`;
      const period = exp.period || '';
      
      checkPageBreak(12);

      // Draw Role/Company
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(15, 23, 42); // #0f172a
      doc.text(roleTitle, marginX, currentY);

      // Draw Period (Right Aligned)
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(71, 85, 105); // #475569
      doc.text(period, marginX + writableWidth, currentY, { align: 'right' });

      currentY += 5;

      // Draw Description with bullets support
      if (exp.description) {
        drawParagraphOrBullets(exp.description, marginX, writableWidth);
      }

      currentY += 4; // block gap
    });
  }

  // --- 5. PROJECTS (Projetos) ---
  if (projects && projects.length > 0) {
    drawSectionHeader('Projetos Selecionados');

    projects.forEach((proj: any) => {
      checkPageBreak(12);
      
      // Draw Project Name
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(15, 23, 42);
      doc.text(proj.name, marginX, currentY);
      currentY += 5;

      // Draw description
      if (proj.description) {
        drawParagraphOrBullets(proj.description, marginX, writableWidth);
      }

      currentY += 4;
    });
  }

  // --- 6. EDUCATION ---
  if (education && education.length > 0) {
    drawSectionHeader('Formação Acadêmica');

    education.forEach((edu: any) => {
      const formattedDegree = formatEducationTitle(edu.degree, edu.period || '');
      const detailText = `${edu.institution}  •  ${edu.period || ''}`;
      const descText = edu.description || '';

      checkPageBreak(12);

      // Draw Degree Name
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(15, 23, 42);
      doc.text(formattedDegree, marginX, currentY);
      currentY += 4.2;

      // Draw Institution & Period
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(5, 150, 105); // green text
      doc.text(detailText, marginX, currentY);
      currentY += 4.5;

      // Draw Description if exists
      if (descText) {
        drawParagraphOrBullets(descText, marginX, writableWidth);
      }

      currentY += 4; // spacing between education blocks
    });
  }

  // --- 7. CERTIFICATIONS ---
  if (sortedCertifications && sortedCertifications.length > 0) {
    drawSectionHeader('Certificações');

    sortedCertifications.forEach((cert: any) => {
      const formattedCertName = formatCertificationTitle(cert.name, cert.date || '');
      const certInfo = `${cert.issuer}  •  ${cert.date || ''}`;

      checkPageBreak(9);

      // Draw Certification Title
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(15, 23, 42);
      doc.text(formattedCertName, marginX, currentY);
      currentY += 4;

      // Draw Issuer and Date
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(71, 85, 105);
      doc.text(certInfo, marginX, currentY);

      currentY += 4.5;
    });
  }

  // --- 8. SKILLS / TECHNOLOGIES ---
  if (techCategories && techCategories.length > 0) {
    drawSectionHeader('Habilidades Técnicas');

    techCategories.forEach((cat: any) => {
      const catTitle = cat.title || '';
      const itemsText = cat.items ? cat.items.join(', ') : '';

      checkPageBreak(9);

      // Draw Category Name
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(15, 23, 42);
      doc.text(`${catTitle}:`, marginX, currentY);

      // Draw items (Indented slightly on the right side)
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(51, 65, 85);
      
      const xOffset = 38; // standard alignment offset
      
      // Calculate split text based on available width from xOffset
      const wrappedItems = doc.splitTextToSize(itemsText, writableWidth - xOffset);
      
      wrappedItems.forEach((line: string, idx: number) => {
        checkPageBreak(3.8);
        doc.text(line, marginX + xOffset, currentY + (idx * 3.8));
      });

      currentY += (wrappedItems.length * 3.8) + 3;
    });
  }

  // --- 9. LANGUAGES (Idiomas) ---
  drawSectionHeader('Idiomas');
  checkPageBreak(8);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text('Português:', marginX, currentY);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  doc.text('Nativo (Fluência total)', marginX + 25, currentY);
  currentY += 4.5;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text('Inglês:', marginX, currentY);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  doc.text('Intermediário (Nível B1)', marginX + 25, currentY);
  currentY += 6;

  // Save the document
  const fileName = `${name.replace(/\s+/g, '_')}_Curriculo.pdf`;
  doc.save(fileName);
}
