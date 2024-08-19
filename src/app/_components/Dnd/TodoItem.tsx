import React, { useState, type FC } from "react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { CircleCheckBig } from "lucide-react";
import { CircleDotDashed } from "lucide-react";
import { CircleSlash2 } from "lucide-react";
import { Archive } from "lucide-react";

type Todo = {
  id: string;
  title: string;
  content: string;
  status: "Done" | "Progress" | "Incomplete";
};

type TodoItemProps = {
  todo: Todo;
  isSortable?: boolean;
  onRemoveTodo: (id: string) => void;
  onEditTodo: (todo: Todo) => void;
};

const TodoItem: FC<TodoItemProps> = ({
  todo,
  isSortable,
  onRemoveTodo,
  onEditTodo,
}) => {
  const handleRemoveOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onRemoveTodo(todo.id);
  };

  const handleTodoOnClick = (event: React.MouseEvent<HTMLDivElement>) => {
    console.log(todo.id);
    onEditTodo(todo);
  };

  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: todo.id,
  });

  let statusValues = {
    state: "",
    color: "",
    iconDom: <></>,
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    // transition,
  };

  switch (todo.status) {
    case "Done":
      statusValues.state = "完了";
      statusValues.color = "green";
      statusValues.iconDom = (
        <CircleCheckBig className="h-6 w-6 fill-current" />
      );
      break;
    case "Progress":
      statusValues.state = "対応中";
      statusValues.color = "blue";
      statusValues.iconDom = (
        <CircleDotDashed className="h-6 w-6 fill-current" />
      );
      break;
    case "Incomplete":
      statusValues.state = "未対応";
      statusValues.color = "blue-gray";
      statusValues.iconDom = <CircleSlash2 className="h-6 w-6 fill-current" />;
      break;
  }

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={isSortable ? style : { cursor: "default" }}
    >
      <div
        id={todo.id}
        className="flex w-full overflow-hidden rounded-lg border border-gray-300 bg-white shadow-md hover:bg-gray-300"
        onClick={handleTodoOnClick}
      >
        <div
          className={`flex w-12 items-center justify-center bg-${statusValues.color}-500`}
        >
          {statusValues.iconDom}
        </div>

        <div className="w-full p-1 px-2">
          <div className="px-1">
            <div className="flex items-center justify-start">
              <div className="flex-auto ">
                <span className="text-sm text-gray-700">{todo.title}</span>
              </div>
              <span
                className={`whitespace-pre text-sm font-semibold text-${statusValues.color}-500`}
              >
                {statusValues.state}
                {todo.status === "Done" && (
                  <button
                    type="button"
                    className="ms-1 items-center  rounded-full  bg-red-500 p-1 text-center text-xs font-medium text-white hover:bg-red-700 focus:ring-red-300"
                    onClick={(e) => handleRemoveOnClick(e)}
                  >
                    <span>
                      <Archive />
                    </span>
                  </button>
                )}
              </span>
            </div>
            <div className="my-1 line-clamp-2 text-xs text-gray-600">
              {todo.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
