import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { AdapterUser } from "next-auth/adapters";
import type { User as NextAuthUser, Session } from "next-auth";
import type { JWT } from "next-auth/jwt";
import { connectToDatabase } from "@/backend/db/connect";
import User from "@/backend/models/User";

const handler = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: { email: { label: "Email", type: "email" } },
      async authorize(credentials): Promise<NextAuthUser | null> {
        if (!credentials?.email) return null;
        await connectToDatabase();
        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          const created = await User.create({ email: credentials.email });
          return { id: String(created._id), email: created.email, name: created.name || created.email };
        }
        return { id: String(user._id), email: user.email, name: user.name || user.email };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }): Promise<JWT> {
      if (user && typeof (user as AdapterUser).id === "string") {
        (token as JWT & { userId: string }).userId = (user as AdapterUser).id;
      }
      return token as JWT;
    },
    async session({ session, token }): Promise<Session> {
      if ((token as JWT & { userId?: string }).userId) {
        (session as Session & { userId: string }).userId = (token as JWT & { userId: string }).userId;
      }
      return session as Session;
    },
  },
});

export { handler as GET, handler as POST };
