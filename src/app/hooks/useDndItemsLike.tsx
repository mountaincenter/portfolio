import { useState, useCallback } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import type { Task, Status } from "../_components/TrelloLike/interface";

export const useDndItems = (initialItems: Record<Status, Task[]>) => {
  const [items, setItems] = useState<Record<Status, Task[]>>(initialItems);
  const [activeId, setActiveId] = useState<string | null>(null);

  const findContainer = useCallback(
    (id: string): Status => {
      for (const status in items) {
        if (items[status as Status].some((task) => task.id.toString() === id)) {
          return status as Status;
        }
      }
      throw new Error(`Container not found for id: ${id}`);
    },
    [items],
  );

  const handleDragStart = useCallback((id: string) => {
    setActiveId(id);
  }, []);

  const handleDragOver = useCallback(
    (activeId: string, overId: string | null) => {
      if (!overId) return;

      const activeContainer = findContainer(activeId);
      const overContainer = findContainer(overId);

      if (activeContainer === overContainer) {
        return;
      }

      setItems((prev) => {
        const activeItems = prev[activeContainer];
        const overItems = prev[overContainer];

        const activeIndex = activeItems.findIndex(
          (task) => task.id.toString() === activeId,
        );
        const overIndex = overItems.findIndex(
          (task) => task.id.toString() === overId,
        );

        if (activeIndex === -1 || (overIndex === -1 && overItems.length > 0)) {
          return prev;
        }

        let newIndex;
        if (overIndex === -1) {
          newIndex = overItems.length;
        } else {
          const isBelowLastItem = overIndex === overItems.length - 1;
          const modifier = isBelowLastItem ? 1 : 0;
          newIndex =
            overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
        }

        const updatedActiveItems = activeItems.filter(
          (task) => task.id.toString() !== activeId,
        );
        const updatedOverItems = [
          ...overItems.slice(0, newIndex),
          activeItems[activeIndex],
          ...overItems.slice(newIndex),
        ];

        return {
          ...prev,
          [activeContainer]: updatedActiveItems,
          [overContainer]: updatedOverItems,
        };
      });
    },
    [findContainer],
  );

  const handleDragEnd = useCallback(
    (activeId: string, overId: string | null) => {
      if (!overId) return;

      const activeContainer = findContainer(activeId);
      const overContainer = findContainer(overId);

      if (activeContainer !== overContainer) {
        return;
      }

      const activeIndex = items[activeContainer].findIndex(
        (task) => task.id.toString() === activeId,
      );
      const overIndex = items[overContainer].findIndex(
        (task) => task.id.toString() === overId,
      );

      if (activeIndex !== overIndex) {
        setItems((items) => ({
          ...items,
          [overContainer]: arrayMove(
            items[overContainer],
            activeIndex,
            overIndex,
          ),
        }));
      }
      setActiveId(null);
    },
    [findContainer, items],
  );

  return {
    items,
    activeId,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  };
};
