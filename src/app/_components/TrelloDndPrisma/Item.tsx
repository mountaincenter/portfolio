import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import type { Task, User } from "@prisma/client";

interface ItemProps {
  task: Task & { user: User };
}

const Item: React.FC<ItemProps> = ({ task }) => {
  console.log(task);
  const statusValue = {
    state: "",
    color: "",
  };

  switch (task.status) {
    case "DONE":
      statusValue.state = "完了";
      statusValue.color = "red";
      break;
    case "PROGRESS":
      statusValue.state = "対応中";
      statusValue.color = "blue";
      break;
    case "IMCOMPLETE":
      statusValue.state = "未対応";
      statusValue.color = "gray";
  }
  return (
    <div className="space-y-2 p-4">
      <p className={`text-${statusValue.color}-500`}>{statusValue.state}</p>
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
      {/* task.descriptionを表示 */}
      {task.description && (
        <p className="text-sm text-muted-foreground">{task.description}</p>
      )}
      <div className="flex items-center gap-2 text-muted-foreground">
        <Avatar className="h-6 w-6">
          {task.user.image && <AvatarImage src={task.user.image} />}
          {task.user.name && (
            <AvatarFallback>{task.user.name.charAt(0)}</AvatarFallback>
          )}
        </Avatar>
        <span>{task.user.name}</span>
      </div>
    </div>
  );
};

export default Item;
