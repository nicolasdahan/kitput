import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

// This is the base configuration without database adapter
// Safe to use in edge runtimes (proxy/middleware)
// OAuth providers are in auth.ts since they're not needed in edge runtime
export default {
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // Note: authorize function will be overridden in auth.ts
      // This is just a placeholder for the config
      async authorize(credentials) {
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

