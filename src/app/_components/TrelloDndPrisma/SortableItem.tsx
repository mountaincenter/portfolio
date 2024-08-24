import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Item from "./Item";
import type { Task, User } from "@prisma/client";

interface SortableItemProps {
  task: Task & { user: User };
  onSubmit: (updateTask: Task) => void;
}

const SortableItem: React.FC<SortableItemProps> = ({ task, onSubmit }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });
  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className="my-2 cursor-pointer rounded-lg bg-background text-foreground shadow-sm dark:bg-card dark:text-card-foreground"
      {...attributes}
      {...listeners}
    >
      <Item task={task} onSubmit={onSubmit} />
    </div>
  );
};

export default SortableItem;
