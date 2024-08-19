import { PrismaClient, Status } from "@prisma/client";

const prisma = new PrismaClient();

const tasks = [
  {
    title: "Design new homepage",
    description: "Create a new design for the homepage",
    dueDate: "2024-08-15T00:00:00Z",
    status: Status.IMCOMPLETE,
    userId: "cm00dcc3c0000psph9ijwdr2o",
  },
  {
    title: "Write blog post",
    description: "Write a post about the new features",
    dueDate: "2024-08-31T00:00:00Z",
    status: Status.IMCOMPLETE,
    userId: "cm00dcvsk0005psphvqk35j94",
  },
  {
    title: "Implement new feature",
    description: "Implement the new drag and drop feature",
    dueDate: "2024-09-05T00:00:00Z",
    status: Status.PROGRESS,
    userId: "cm00dcc3c0000psph9ijwdr2o",
  },
  {
    title: "Update documentation",
    description: "Update the documentation to reflect recent changes",
    dueDate: "2024-09-10T00:00:00Z",
    status: Status.DONE,
    userId: "cm00dcvsk0005psphvqk35j94",
  },
];

async function main() {
  for (const task of tasks) {
    // タスクを作成
    await prisma.task.create({
      data: {
        title: task.title,
        description: task.description,
        dueDate: new Date(task.dueDate),
        status: task.status,
        userId: task.userId,
      },
    });
  }

  const allTasks = await prisma.task.findMany();
  console.log("allTasks", allTasks);
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
