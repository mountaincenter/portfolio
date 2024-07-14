import {
  type User as PrismaUser,
  type Task as PrismaTask,
  type Status as PrismaStatus,
} from "@prisma/client";

export type User = PrismaUser;
export type Task = PrismaTask;
export type Status = PrismaStatus;
