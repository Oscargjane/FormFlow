import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { userRouter } from "@/server/api/routers/userRouter";
import { notionRouter } from "@/server/api/routers/notion";

// Primary router: aggregates all routers from /api/routers
export const appRouter = createTRPCRouter({
  users: userRouter,
  notion: notionRouter
});

// Export API type for type-safety between client and server
export type AppRouter = typeof appRouter;

// Create a server-side caller for direct procedure calls (useful for SSR/testing)
export const createCaller = createCallerFactory(appRouter);
