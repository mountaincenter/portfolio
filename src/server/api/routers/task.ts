import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { taskHandler } from "@/server/handlers/taskHandler";
import { Status } from "@prisma/client";

// Reusable Zod Schemas
const baseTaskSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  dueDate: z.string().optional(),
  status: z.nativeEnum(Status),
  userId: z.string(),
});

const createTaskSchema = baseTaskSchema;

const updateTaskSchema = z
  .object({
    id: z.number(),
  })
  .merge(baseTaskSchema.partial());

// Task Router
export const taskRouter = createTRPCRouter({
  getAllTasks: publicProcedure.query(async () => {
    return await taskHandler.getAllTasks();
  }),

  createTask: publicProcedure
    .input(createTaskSchema)
    .mutation(async ({ input }) => {
      return await taskHandler.createTask({
        ...input,
        dueDate: input.dueDate ? new Date(input.dueDate) : undefined,
      });
    }),

  updateTask: publicProcedure
    .input(updateTaskSchema)
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      return await taskHandler.updateTask(id, {
        ...data,
        dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
      });
    }),

  deleteTask: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      return await taskHandler.deleteTask(input.id);
    }),
});
