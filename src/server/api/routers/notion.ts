import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { getNotionClient } from "@/server/notion/client";
import { z } from "zod";

// Schema for a Notion database response
const NotionDatabaseSchema = z.object({
  id: z.string(),
  name: z.string(),
  icon: z.string().nullable(),
  lastEdited: z.string(),
  url: z.string().optional(),
});

// Schema for the list of Notion databases response
const NotionDatabasesResponseSchema = z.object({
  databases: z.array(NotionDatabaseSchema),
});

// Type definition inferred from schema
export type NotionDatabasesResponse = z.infer<typeof NotionDatabasesResponseSchema>;

export const notionRouter = createTRPCRouter({
  /**
   * Retrieves a list of Notion databases linked to the user's account.
   *
   * Process:
   * 1. Extract user ID from session
   * 2. Initialize a Notion client using the user’s authentication token
   * 3. Query Notion API to fetch all databases in the user’s workspace
   * 4. Format and return the retrieved databases
   */
  listDatabases: protectedProcedure.query(async ({ ctx }) => {
    try {
      // Extract user ID from session
      const userId = ctx.session.user.id;
      if (!userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User ID is missing from session",
        });
      }

      // Initialize Notion API client
      const client = await getNotionClient(userId);

      // Fetch databases from Notion
      const response = await client.search({
        filter: { property: "object", value: "database" },
        // Optional: Sorting or pagination parameters can be added if needed
        // sort: { direction: "descending", timestamp: "last_edited_time" },
        // page_size: 20,
      });

      // Format the response to match the expected schema
      const databases = response.results.map((db: any) => ({
        id: db.id,
        name: db.title?.[0]?.plain_text || "Untitled Database",
        icon: db.icon?.emoji || db.icon?.external?.url || null,
        lastEdited: db.last_edited_time,
        url: db.url,
      }));

      // Validate the final output before returning
      return NotionDatabasesResponseSchema.parse({ databases });
    } catch (error: any) {
      console.error("Error listing Notion databases:", error);

      // Propagate existing TRPC errors
      if (error instanceof TRPCError) {
        throw error;
      }

      // Handle Notion-specific errors
      if (error.code === "unauthorized") {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Your Notion connection has expired or is invalid",
        });
      }
      if (error.code === "rate_limited") {
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message: "Rate limit exceeded for Notion API",
        });
      }

      // Fallback for unknown errors
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch databases from Notion",
      });
    }
  }),
});
