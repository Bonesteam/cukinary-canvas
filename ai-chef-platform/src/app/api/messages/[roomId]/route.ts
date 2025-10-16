import { NextResponse } from "next/server";
import { connectToDatabase } from "@/backend/db/connect";
import Message from "@/backend/models/Message";

export async function GET(_req: Request, { params }: { params: Promise<{ roomId: string }> }) {
  await connectToDatabase();
  const { roomId } = await params;
  const messages = await Message.find({ roomId }).sort({ createdAt: 1 }).lean();
  return NextResponse.json({ messages });
}

export async function POST(req: Request, { params }: { params: Promise<{ roomId: string }> }) {
  await connectToDatabase();
  const { roomId } = await params;
  const { fromUserId, toUserId, text } = await req.json();
  const msg = await Message.create({ roomId, fromUserId, toUserId, text });
  return NextResponse.json({ message: msg }, { status: 201 });
}
