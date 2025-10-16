import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/backend/db/connect";
import MealPlan from "@/backend/models/MealPlan";

export async function POST(req: NextRequest) {
  await connectToDatabase();
  const config = await req.json();
  const plan = await MealPlan.create({ userId: config.userId, type: "ai", config, status: "in_progress" });
  // Placeholder: enqueue AI generation
  return NextResponse.json({ planId: plan._id, status: plan.status });
}
