import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const userHandler = {
  getUserById: async (userId: string) => {
    return await prisma.user.findUnique({
      where: { id: userId },
    });
  },

  update: async (userId: string, data: { height?: number }) => {
    return await prisma.user.update({
      where: { id: userId },
      data,
    });
  },
};
