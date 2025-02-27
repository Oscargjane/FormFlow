import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

/**
 * Environment configuration with validation.
 * Ensures required variables are set before starting the app.
 */
export const env = createEnv({
  server: {
    // Database
    DATABASE_URL: z.string().url(),
    DIRECT_URL: z.string().url(),

    // App environment
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),

    // Notion API
    NOTION_API_KEY: z.string(),
    NOTION_DATABASE_ID: z.string(),

    // Notion OAuth
    AUTH_NOTION_ID: z.string(),
    AUTH_NOTION_SECRET: z.string(),
    AUTH_NOTION_REDIRECT_URI: z.string().url(),

    // NextAuth.js
    NEXTAUTH_SECRET: z.string().min(32),
    NEXTAUTH_URL: z.string().url(),
  },

  client: {}, // No client-side env variables for now

  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    DIRECT_URL: process.env.DIRECT_URL,
    NODE_ENV: process.env.NODE_ENV,
    NOTION_API_KEY: process.env.NOTION_API_KEY,
    NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID,
    AUTH_NOTION_ID: process.env.AUTH_NOTION_ID,
    AUTH_NOTION_SECRET: process.env.AUTH_NOTION_SECRET,
    AUTH_NOTION_REDIRECT_URI: process.env.AUTH_NOTION_REDIRECT_URI,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
});