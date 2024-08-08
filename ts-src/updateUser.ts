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
