import React from "react";
import { type Session } from "next-auth";
import { ModeToggle } from "../ModeToggle/ModeToggle";
import LoginAvatar from "@/components/common/LoginAvatar";

interface UseSectionProps {
  session: Session | null;
}

const UserSection: React.FC<UseSectionProps> = ({ session }) => {
  return (
    <div className="flex items-center space-x-4">
      <LoginAvatar session={session} />
      <ModeToggle />
    </div>
  );
};

export default UserSection;
