import { PrismaClient, type List } from "@prisma/client";

const prisma = new PrismaClient();

export const listHandler = {
  async getAllLists(): Promise<List[]> {
    return await prisma.list.findMany({
      include: {
        tasks: {
          include: {
            user: true,
          },
        },
      },
    });
  },
  async createList(data: { title: string; boardId: number }): Promise<List> {
    return await prisma.list.create({
      data: {
        title: data.title,
        boardId: data.boardId,
      },
    });
  },
  async updateList(
    id: number,
    data: { title?: string; boardId?: number },
  ): Promise<List> {
    return await prisma.list.update({
      where: { id },
      data: data,
    });
  },
  async deleteList(id: number): Promise<List> {
    return await prisma.list.delete({
      where: { id },
    });
  },
};
