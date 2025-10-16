import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/backend/db/connect";
import MealPlan from "@/backend/models/MealPlan";
import User from "@/backend/models/User";
import Transaction from "@/backend/models/Transaction";
import { generateAIPlan } from "@/backend/services/aiChef.service";
import { calculateTotalTokens } from "@/backend/utils/tokenCalculator";

export async function POST(req: NextRequest) {
  await connectToDatabase();
  const body = await req.json();
  const { userId, selections, notes } = body as { userId: string; selections: Array<{ key: string; label: string; cost: number }>; notes?: string };

  const totalTokens = calculateTotalTokens(selections);
  const user = await User.findById(userId);
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
  if ((user.tokens ?? 0) < totalTokens) return NextResponse.json({ error: "Insufficient tokens" }, { status: 402 });

  // Reserve tokens
  user.tokens = (user.tokens ?? 0) - totalTokens;
  await user.save();
  await Transaction.create({ userId: user._id, type: "consume", amountTokens: totalTokens, currency: "GBP", amountCurrency: 0 });

  const prompt = buildPrompt(selections, notes);
  const aiText = await generateAIPlan(prompt);
  const plan = await MealPlan.create({ userId: user._id, type: "ai", config: { selections, notes }, status: "ready" });
  // For now store AI text in config.result
  plan.set("config.result", aiText);
  await plan.save();
  return NextResponse.json({ planId: plan._id, status: plan.status, result: aiText });
}

function buildPrompt(selections: Array<{ key: string; label: string }>, notes?: string): string {
  const lines = selections.map(s => `- ${s.label}`);
  const extra = notes ? `\nNotes: ${notes}` : "";
  return `Generate a 7-day meal plan matching these preferences:\n${lines.join("\n")}${extra}`;
}
