import { PrismaClient, Status, Task, User } from "@prisma/client";

const prisma = new PrismaClient();

export const taskHandler = {
  async getAllTasks(): Promise<(Task & { user: User })[]> {
    return await prisma.task.findMany({
      include: {
        user: true,
      },
    });
  },
  async createTask(data: {
    title: string;
    description?: string;
    dueDate?: Date;
    status: Status;
    userId: string;
    listId: number;
  }): Promise<Task> {
    return await prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        dueDate: data.dueDate,
        status: data.status,
        userId: data.userId,
        listId: data.listId,
      },
    });
  },
  async updateTask(
    id: number,
    data: {
      title?: string;
      description?: string;
      dueDate?: Date;
      status?: Status;
      listId?: number;
    },
  ): Promise<Task> {
    return await prisma.task.update({
      where: { id },
      data: data,
    });
  },
  async deleteTask(id: number): Promise<Task> {
    return await prisma.task.delete({
      where: { id },
    });
  },
};
