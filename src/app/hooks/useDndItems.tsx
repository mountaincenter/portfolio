import { useState, useCallback } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import type { Task, User } from "@prisma/client";

export const useDndItems = (
  initialItems: Record<string, (Task & { user: User })[]>,
) => {
  const [items, setItems] =
    useState<Record<string, (Task & { user: User })[]>>(initialItems);
  const [activeId, setActiveId] = useState<string | null>(null);

  const findContainer = useCallback(
    (id: string): string => {
      console.log("Searching for container with id:", id);
      console.log("Current items:", items);
      for (const status in items) {
        console.log(`Checking status: ${status}`);
        if (items[status]?.some((task) => task.id.toString() === id)) {
          console.log(`Found container: ${status} for id: ${id}`);
          return status;
        }
      }
      console.error(`Container not found for id: ${id}`);
      throw new Error(`Container not found for id: ${id}`);
    },
    [items],
  );

  const handleDragStart = useCallback((id: string) => {
    console.log("Drag started for id:", id);
    setActiveId(id);
  }, []);

  const handleDragOver = useCallback(
    (activeId: string, overId: string | null) => {
      if (!overId) {
        console.log("Drag over with no valid target, skipping.");
        return;
      }

      console.log(
        `Handling drag over. Active ID: ${activeId}, Over ID: ${overId}`,
      );

      const activeContainer = findContainer(activeId);
      const overContainer = findContainer(overId);

      console.log(
        `Active container: ${activeContainer}, Over container: ${overContainer}`,
      );

      if (activeContainer === overContainer) {
        console.log(
          "Active container is the same as over container, no move needed.",
        );
        return;
      }

      setItems((prev) => {
        const activeItems = prev[activeContainer] ?? [];
        const overItems = prev[overContainer] ?? [];

        const activeIndex = activeItems.findIndex(
          (task) => task.id.toString() === activeId,
        );
        const overIndex = overItems.findIndex(
          (task) => task.id.toString() === overId,
        );

        console.log(`Active index: ${activeIndex}, Over index: ${overIndex}`);

        if (activeIndex === -1 || (overIndex === -1 && overItems.length > 0)) {
          console.log("Invalid indices found, skipping move.");
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
          activeItems[activeIndex]!,
          ...overItems.slice(newIndex),
        ];

        console.log("Updated items:", { updatedActiveItems, updatedOverItems });

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
      if (!overId) {
        console.log("Drag ended with no valid target, skipping.");
        return;
      }

      console.log(
        `Handling drag end. Active ID: ${activeId}, Over ID: ${overId}`,
      );

      const activeContainer = findContainer(activeId);
      const overContainer = findContainer(overId);

      console.log(
        `Active container: ${activeContainer}, Over container: ${overContainer}`,
      );

      if (activeContainer !== overContainer) {
        console.log("No need to move, different containers.");
        return;
      }

      const activeItems = items[activeContainer] ?? [];
      const overItems = items[overContainer] ?? [];

      const activeIndex = activeItems.findIndex(
        (task) => task.id.toString() === activeId,
      );
      const overIndex = overItems.findIndex(
        (task) => task.id.toString() === overId,
      );

      console.log(`Active index: ${activeIndex}, Over index: ${overIndex}`);

      if (activeIndex !== overIndex) {
        setItems((items) => {
          const updatedItems = {
            ...items,
            [overContainer]: arrayMove(
              items[overContainer] ?? [],
              activeIndex,
              overIndex,
            ),
          };
          console.log("Items after drag end:", updatedItems);
          return updatedItems;
        });
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
