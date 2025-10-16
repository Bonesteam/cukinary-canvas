import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/backend/db/connect";
import ChefRequest from "@/backend/models/ChefRequest";
import { getUserFromRequest } from "@/backend/utils/authHelper";

export async function POST(req: NextRequest) {
  await connectToDatabase();
  const auth = await getUserFromRequest(req);
  if (!auth || auth.role !== 'chef' || !auth.userId) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  const { requestId } = await req.json();
  const updated = await ChefRequest.findByIdAndUpdate(requestId, { assignedChefId: auth.userId, status: 'assigned' }, { new: true });
  return NextResponse.json({ request: updated });
}
