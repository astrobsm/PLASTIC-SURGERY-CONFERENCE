import jsPDF from 'jspdf';
import type { SlideData } from '../types';

/**
 * Export the slide deck to a printable PDF.
 * Each slide is rendered as a landscape page with split layout.
 */
export async function exportToPDF(
  slides: SlideData[],
  includeCitations = true
): Promise<void> {
  const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
  const pageW = 297;
  const pageH = 210;
  const margin = 15;
  const colW = (pageW - margin * 3) / 2;

  for (let i = 0; i < slides.length; i++) {
    if (i > 0) pdf.addPage();
    const slide = slides[i];

    // ── Left/right column positions ──
    const imgCol = slide.layout_hint === 'image-left' ? margin : margin + colW + margin;
    const txtCol = slide.layout_hint === 'image-left' ? margin + colW + margin : margin;

    // ── Image placeholder ──
    pdf.setFillColor(230, 245, 236); // primary-50
    pdf.rect(imgCol, margin, colW, pageH - margin * 2, 'F');
    pdf.setFontSize(10);
    pdf.setTextColor(9, 124, 55);
    const imgLabel = slide.image_queries?.[0] ?? 'Image';
    pdf.text(`[${imgLabel}]`, imgCol + colW / 2, pageH / 2, { align: 'center' });

    // ── Text column ──
    let yPos = margin;

    // Title
    pdf.setFontSize(18);
    pdf.setTextColor(11, 138, 62); // primary-500
    const titleLines = pdf.splitTextToSize(slide.title.replace(/\n/g, ' '), colW);
    pdf.text(titleLines, txtCol, yPos + 8);
    yPos += titleLines.length * 8 + 8;

    // Evidence badge
    pdf.setFontSize(7);
    pdf.setTextColor(100, 100, 100);
    pdf.text(`Evidence: ${slide.evidence_confidence.toUpperCase()}`, txtCol, yPos);
    yPos += 6;

    // Separator line
    pdf.setDrawColor(11, 138, 62);
    pdf.setLineWidth(0.5);
    pdf.line(txtCol, yPos, txtCol + colW, yPos);
    yPos += 6;

    // Bullets
    pdf.setFontSize(10);
    pdf.setTextColor(38, 38, 38);
    for (const bullet of slide.bullets) {
      const bulletLines = pdf.splitTextToSize(`• ${bullet}`, colW - 5);
      if (yPos + bulletLines.length * 5 > pageH - margin - 20) break;
      pdf.text(bulletLines, txtCol + 3, yPos);
      yPos += bulletLines.length * 5 + 2;
    }

    // Citations (bottom of text column)
    if (includeCitations && slide.citations.length > 0) {
      const citY = pageH - margin - slide.citations.length * 4 - 4;
      pdf.setFontSize(6);
      pdf.setTextColor(115, 115, 115);
      pdf.text('SOURCES:', txtCol, citY);
      slide.citations.forEach((cite, ci) => {
        const citStr = `${ci + 1}. ${cite.authors} ${cite.journal} (${cite.year}). ${cite.type === 'pmid' ? 'PMID: ' : 'DOI: '}${cite.id}`;
        const citLines = pdf.splitTextToSize(citStr, colW);
        pdf.text(citLines, txtCol, citY + 4 + ci * 4);
      });
    }

    // Slide number
    pdf.setFontSize(7);
    pdf.setTextColor(163, 163, 163);
    pdf.text(`${i + 1} / ${slides.length}`, pageW - margin, pageH - 5, { align: 'right' });

    // Footer
    pdf.setFontSize(6);
    pdf.text('UNTH — Burns, Plastic & Reconstructive Surgery', margin, pageH - 5);
  }

  pdf.save('DFU-Presentation-UNTH.pdf');
}
