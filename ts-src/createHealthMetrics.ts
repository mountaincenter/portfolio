import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const users = [
  {
    id: "clyjesx8r00006ea58p7dt8cy",
    name: "yama07654",
    email: "y_hiroyuki2000@yahoo.co.jp",
    image: "https://cdn.discordapp.com/embed/avatars/0.png",
    height: 175, // 身長情報を追加
  },
  {
    id: "clzaqfo810006wtvy93xj2y1u",
    name: "hihihi30.",
    email: "y.hiroyuki560730@gmail.com",
    image:
      "https://cdn.discordapp.com/avatars/1268413477194829866/387aabe6a1c31788b6fb913f66f13db7.png",
  },
];

const healthMetrics = [
  {
    weight: 70,
    bodyFat: 20,
    measurementDate: "2023-07-15T00:00:00Z",
    userId: "clyjesx8r00006ea58p7dt8cy",
  },
  {
    weight: 68,
    bodyFat: 18,
    measurementDate: "2023-07-20T00:00:00Z",
    userId: "clyjesx8r00006ea58p7dt8cy",
  },
  {
    weight: 72,
    bodyFat: 22,
    measurementDate: "2023-07-25T00:00:00Z",
    userId: "clyjesx8r00006ea58p7dt8cy",
  },
  {
    weight: 69,
    bodyFat: 19,
    measurementDate: "2023-07-10T00:00:00Z",
    userId: "clyjesx8r00006ea58p7dt8cy",
  },
];

async function main() {
  // ユーザーをデータベースに作成または更新
  await Promise.all(
    users.map((user) =>
      prisma.user.upsert({
        where: { id: user.id },
        update: { height: user.height }, // 身長情報を更新
        create: {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          height: user.height, // 身長情報を追加
        },
      }),
    ),
  );

  // clyjesx8r00006ea58p7dt8cy ユーザーのために HealthMetrics を作成
  await prisma.healthMetrics.createMany({
    data: healthMetrics.map((metric) => ({
      weight: metric.weight,
      bodyFat: metric.bodyFat,
      measurementDate: new Date(metric.measurementDate),
      userId: metric.userId,
    })),
  });

  const allHealthMetrics = await prisma.healthMetrics.findMany();
  console.log("allHealthMetrics", allHealthMetrics);

  const allUsers = await prisma.user.findMany();
  console.log("allUsers", allUsers);
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
