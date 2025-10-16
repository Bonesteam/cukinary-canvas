import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/backend/db/connect";
import User from "@/backend/models/User";
import Transaction from "@/backend/models/Transaction";

export async function POST(req: NextRequest) {
  await connectToDatabase();
  const { email, tokens, currency = "GBP", amount } = await req.json();
  if (!email || !tokens) return NextResponse.json({ error: "email and tokens required" }, { status: 400 });
  const user = await User.findOneAndUpdate({ email }, { $inc: { tokens } }, { new: true, upsert: true });
  await Transaction.create({ userId: user._id, type: "purchase", amountTokens: tokens, currency, amountCurrency: amount });
  return NextResponse.json({ success: true, balance: user.tokens });
}
