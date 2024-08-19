import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { Card, CardHeader, CardContent } from "../ui/card";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import SortableItem from "./SortableItem";
import { Task } from "./types";

interface SortableContainerProps {
  taskList: Task[];
  label: string;
}

const SortableContainer: React.FC<SortableContainerProps> = ({
  taskList,
  label,
}) => {
  const { setNodeRef } = useDroppable({ id: label });

  return (
    <div>
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
            items={taskList.map((task) => task.id)}
            id={label} // ここが重要
            strategy={rectSortingStrategy}
          >
            {taskList.map((task) => (
              <SortableItem key={task.id} task={task} />
            ))}
          </SortableContext>
        </CardContent>
      </Card>
    </div>
  );
};

export default SortableContainer;
