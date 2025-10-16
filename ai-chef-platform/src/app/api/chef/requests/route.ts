import { NextResponse } from "next/server";
import { connectToDatabase } from "@/backend/db/connect";
import ChefRequest from "@/backend/models/ChefRequest";

export async function GET() {
  await connectToDatabase();
  const requests = await ChefRequest.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json({ requests });
}
