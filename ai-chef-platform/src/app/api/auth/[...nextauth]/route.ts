import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { AdapterUser } from "next-auth/adapters";
import type { User as NextAuthUser, Session } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { UserRole } from "@/types/user";
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
          const created = await User.create({ email: credentials.email, role: "customer" });
          return { id: String(created._id), email: created.email, name: created.name || created.email };
        }
        return { id: String(user._id), email: user.email, name: user.name || user.email };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }): Promise<JWT> {
      type AppJWT = JWT & { userId?: string; role?: UserRole; email?: string };
      const appToken = token as AppJWT;
      if (user && typeof (user as AdapterUser).id === "string") {
        appToken.userId = (user as AdapterUser).id;
      }
      if (!appToken.role && appToken.email) {
        const dbUser = (await User.findOne({ email: appToken.email }).lean()) as { role?: UserRole } | null;
        if (dbUser?.role) appToken.role = dbUser.role;
      }
      return appToken as JWT;
    },
    async session({ session, token }): Promise<Session> {
      type AppJWT = JWT & { userId?: string; role?: UserRole };
      type AppSession = Session & { userId?: string; role?: UserRole };
      const appToken = token as AppJWT;
      const appSession = session as AppSession;
      if (appToken.userId) appSession.userId = appToken.userId;
      if (appToken.role) appSession.role = appToken.role;
      return appSession as Session;
    },
  },
});

export { handler as GET, handler as POST };
