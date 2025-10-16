import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Protect chef routes: require role=chef
  if (pathname.startsWith("/chef")) {
    if (!token || (token as any).role !== "chef") {
      const url = req.nextUrl.clone();
      url.pathname = "/(routes)/dashboard";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/chef/:path*"],
};
