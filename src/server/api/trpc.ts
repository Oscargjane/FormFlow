import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

import { auth } from "@/server/auth/config";
import { db } from "@/server/db";

/**
 * Defines the tRPC request context, providing access to the database and user session.
 */
export const createTRPCContext = async (opts: { headers: Headers }) => {
  const session = await auth()
  return {
    db,
    session,
    ...opts,
  };
};

/**
 * Initializes tRPC with:
 * - Context (database, authentication)
 * - SuperJSON serialization for enhanced data handling
 * - Custom error formatting (Zod validation support)
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

/** Enables direct server-side calls to tRPC procedures (SSR, testing). */
export const createCallerFactory = t.createCallerFactory;

/** Creates a new tRPC router for API endpoints. */
export const createTRPCRouter = t.router;

/**
 * Middleware to measure procedure execution time.
 * In development mode, it introduces a random delay (100-500ms) to simulate network latency.
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

/** Public procedures (accessible to all users). */
export const publicProcedure = t.procedure.use(timingMiddleware);

/** Protected procedures (authentication required). */
export const protectedProcedure = t.procedure
  .use(timingMiddleware)
  .use(({ ctx, next }) => {
    if (!ctx.session?.user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next({
      ctx: {
        session: { ...ctx.session, user: ctx.session.user },
      },
    });
  });