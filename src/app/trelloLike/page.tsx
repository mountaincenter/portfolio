/**
 * v0 by Vercel.
 * @see https://v0.dev/t/XxZkNffiRpg
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import React from "react";
import { listHandler } from "@/server/handlers/listHandler";
import TrelloContainer from "@/app/_components/TrelloLike/TorelloContainer";

const Page = async () => {
  const lists = await listHandler.getAllLists();
  console.log(lists);

  return (
    <div className="flex h-screen flex-col bg-background text-foreground dark:bg-background dark:text-foreground">
      <main className="flex-1 bg-muted/40 p-6 dark:bg-muted">
        <TrelloContainer lists={lists} />
      </main>
    </div>
  );
};

export default Page;
