import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardHeader, CardContent } from "../ui/card";
import type { Task, User } from "@prisma/client";

interface SortableContainerProps {
  id: string;
  items: (Task & { user: User })[];
  label: string;
}

const SortableContainer: React.FC<SortableContainerProps> = ({
  id,
  items,
  label,
}) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  console.log("id", id);
  console.log("items", items);

  return (
    <Card className="w-full bg-card text-card-foreground dark:bg-card dark:text-card-foreground">
      <CardHeader className="flex items-center justify-between bg-card-foreground px-4 py-3 text-card dark:bg-card-foreground dark:text-card">
        <h2 className="text-lg font-medium">{label}</h2>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Plus className="h-5 w-5" />
          <span className="sr-only">Add new task</span>
        </Button>
      </CardHeader>
      <CardContent className="space-y-4 p-4" ref={setNodeRef}>
        <SortableContext
          id={id}
          items={items.map((task) => task.id.toString())}
          strategy={rectSortingStrategy}
        >
          {items.map((task: Task & { user: User }) => (
            <SortableItem key={task.id} task={task} />
          ))}
        </SortableContext>
      </CardContent>
    </Card>
  );
};

export default SortableContainer;
