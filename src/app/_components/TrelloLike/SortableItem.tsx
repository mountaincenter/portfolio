import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Item from "./Item";
import type { Task } from "./interface";

const SortableItem = ({ task }: { task: Task }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id.toString() });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className="my-2 cursor-pointer rounded-lg bg-background text-foreground shadow-sm dark:bg-card dark:text-card-foreground"
      {...attributes}
      {...listeners}
    >
      <Item task={task} />
    </div>
  );
};

export default SortableItem;
