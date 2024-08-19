import { useDroppable } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { Todo, Status } from "./types";
import TodoItem from "./TodoItem";

type TodoColumnProps = {
  todoList: Todo[];
  status: Status;
  onRemoveTodo: (id: string) => void;
  onUpdateTodo: (todo: Todo) => void;
};

const TodoColumn = ({
  todoList,
  status,
  onRemoveTodo,
  onUpdateTodo,
}: TodoColumnProps) => {
  const { setNodeRef } = useDroppable({ id: status });

  let statusColor = "gray";
  switch (status) {
    case "Done":
      statusColor = "green";
      break;
    case "Progress":
      statusColor = "blue";
      break;
    case "Incomplete":
      statusColor = "gray";
      break;
  }

  return (
    <>
      <span
        className={`mb-1 inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium bg-${statusColor}-500 text-white`}
      >
        {status}
      </span>
      <SortableContext
        id={status}
        items={todoList.map((todo) => todo.id)}
        strategy={rectSortingStrategy}
      >
        <div ref={setNodeRef} className="rounded-lg border bg-gray-100">
          {todoList.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              isSortable
              onRemoveTodo={onRemoveTodo}
              onEditTodo={onUpdateTodo}
            />
          ))}
        </div>
      </SortableContext>
    </>
  );
};

export default TodoColumn;
