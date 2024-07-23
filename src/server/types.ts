import {
  type User as PrismaUser,
  type Task as PrismaTask,
  type Status as PrismaStatus,
  type List as PrismaList,
} from "@prisma/client";

export type User = PrismaUser;
export type Task = PrismaTask;
export type Status = PrismaStatus;
export type Lists = PrismaList;
