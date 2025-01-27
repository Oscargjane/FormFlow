import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here.
   * This ensures the app isn't built with invalid env vars.
   */
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    NOTION_API_KEY: z.string(),
    NOTION_DATABASE_ID: z.string()
  },

   /**
   * Specify your client-side environment variables schema here.
   * To expose them to the client, prefix them with `NEXT_PUBLIC_`.
   * Currently, no client-side environment variables are defined.
   */
   client: {
    // Example: NEXT_PUBLIC_CLIENTVAR: z.string(),
  },

    /**
   * Define runtime environment variables.
   * These are the variables that will actually be used in the application.
   */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    NOTION_API_KEY: process.env.NOTION_API_KEY,
    NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID,
  },
});
