import Link from "next/link";
import Dnd from "@/app/_components/Dnd/page";
import TrelloDnd from "@/app/_components/TrelloDnd/page";

import { getServerAuthSession } from "@/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <div className="flex h-screen w-full flex-col bg-background text-foreground dark:bg-background dark:text-foreground">
      <main className="flex-1 bg-muted/40 p-6 dark:bg-muted">
        {/* <p className="text-center text-2xl text-white">
              {session && <span>Logged in as {session.user?.name}</span>}
            </p>
            <Link
              href={session ? "/api/auth/signout" : "/api/auth/signin"}
              className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
            >
              {session ? "Sign out" : "Sign in"}
            </Link> */}
        <Dnd />
        <TrelloDnd />
      </main>
    </div>
  );
}
