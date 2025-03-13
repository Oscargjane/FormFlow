import { Client } from "@notionhq/client";
import { TRPCError } from "@trpc/server";
import { db } from "@/server/db";

// Singleton client instance to avoid redundant initializations
let notionClient: Client | null = null;
let cachedUserId: string | null = null;

/**
 * Initializes and returns an authenticated Notion client for the given user.
 *
 * Process:
 * 1. Checks if a cached client exists for the user, returning it if available.
 * 2. Retrieves the Notion access token from the database.
 * 3. Creates and caches a new Notion client if necessary.
 *
 * @param userId - The authenticated user's ID
 * @returns A Notion client instance authenticated with the user's token
 */
export async function getNotionClient(userId: string): Promise<Client> {
  try {
    // Return the cached client if it exists for the same user
    if (notionClient && cachedUserId === userId) {
      return notionClient;
    }

    // Retrieve Notion access token from the database
    const account = await db.account.findFirst({
      where: {
        userId,
        provider: "notion",
      },
      select: {
        access_token: true,
      },
    });

    if (!account?.access_token) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Notion account not connected",
      });
    }

    // Initialize and cache the Notion client
    notionClient = new Client({
      auth: account.access_token,
    });
    cachedUserId = userId;

    return notionClient;
  } catch (error) {
    console.error("Error initializing Notion client:", error);

    // Propagate existing TRPC errors
    if (error instanceof TRPCError) {
      throw error;
    }

    // Handle unexpected errors
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to initialize Notion client",
    });
  }
}
