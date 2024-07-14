import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import type { Task } from "./interface";

const Item = ({ task }: { task: Task }) => {
  return (
    <div className="space-y-2 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">{task.title}</h3>
        {task.dueDate && (
          <Badge>
            Due{" "}
            {new Date(task.dueDate).toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
          </Badge>
        )}
      </div>
      <div className="flex items-center gap-2 text-muted-foreground">
        <Avatar className="h-6 w-6">
          <AvatarImage src={task.user.image ?? "/placeholder-user.jpg"} />
          <AvatarFallback>{task.user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <span>{task.user.name}</span>
      </div>
    </div>
  );
};

export default Item;
