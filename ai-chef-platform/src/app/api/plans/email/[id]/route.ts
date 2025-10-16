import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/backend/db/connect";
import MealPlan from "@/backend/models/MealPlan";
import { generatePlanPdf } from "@/backend/services/pdf.service";
import { sendPlanEmail } from "@/backend/services/email.service";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  await connectToDatabase();
  const { id } = params;
  const { to } = await req.json();
  const plan = await MealPlan.findById(id).lean();
  if (!plan) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const content = (plan as any)?.config?.result || "Meal plan";
  const pdf = await generatePlanPdf(`Meal Plan #${id}`, content);
  const res = await sendPlanEmail(to, `Your meal plan #${id}`, content, { filename: `plan-${id}.pdf`, data: Buffer.from(pdf) });
  return NextResponse.json(res);
}
