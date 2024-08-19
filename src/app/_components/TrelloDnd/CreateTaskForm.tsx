import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import { Label } from "@/app/_components/ui/label";
import type { Task, User } from "./types";

type CreateTaskFormProps = {
  onAddTask: (task: Task) => void;
  currentUser: User;
};

const CreateTaskForm: React.FC<CreateTaskFormProps> = ({
  onAddTask,
  currentUser,
}) => {
  const { register, handleSubmit, reset } = useForm<Omit<Task, "id" | "user">>({
    defaultValues: {
      title: "",
      description: "",
      dueDate: undefined,
      status: "Incomplete",
      userId: currentUser.id,
    },
  });

  const onSubmit: SubmitHandler<Omit<Task, "id" | "user">> = (data) => {
    const newTask: Task = {
      ...data,
      id: Date.now().toString(), // 一意のIDを生成
      user: currentUser,
    };
    onAddTask(newTask);
    reset(); // フォームをリセット
  };

  return (
    <div className="w-full overflow-hidden rounded-lg bg-white p-4 shadow-md dark:bg-gray-800">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <Label htmlFor="title">タイトル</Label>
          <Input
            id="title"
            type="text"
            {...register("title", { required: true })}
            placeholder="タイトルを入力してください"
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="description">内容</Label>
          <Input
            id="description"
            type="text"
            {...register("description")}
            placeholder="内容を入力してください"
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="dueDate">締め切り</Label>
          <Input
            id="dueDate"
            type="date"
            {...register("dueDate")}
            placeholder="締め切りを選択してください"
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="status">ステータス</Label>
          <select
            id="status"
            {...register("status")}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="Incomplete">未着手</option>
            <option value="Progress">進行中</option>
            <option value="Done">完了</option>
          </select>
        </div>

        <Button type="submit" className="w-full">
          タスク追加
        </Button>
      </form>
    </div>
  );
};

export default CreateTaskForm;
