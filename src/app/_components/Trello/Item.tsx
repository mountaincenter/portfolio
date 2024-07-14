import type { UniqueIdentifier } from "@dnd-kit/core";
import { useTheme } from "next-themes";

const Item = ({ id }: { id: UniqueIdentifier }) => {
  const { theme } = useTheme();
  return (
    <div
      className={`flex h-10 items-center justify-center rounded-lg border border-gray-400 ${theme === "dark" ? "bg-dark-background text-dark-text" : "bg-light-background text-light-text"} p-2`}
    >
      {id}
    </div>
  );
};
export default Item;
