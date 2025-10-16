import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/backend/db/connect";
import User, { type UserDoc } from "@/backend/models/User";

export async function GET(req: NextRequest) {
  await connectToDatabase();
  const email = req.nextUrl.searchParams.get("email");
  if (!email) return NextResponse.json({ error: "email required" }, { status: 400 });
  const user = (await User.findOne({ email }).lean()) as (UserDoc | null);
  const tokens = user?.tokens ?? 0;
  return NextResponse.json({ tokens });
}
