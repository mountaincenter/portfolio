import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { userHandler } from "@/server/handlers/userHandler";
import { z } from "zod";

// Updateに必要なスキーマ定義
const userUpdateSchema = z.object({
  height: z.number().optional(),
});

export const userRouter = createTRPCRouter({
  getUserById: protectedProcedure.query(async ({ ctx }) => {
    return await userHandler.getUserById(ctx.session.user.id);
  }),

  update: protectedProcedure
    .input(userUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      // 正しいメソッド名を使用して更新処理を行う
      return await userHandler.update(ctx.session.user.id, input);
    }),
});
