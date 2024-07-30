import { PrismaClient, type HealthMetrics } from "@prisma/client";

const prisma = new PrismaClient();

export const healthMetricsHandler = {
  async getAllHealthMetrics(): Promise<HealthMetrics[]> {
    return await prisma.healthMetrics.findMany();
  },
  async getHealthMetrics(id: number): Promise<HealthMetrics | null> {
    return await prisma.healthMetrics.findUnique({
      where: { id },
    });
  },
  async getHealthMetricsByUserId(
    userId: string,
  ): Promise<HealthMetrics | null> {
    return await prisma.healthMetrics.findFirst({
      where: { userId },
      orderBy: { measurementDate: "desc" }, // 最新の計測値を取得
    });
  },
  async createHealthMetrics(data: {
    weight: number;
    bodyFat?: number | null;
    measurementDate: Date;
    userId: string;
  }): Promise<HealthMetrics> {
    return await prisma.healthMetrics.create({
      data,
    });
  },
  async updateHealthMetrics(
    id: number,
    data: Partial<Omit<HealthMetrics, "id" | "createdAt" | "updatedAt">>,
  ): Promise<HealthMetrics> {
    return await prisma.healthMetrics.update({
      where: { id },
      data,
    });
  },
  async deleteHealthMetrics(id: number): Promise<HealthMetrics> {
    return await prisma.healthMetrics.delete({
      where: { id },
    });
  },
};
