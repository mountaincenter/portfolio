import { useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import { useTheme } from "next-themes";

const SortableContainer = ({
  id,
  items,
  label,
}: {
  id: string;
  items: string[];
  label: string;
}) => {
  const { theme } = useTheme();
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div className="flex w-72 flex-col space-y-2 rounded-lg bg-gray-100 p-4 shadow dark:bg-gray-900">
      <h3 className="text-center text-xl font-bold">{label}</h3>
      <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
        <div
          ref={setNodeRef}
          className={`flex-1 rounded-md border-2 p-2 ${theme === "dark" ? "bg-dark-background text-dark-text" : "bg-light-background text-light-text"}`}
        >
          {items.map((id: string) => (
            <SortableItem key={id} id={id} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

export default SortableContainer;
