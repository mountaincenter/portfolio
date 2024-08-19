import React, { useState, useEffect } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import {
  DndContext,
  useSensor,
  useSensors,
  DragEndEvent,
  closestCorners,
  MouseSensor,
} from "@dnd-kit/core";
import { Todo, Status, Statuses } from "./types";
import TodoColumn from "./TodoColumn";
import TodoForm from "./TodoForm";
import TodoModal from "./TodoModal";
import { Button } from "../ui/button";

const App = (): JSX.Element => {
  const [todoItemList, setTodoItemList] = useState<Todo[]>([
    { id: "1", title: "Task 1", content: "Content 1", status: "Incomplete" },
    { id: "2", title: "Task 2", content: "Content 2", status: "Progress" },
    { id: "3", title: "Task 3", content: "Content 3", status: "Done" },
    { id: "4", title: "Task 4", content: "Content 4", status: "Incomplete" },
    { id: "5", title: "Task 5", content: "Content 5", status: "Progress" },
  ]);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
  );

  const findColumn = (id: string | null): Status | null => {
    if (!id) return null;
    return Statuses.includes(id as Status)
      ? (id as Status)
      : todoItemList.find((todo) => todo.id === id)?.status || null;
  };

  const handleDragOver = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeColumn = findColumn(active.id);
    const overColumn = findColumn(over.id);

    if (activeColumn && overColumn && activeColumn !== overColumn) {
      const oldIndex = todoItemList.findIndex((todo) => todo.id === active.id);
      const newIndex = todoItemList.findIndex((todo) => todo.id === over.id);

      const newTodos = arrayMove(todoItemList, oldIndex, newIndex);
      const updatedTodoList = newTodos.map((todo) =>
        todo.id === active.id ? { ...todo, status: overColumn } : todo,
      );

      setTodoItemList(updatedTodoList);
    }
  };

  const handleDragEnd = () => {
    // 必要に応じて後で追加の処理を実装
  };

  const addTodo = (newTodo: Todo) => {
    setTodoItemList((prevTodos) => {
      const newId = (prevTodos.length + 1).toString();
      return [...prevTodos, { ...newTodo, id: newId }];
    });
  };

  const updateTodo = (updatedTodo: Todo) => {
    setTodoItemList((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === updatedTodo.id ? updatedTodo : todo,
      ),
    );
  };

  const removeTodoById = (id: string) => {
    setTodoItemList((prevTodos) =>
      prevTodos
        .filter((todo) => todo.id !== id)
        .map((todo, index) => ({ ...todo, id: (index + 1).toString() })),
    );
  };

  return (
    <>
      <Button
        onClick={() => {
          const newTodo: Todo = {
            id: "",
            title: "New Task",
            content: "New Content",
            status: "Incomplete",
          };
          addTodo(newTodo);
        }}
      >
        Add Todo
      </Button>
      <div className="grid grid-cols-4 gap-4">
        <div className="mx-2 rounded-lg bg-gray-200 px-4 py-2">
          <TodoColumn status={"All"} todoList={todoItemList} />
          <TodoForm onAddTodo={addTodo} />
        </div>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          {Statuses.map((status) => {
            const filteredTodoList = todoItemList.filter(
              (item) => item.status === status,
            );
            return (
              <div
                key={status}
                className="mx-2 rounded-lg bg-gray-200 px-4 py-2"
              >
                <TodoColumn
                  status={status}
                  todoList={filteredTodoList}
                  onRemoveTodo={removeTodoById}
                  onUpdateTodo={updateTodo}
                />
              </div>
            );
          })}
        </DndContext>
      </div>
      <TodoModal />
    </>
  );
};

export default App;
