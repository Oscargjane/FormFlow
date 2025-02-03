import { PrismaClient } from "@prisma/client";

import { env } from "@/env";

const createPrismaClient = () =>
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

  // Define a global variable to store the PrismaClient instance
const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

// Export the PrismaClient instance, reusing the global instance if it exists
export const db = globalForPrisma.prisma ?? createPrismaClient();

// Store the instance in the global context in non-production environments
if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
