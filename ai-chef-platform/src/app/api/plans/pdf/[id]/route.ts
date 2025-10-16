import { NextResponse } from "next/server";
import { connectToDatabase } from "@/backend/db/connect";
import MealPlan from "@/backend/models/MealPlan";
import { generatePlanPdf } from "@/backend/services/pdf.service";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectToDatabase();
  const plan = (await MealPlan.findById(id).lean()) as { config?: { result?: string } } | null;
  const content = plan?.config?.result || "No content";
  const title = `Meal Plan #${id}`;
  const pdfBytes = await generatePlanPdf(title, content);
  return new NextResponse(pdfBytes, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=plan-${id}.pdf`,
    },
  });
}
