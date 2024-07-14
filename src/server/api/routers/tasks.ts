import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { taskHandler } from "@/server/handlers/taskHandler";
import { Status } from "@prisma/client";

export const taskRouter = createTRPCRouter({
  getAllTasks: publicProcedure.query(async () => {
    return await taskHandler.getAllTasks();
  }),

  createTask: publicProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string().optional(),
        dueDate: z.string().optional(),
        status: z.nativeEnum(Status),
        userId: z.string(),
        listId: z.number(),
      }),
    )
    .mutation(async ({ input }) => {
      return await taskHandler.createTask({
        title: input.title,
        description: input.description,
        dueDate: input.dueDate ? new Date(input.dueDate) : undefined,
        status: input.status,
        userId: input.userId,
        listId: input.listId,
      });
    }),

  updateTask: publicProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string().optional(),
        description: z.string().optional(),
        dueDate: z.string().optional(),
        status: z.nativeEnum(Status).optional(),
        listId: z.number().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      return await taskHandler.updateTask(input.id, {
        title: input.title,
        description: input.description,
        dueDate: input.dueDate ? new Date(input.dueDate) : undefined,
        status: input.status,
        listId: input.listId,
      });
    }),

  deleteTask: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      return await taskHandler.deleteTask(input.id);
    }),
});
