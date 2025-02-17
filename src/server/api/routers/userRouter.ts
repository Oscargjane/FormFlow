import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
  all: publicProcedure.query(async ({ ctx }) => {
    const users = await ctx.db.user.findMany()
    return users;
  }),
});