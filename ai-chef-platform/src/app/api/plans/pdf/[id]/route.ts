import { NextResponse } from "next/server";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // Placeholder PDF; in Phase 2 we'll generate with pdf-lib
  const pdfBytes = new Uint8Array([37,80,68,70,45]); // %PDF-
  return new NextResponse(pdfBytes, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=plan-${id}.pdf`,
    },
  });
}
