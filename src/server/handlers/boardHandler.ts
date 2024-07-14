import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const boardHandler = {
  async getAllBoards() {
    return await prisma.board.findMany();
  },
  async createBoard(title: string) {
    return await prisma.board.create({
      data: {
        title,
      },
    });
  },
  async updateBoard(id: number, title: string) {
    return await prisma.board.update({
      where: { id },
      data: { title },
    });
  },
  async deleteBoard(id: number) {
    return await prisma.board.delete({
      where: { id },
    });
  },
};
