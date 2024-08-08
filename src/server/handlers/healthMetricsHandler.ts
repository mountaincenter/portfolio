import { PrismaClient, type HealthMetrics } from "@prisma/client";

const prisma = new PrismaClient();

export const healthMetricsHandler = {
  list: async (userId: string) =>
    prisma.healthMetrics.findMany({
      where: { userId },
      orderBy: { measurementDate: "desc" },
    }),
  create: async (data: {
    weight: number;
    bodyFat?: number | null;
    measurementDate: Date;
    userId: string;
  }): Promise<HealthMetrics> =>
    await prisma.healthMetrics.create({
      data,
    }),
  update: async (
    id: number,
    data: Partial<Omit<HealthMetrics, "id" | "createdAt" | "updatedAt">>,
  ): Promise<HealthMetrics> =>
    await prisma.healthMetrics.update({
      where: { id },
      data,
    }),
  delete: async (id: number): Promise<HealthMetrics> =>
    await prisma.healthMetrics.delete({
      where: { id },
    }),
};
