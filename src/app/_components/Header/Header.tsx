/**
 * v0 by Vercel.
 * @see https://v0.dev/t/nNAnrQ3iqCk
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import { type Session } from "next-auth";

import HeaderNav from "./HeaderNav";
import UserSection from "./UserSection";
interface HeaderProps {
  session: Session | null;
}
const Header: React.FC<HeaderProps> = ({ session }) => {
  return (
    <header className="flex items-center justify-between bg-background px-4 py-3 shadow-sm md:px-6">
      <Link href="/" className="flex items-center gap-2" prefetch={false}>
        <span className="text-lg font-semibold">Acme Inc</span>
      </Link>
      <HeaderNav />
      <div>
        <UserSection session={session} />
      </div>
    </header>
  );
};

export default Header;
