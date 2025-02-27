import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc"

/**
 * User router handling authentication-related queries.
 */
export const userRouter = createTRPCRouter({
  /**
   * Retrieves the authentication status of the current user.
   */
  getAuthStatus: protectedProcedure.query(async ({ ctx }) => {
    return {
      message: `Authenticated as ${ctx.session.user.name || 'user'}`,
      email: ctx.session.user.email
    }
  }),
})