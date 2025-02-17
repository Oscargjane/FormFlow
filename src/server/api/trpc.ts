/**
 * tRPC Configuration.
 * Edit only if you need to modify the request context or add new middleware/procedures.
 */
import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

import { db } from "@/server/db";

/**
 * 1. CONTEXT
 *
 * Defines the available contexts for the backend API.
 * These contexts provide access to resources (e.g., database, headers) during each request.
 *
 * @see https://trpc.io/docs/server/context
 */
export const createTRPCContext = async (opts: { headers: Headers }) => {
  return {
    db,
    ...opts,
  };
};

/**
 * 2. INITIALIZATION
 *
 * Initializes the tRPC API by connecting the context and setting up the transformer.
 * It also formats errors (including Zod errors) to maintain type-safety on the frontend.
 */
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * Create a server-side caller factory.
 *
 * @see https://trpc.io/docs/server/server-side-calls
 * This allows you to call your tRPC procedures directly from the server (useful for SSR or testing).
 */
export const createCallerFactory = t.createCallerFactory;

/**
 * 3. ROUTER & PROCEDURE
 *
 * These components are used to build your tRPC API. You'll frequently import these in the
 * "/src/server/api/routers" directory.
 *
 * @see https://trpc.io/docs/router
 */

/**
 * Creates new routers and sub-routers in your tRPC API.
 * Routers help you group related endpoints together.
 */
export const createTRPCRouter = t.router;

/**
 * Middleware for timing procedure execution and simulating an artificial delay during development.
 * This can help detect performance issues (e.g., waterfalls) that might not appear in production.
 */
const timingMiddleware = t.middleware(async ({ next, path }) => {
  const start = Date.now();

  if (t._config.isDev) {
    // Artificial delay in development mode
    const waitMs = Math.floor(Math.random() * 400) + 100;
    await new Promise((resolve) => setTimeout(resolve, waitMs));
  }

  const result = await next();

  const end = Date.now();
  console.log(`[TRPC] ${path} took ${end - start}ms to execute`);

  return result;
});

/**
 * Public (unauthenticated) procedure.
 * This is the base building block for creating queries and mutations on your tRPC API.
 * It does not enforce authentication but still provides access to shared context data.
 */
export const publicProcedure = t.procedure.use(timingMiddleware);
