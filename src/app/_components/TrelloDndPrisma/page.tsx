"use client";
import React, { useState, useEffect } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  MouseSensor,
  useSensor,
  useSensors,
  closestCorners,
  type DragOverEvent,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates, arrayMove } from "@dnd-kit/sortable";
import SortableContainer from "./SortableContainer";
import type { Task, User, Status } from "@prisma/client";
import { useTaskMutation } from "@/app/hooks/useTaskMutation";

const statuses: Status[] = ["IMCOMPLETE", "PROGRESS", "DONE"];

const Page = () => {
  const { tasks } = useTaskMutation();
  console.log("tasks", tasks);
  const [taskList, setTaskList] = useState<(Task & { user: User })[]>([]);
  useEffect(() => {
    if (tasks.length > 0) {
      setTaskList(tasks);
    }
  }, [tasks]);
  console.log("taskListPage:", taskList);
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
      : taskList.find((task) => task.id.toString() === id)?.status ?? null;
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
    <>
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
    </>
  );
};

export default Page;
