import NextAuth from "next-auth"
import Notion from "next-auth/providers/notion"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/server/db";
import { env } from "@/env";

/**
 * NextAuth.js authentication setup with:
 * - Notion as an OAuth provider.
 * - Prisma as the database adapter for session management.
 */
export const { 
  handlers,
  signIn,
  signOut,
  auth,
} = NextAuth({
  adapter: PrismaAdapter(db), // Stores user sessions in the database
  providers: [
    Notion({
      clientId: env.AUTH_NOTION_ID,
      clientSecret: env.AUTH_NOTION_SECRET,
      redirectUri:env.AUTH_NOTION_REDIRECT_URI,
    }),
  ],
  callbacks: {
    /**
     * Includes user ID in the session object.
     * Ensures session.user.id is accessible in the frontend.
     */
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  events: {
    /**
     * Automatically sets `emailVerified` when a new user is created.
     * Ensures that every new user is marked as verified upon signup.
     */
    createUser: async ({ user }) => {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  }
})