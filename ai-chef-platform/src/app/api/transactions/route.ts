import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/backend/db/connect";
import User from "@/backend/models/User";
import Transaction from "@/backend/models/Transaction";

export async function GET(req: NextRequest) {
  await connectToDatabase();
  const email = req.nextUrl.searchParams.get("email");
  if (!email) return NextResponse.json({ error: "email required" }, { status: 400 });
  const user = await User.findOne({ email }).lean();
  if (!user) return NextResponse.json({ transactions: [] });
  const transactions = await Transaction.find({ userId: user._id }).sort({ createdAt: -1 }).limit(50).lean();
  return NextResponse.json({ transactions });
}
