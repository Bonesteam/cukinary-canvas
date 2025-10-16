import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export async function generatePlanPdf(title: string, content: string): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // A4
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const margin = 50;
  const { width, height } = page.getSize();

  page.drawText(title, { x: margin, y: height - margin - 20, size: 20, font: fontBold, color: rgb(0.2, 0.8, 0.5) });

  const lines = wrapText(content, 80);
  let y = height - margin - 60;
  lines.forEach(line => {
    page.drawText(line, { x: margin, y, size: 12, font, color: rgb(0.9, 0.9, 0.95) });
    y -= 16;
  });

  const bytes = await pdfDoc.save();
  return bytes;
}

function wrapText(text: string, width: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = "";
  for (const w of words) {
    if ((current + " " + w).trim().length > width) {
      lines.push(current.trim());
      current = w;
    } else {
      current += " " + w;
    }
  }
  if (current.trim()) lines.push(current.trim());
  return lines;
}
