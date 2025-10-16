import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect chef routes: require role=chef in a real implementation
  if (pathname.startsWith("/chef")) {
    // In a full setup, decode session/JWT here. For now, block by default.
    const role = req.cookies.get("role")?.value; // placeholder; replace with NextAuth token decode
    if (role !== "chef") {
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
