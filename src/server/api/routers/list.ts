import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { listHandler } from "@/server/handlers/listHandler";

export const listRouter = createTRPCRouter({
  getAllLists: publicProcedure.query(async () => {
    return await listHandler.getAllLists();
  }),

  createList: publicProcedure
    .input(
      z.object({
        title: z.string(),
        boardId: z.number(),
      }),
    )
    .mutation(async ({ input }) => {
      return await listHandler.createList({
        title: input.title,
        boardId: input.boardId,
      });
    }),

  updateList: publicProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string().optional(),
        boardId: z.number().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const updateData: {
        title?: string;
        boardId?: number;
      } = {
        title: input.title,
        boardId: input.boardId,
      };

      return await listHandler.updateList(input.id, updateData);
    }),

  deleteList: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      return await listHandler.deleteList(input.id);
    }),
});
