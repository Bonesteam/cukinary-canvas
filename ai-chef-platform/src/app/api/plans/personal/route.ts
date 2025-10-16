import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/backend/db/connect";
import ChefRequest from "@/backend/models/ChefRequest";

export async function POST(req: NextRequest) {
  await connectToDatabase();
  const details = await req.json();
  const request = await ChefRequest.create(details);
  return NextResponse.json({ requestId: request._id, status: request.status });
}
