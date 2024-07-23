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
import type { Task, List, User } from "@prisma/client";

interface TrelloContainerProps {
  lists: (List & { tasks: (Task & { user: User })[] })[];
}

const TrelloContainer: React.FC<TrelloContainerProps> = ({ lists }) => {
  const [items, setItems] = useState<Record<string, (Task & { user: User })[]>>(
    {},
  );

  useEffect(() => {
    if (lists) {
      const groupedTasks = lists.reduce(
        (acc: Record<string, (Task & { user: User })[]>, list) => {
          acc[list.title] = list.tasks;
          return acc;
        },
        {},
      );
      setItems(groupedTasks);
    }
  }, [lists]);

  const { activeId, handleDragStart, handleDragOver, handleDragEnd } =
    useDndItems(items);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

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
        {Object.keys(items).map((listTitle) => (
          <SortableContainer
            key={listTitle}
            id={listTitle}
            items={items[listTitle] ?? []}
            label={listTitle}
          />
        ))}
      </div>
      <DragOverlay>
        {activeId ? (
          <Item
            task={Object.values(items)
              .flat()
              .find((task) => task.id.toString() === activeId)}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default TrelloContainer;
