"use client";
import React, { useEffect, useState } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragOverEvent,
  type DragEndEvent,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import SortableContainer from "./SortableContainer";
import Item from "./Item";
import { useDndItems } from "../../hooks/useDndItems";
import type { Task, Status } from "./interface";
import trelloInfo from "./data/trelloInfo.json";

const initialItems: Record<Status, Task[]> = trelloInfo.tasks.reduce(
  (acc: Record<Status, Task[]>, task: Task) => {
    if (!acc[task.status]) {
      acc[task.status] = [];
    }
    acc[task.status].push(task);
    return acc;
  },
  {
    TODO: [],
    IN_PROGRESS: [],
    REVIEW: [],
    DONE: [],
  },
);

const TrelloContainer = () => {
  const [items, setItems] = useState(initialItems);
  const { activeId, handleDragStart, handleDragOver, handleDragEnd } =
    useDndItems(items);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  useEffect(() => {
    setItems(initialItems);
  }, []);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={(event: DragStartEvent) =>
        handleDragStart(event.active.id.toString())
      }
      onDragOver={(event: DragOverEvent) =>
        handleDragOver(
          event.active.id.toString(),
          event.over?.id.toString() ?? null,
        )
      }
      onDragEnd={(event: DragEndEvent) =>
        handleDragEnd(
          event.active.id.toString(),
          event.over?.id.toString() ?? null,
        )
      }
    >
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
        <SortableContainer id="TODO" items={items.TODO ?? []} label="To Do" />
        <SortableContainer
          id="IN_PROGRESS"
          label="In Progress"
          items={items.IN_PROGRESS ?? []}
        />
        <SortableContainer
          id="REVIEW"
          label="Review"
          items={items.REVIEW ?? []}
        />
        <SortableContainer id="DONE" label="Done" items={items.DONE ?? []} />
      </div>
      <DragOverlay>
        {activeId ? (
          <Item
            task={
              items.TODO.find((task) => task.id.toString() === activeId) ||
              items.IN_PROGRESS.find(
                (task) => task.id.toString() === activeId,
              ) ||
              items.REVIEW.find((task) => task.id.toString() === activeId) ||
              items.DONE.find((task) => task.id.toString() === activeId)
            }
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default TrelloContainer;
