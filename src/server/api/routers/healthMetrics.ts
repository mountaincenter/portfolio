import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { healthMetricsHandler } from "@/server/handlers/healthMetricsHandler";

// Health Metrics の入力バリデーションスキーマを定義
const healthMetricsSchema = z.object({
  weight: z.number(),
  bodyFat: z.number().nullable().optional(),
  measurementDate: z.date(),
  userId: z.string(),
});

const healthMetricsUpdateSchema = z.object({
  id: z.number(),
  data: healthMetricsSchema.omit({ userId: true }),
});

export const healthMetricsRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    return await healthMetricsHandler.list(ctx.session.user.id);
  }),

  create: protectedProcedure
    .input(healthMetricsSchema.omit({ userId: true }))
    .mutation(async ({ ctx, input }) => {
      return await healthMetricsHandler.create({
        ...input,
        userId: ctx.session.user.id,
      });
    }),

  update: protectedProcedure
    .input(healthMetricsUpdateSchema)
    .mutation(async ({ input }) => {
      return await healthMetricsHandler.update(input.id, input.data);
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      return await healthMetricsHandler.delete(input.id);
    }),
});
