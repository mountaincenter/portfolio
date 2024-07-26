import { boardRouter } from "./routers/board";
import { listRouter } from "./routers/list";
import { postRouter } from "./routers/post";
import { taskRouter } from "./routers/task";
import { timeLogRouter } from "./routers/timeLog";

import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  board: boardRouter,
  list: listRouter,
  post: postRouter,
  task: taskRouter,
  timeLog: timeLogRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
