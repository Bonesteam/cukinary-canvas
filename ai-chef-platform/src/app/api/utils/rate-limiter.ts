import { NextRequest, NextResponse } from "next/server";

const WINDOW_MS = 60_000;
const MAX = 60;
const store = new Map<string, { count: number; ts: number }>();

export function rateLimit(req: NextRequest): NextResponse | null {
  const ip = req.headers.get("x-forwarded-for") || "ip:local";
  const now = Date.now();
  const entry = store.get(ip);
  if (!entry || now - entry.ts > WINDOW_MS) {
    store.set(ip, { count: 1, ts: now });
    return null;
  }
  if (entry.count >= MAX) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }
  entry.count += 1;
  return null;
}
