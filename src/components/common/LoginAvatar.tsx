"use client";
import { signIn, signOut } from "next-auth/react";
import { Button } from "@/app/_components/ui/button";
import { Avatar, AvatarImage } from "@/app/_components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/app/_components/ui/dropdown-menu";

import { type Session } from "next-auth";

import { LogOut } from "lucide-react";

interface LoginAvatarProps {
  session: Session | null;
}

const LoginAvatar: React.FC<LoginAvatarProps> = ({ session }) => {
  if (session) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            {session?.user.image && (
              <AvatarImage src={session.user.image ?? undefined} />
            )}
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{session?.user.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sign Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  return (
    <>
      <Button onClick={() => signIn()}>Sign in</Button>
    </>
  );
};

export default LoginAvatar;
