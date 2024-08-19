"use client";
import React, { useState } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  MouseSensor,
  useSensor,
  useSensors,
  closestCorners,
  DragOverEvent,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates, arrayMove } from "@dnd-kit/sortable";
import SortableContainer from "./SortableContainer";
import { User, Task, Status } from "./types";

const user: User = { id: "1", name: "testuser" };

const tasks: Task[] = [
  {
    id: "1",
    title: "Task 1",
    description: "Content 1",
    dueDate: new Date(2024, 7, 15), // 8月15日 (monthは0-indexedなので7)
    userId: user.id,
    status: "Incomplete",
    user: user,
  },
  {
    id: "2",
    title: "Task 2",
    description: "Content 2",
    dueDate: new Date(2024, 7, 20), // 8月20日
    userId: user.id,
    status: "Progress",
    user: user,
  },
  {
    id: "3",
    title: "Task 3",
    description: "Content 3",
    dueDate: new Date(2024, 7, 25), // 8月25日
    userId: user.id,
    status: "Done",
    user: user,
  },
  {
    id: "4",
    title: "Task 4",
    description: "Content 4",
    dueDate: new Date(2024, 7, 10), // 8月10日
    userId: user.id,
    status: "Incomplete",
    user: user,
  },
  {
    id: "5",
    title: "Task 5",
    description: "Content 5",
    dueDate: new Date(2024, 7, 30), // 8月30日
    userId: user.id,
    status: "Progress",
    user: user,
  },
];

const statuses: Status[] = ["Incomplete", "Progress", "Done"];

const Page = () => {
  const [taskList, setTaskList] = useState<Task[]>(tasks);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
  );

  const findColumn = (id: string | null): Status | null => {
    if (!id) return null;
    return statuses.includes(id as Status)
      ? (id as Status)
      : taskList.find((task) => task.id === id)?.status || null;
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const activeColumn = findColumn(active.id.toString());
    const overColumn = findColumn(over.id.toString());

    if (activeColumn && overColumn && activeColumn !== overColumn) {
      const oldIndex = taskList.findIndex((task) => task.id === active.id);
      const newIndex = taskList.findIndex((task) => task.id === over.id);

      const newTasks = arrayMove(taskList, oldIndex, newIndex);
      const updatedTaskList = newTasks.map((task) =>
        task.id === active.id ? { ...task, status: overColumn } : task,
      );

      setTaskList(updatedTaskList);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragOver={handleDragOver}
    >
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
        {statuses.map((label) => (
          <SortableContainer
            key={label}
            taskList={taskList.filter((task) => task.status === label)}
            label={label}
          />
        ))}
      </div>
    </DndContext>
  );
};

export default Page;
