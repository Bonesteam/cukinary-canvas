import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import type { UserRole } from "@/types/user";

type AppToken = { userId?: string; email?: string; role?: UserRole };

export async function getUserFromRequest(req: NextRequest): Promise<AppToken | null> {
  try {
    const token = (await getToken({ req, secret: process.env.NEXTAUTH_SECRET })) as AppToken | null;
    if (!token) return null;
    return { userId: token.userId, email: token.email, role: token.role };
  } catch {
    return null;
  }
}
