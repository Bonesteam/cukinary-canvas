import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/backend/db/connect";
import User from "@/backend/models/User";

export async function GET() {
  await connectToDatabase();
  const users = await User.find().limit(20).lean();
  return NextResponse.json({ users });
}

export async function POST(req: NextRequest) {
  await connectToDatabase();
  const body = await req.json();
  const user = await User.create(body);
  return NextResponse.json({ user }, { status: 201 });
}
