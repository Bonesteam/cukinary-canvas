import NextAuth from "next-auth";
import { JWT as BaseJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    userId?: string;
    role?: "customer" | "chef";
    user?: {
      email?: string | null;
    } & DefaultSession["user"]; // keep default props
  }
}

declare module "next-auth/jwt" {
  interface JWT extends BaseJWT {
    userId?: string;
    role?: "customer" | "chef";
    email?: string | null;
  }
}
