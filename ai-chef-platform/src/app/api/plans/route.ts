import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/backend/db/connect";
import User, { type UserDoc } from "@/backend/models/User";
import MealPlan from "@/backend/models/MealPlan";

export async function GET(req: NextRequest) {
  await connectToDatabase();
  const email = req.nextUrl.searchParams.get("email");
  if (!email) return NextResponse.json({ error: "email required" }, { status: 400 });
  const user = (await User.findOne({ email }).lean()) as (UserDoc | null);
  if (!user) return NextResponse.json({ plans: [] });
  const plans = await MealPlan.find({ userId: user._id }).sort({ createdAt: -1 }).limit(20).lean();
  return NextResponse.json({ plans });
}
