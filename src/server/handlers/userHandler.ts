import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const userHandler = {
  getUserById: async (userId: string) =>
    prisma.user.findUnique({
      where: { id: userId },
    }),
};
