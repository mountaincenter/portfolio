import { PrismaClient, Status } from "@prisma/client";

const prisma = new PrismaClient();

const tasks = [
  {
    title: "Design new homepage",
    description: "Create a new design for the homepage",
    dueDate: "2023-07-15T00:00:00Z",
    status: Status.TODO,
    userId: "clyjesx8r00006ea58p7dt8cy",
    listTitle: "To Do",
  },
  {
    title: "Write blog post",
    description: "Write a post about the new features",
    dueDate: "2023-07-20T00:00:00Z",
    status: Status.TODO,
    userId: "clyjesx8r00006ea58p7dt8cy",
    listTitle: "To Do",
  },
  {
    title: "Implement new feature",
    description: "Implement the new drag and drop feature",
    dueDate: "2023-07-25T00:00:00Z",
    status: Status.IN_PROGRESS,
    userId: "clyjesx8r00006ea58p7dt8cy",
    listTitle: "In Progress",
  },
  {
    title: "Update documentation",
    description: "Update the documentation to reflect recent changes",
    dueDate: "2023-07-10T00:00:00Z",
    status: Status.DONE,
    userId: "clyjesx8r00006ea58p7dt8cy",
    listTitle: "Done",
  },
];

async function main() {
  // Boardを先に作成して、そのIDを使用してListとTaskを作成する
  const board = await prisma.board.create({
    data: {
      title: "Default Board",
    },
  });

  const listMap: { [key: string]: number } = {};

  for (const task of tasks) {
    // リストが既に存在するか確認
    let list = await prisma.list.findFirst({
      where: {
        title: task.listTitle,
        boardId: board.id,
      },
    });

    // リストが存在しない場合、新しく作成
    if (!list) {
      list = await prisma.list.create({
        data: {
          title: task.listTitle,
          boardId: board.id,
        },
      });
    }

    // リストIDをマップに保存
    listMap[task.listTitle] = list.id;

    // タスクを作成
    await prisma.task.create({
      data: {
        title: task.title,
        description: task.description,
        dueDate: new Date(task.dueDate),
        status: task.status,
        userId: task.userId,
        listId: list.id,
      },
    });
  }

  const allTasks = await prisma.task.findMany();
  console.log("allTasks", allTasks);

  const allBoards = await prisma.board.findMany();
  console.log("allBoards", allBoards);

  const allLists = await prisma.list.findMany();
  console.log("allLists", allLists);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
