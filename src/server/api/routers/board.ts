import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { boardHandler } from "@/server/handlers/boardHandler";

export const boardRouter = createTRPCRouter({
  getAllBoards: publicProcedure.query(async () => {
    return await boardHandler.getAllBoards();
  }),

  createBoard: publicProcedure
    .input(
      z.object({
        title: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      return await boardHandler.createBoard(input.title);
    }),

  updateBoard: publicProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      return await boardHandler.updateBoard(input.id, input.title);
    }),

  deleteBoard: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      return await boardHandler.deleteBoard(input.id);
    }),
});
