import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { userRouter } from "@/server/api/routers/userRouter";

// Primary router: aggregates all routers from /api/routers
export const appRouter = createTRPCRouter({
  users: userRouter,
});

// Export API type for type-safety between client and server
export type AppRouter = typeof appRouter;

// Create a server-side caller for direct procedure calls (useful for SSR/testing)
export const createCaller = createCallerFactory(appRouter);
