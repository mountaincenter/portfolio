import React from "react";
import type { GetServerSideProps } from "next";
import type { List, Task } from "@prisma/client";
import { listHandler } from "@/server/handlers/listHandler";

import Test from "@/app/_components/TrelloLike/Test";
import { taskHandler } from "@/server/handlers/taskHandler";

interface PageProps {
  lists: List[];
  tasks: Task[];
}

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  const lists = await listHandler.getAllLists();
  const tasks = await taskHandler.getAllTasks();
  console.log(lists);
  console.log(tasks);
  return {
    props: {
      lists,
      tasks,
    },
  };
};

const Page: React.FC<PageProps> = ({ lists, tasks }) => {
  return <Test tasks={tasks} lists={lists}></Test>;
};

export default Page;
