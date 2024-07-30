import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { healthMetricsHandler } from "@/server/handlers/healthMetricsHandler";

// Health Metrics の入力バリデーションスキーマを定義
const healthMetricsSchema = z.object({
  weight: z.number(),
  bodyFat: z.number().nullable().optional(),
  measurementDate: z.date(),
  userId: z.string(),
});

export const healthMetricsRouter = createTRPCRouter({
  getAllHealthMetrics: publicProcedure.query(async () => {
    return await healthMetricsHandler.getAllHealthMetrics();
  }),

  getHealthMetrics: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return await healthMetricsHandler.getHealthMetrics(input.id);
    }),

  getHealthMetricsByUserId: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(({ input }) => {
      return healthMetricsHandler.getHealthMetricsByUserId(input.userId);
    }),

  createHealthMetrics: publicProcedure
    .input(healthMetricsSchema)
    .mutation(async ({ input }) => {
      return await healthMetricsHandler.createHealthMetrics(input);
    }),

  updateHealthMetrics: publicProcedure
    .input(
      z.object({
        id: z.number(),
        data: healthMetricsSchema,
      }),
    )
    .mutation(async ({ input }) => {
      return await healthMetricsHandler.updateHealthMetrics(
        input.id,
        input.data,
      );
    }),

  deleteHealthMetrics: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      return await healthMetricsHandler.deleteHealthMetrics(input.id);
    }),
});
