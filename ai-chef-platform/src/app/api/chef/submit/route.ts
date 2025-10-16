import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/backend/db/connect";
import MealPlan from "@/backend/models/MealPlan";

export async function POST(req: NextRequest) {
  await connectToDatabase();
  const { planId, pdfUrl } = await req.json();
  const plan = await MealPlan.findByIdAndUpdate(planId, { status: "delivered", pdfUrl }, { new: true });
  return NextResponse.json({ plan });
}
