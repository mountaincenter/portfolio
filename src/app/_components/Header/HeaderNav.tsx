import React from "react";
import NavLinks from "@/components/common/NavLinks";

const HeaderNav: React.FC = () => {
  const navItems = [
    { label: "Timer", path: "/timer" },
    { label: "Trello", path: "/trello" },
    { label: "TrelloLike", path: "/trelloLike" },
    { label: "BodyFat", path: "/bodyFat" },
  ];

  return (
    <nav className="hidden space-x-4 md:flex">
      <NavLinks items={navItems} />
    </nav>
  );
};

export default HeaderNav;
