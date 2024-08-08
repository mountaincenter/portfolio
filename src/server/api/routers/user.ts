import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { userHandler } from "@/server/handlers/userHandler";

export const userRouter = createTRPCRouter({
  getUserById: protectedProcedure.query(async ({ ctx }) => {
    return await userHandler.getUserById(ctx.session.user.id);
  }),
});
