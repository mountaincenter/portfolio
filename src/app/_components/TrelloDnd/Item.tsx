import React, { useState } from "react";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/app/_components/ui/avatar";
import { Badge } from "@/app/_components/ui/badge";
import { Input } from "@/app/_components/ui/input";
import { Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { Button } from "@/app/_components/ui/button";
import type { Task } from "./types";

interface ItemProps {
  task: Task;
  onSubmit: (updatedTask: Task) => void;
}

const Item: React.FC<ItemProps> = ({ task, onSubmit }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editedTask, setEditedTask] = useState<Task>(task);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    // Date input handling
    if (name === "dueDate") {
      setEditedTask({ ...editedTask, dueDate: new Date(value) });
    } else {
      setEditedTask({ ...editedTask, [name]: value });
    }
  };

  const handleSave = () => {
    onSubmit(editedTask);
    setIsDialogOpen(false);
  };

  const statusValue = {
    state: "",
    color: "",
  };

  switch (task.status) {
    case "Done":
      statusValue.state = "完了";
      statusValue.color = "red";
      break;
    case "Progress":
      statusValue.state = "対応中";
      statusValue.color = "blue";
      break;
    case "Incomplete":
      statusValue.state = "未対応";
      statusValue.color = "gray";
      break;
  }

  return (
    <div className="space-y-2 p-4">
      <div className="flex justify-between">
        <p className={`text-${statusValue.color}-500`}>{statusValue.state}</p>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <div className="cursor-pointer">
              <Pencil className="h-5 w-5" />
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
              <DialogDescription>
                Make changes to your task here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="title" className="text-right">
                  Title
                </label>
                <Input
                  id="title"
                  name="title"
                  value={editedTask.title}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="description" className="text-right">
                  Description
                </label>
                <Input
                  id="description"
                  name="description"
                  value={editedTask.description}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="dueDate" className="text-right">
                  Due Date
                </label>
                <Input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  value={
                    editedTask.dueDate
                      ? editedTask.dueDate.toISOString().split("T")[0]
                      : ""
                  }
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="default" onClick={handleSave}>
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
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
      <p className="text-sm text-muted-foreground">{task.description}</p>
      <div className="flex items-center gap-2 text-muted-foreground">
        <Avatar className="h-6 w-6">
          <AvatarImage src="/placeholder-user.jpg" />
          <AvatarFallback>{task.user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <span>{task.user.name}</span>
      </div>
    </div>
  );
};

export default Item;
