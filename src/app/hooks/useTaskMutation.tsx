import { api } from "@/trpc/react";
import { useMutationHandler } from "./useMutationHandler";

export const useTaskMutation = () => {
  // タスク一覧の取得
  const { data: tasks = [], isLoading: isReadLoading } =
    api.task.getAllTasks.useQuery();

  // タスク操作用のMutationを作成
  const createTaskMutation = api.task.createTask.useMutation();
  const updateTaskMutation = api.task.updateTask.useMutation();
  const deleteTaskMutation = api.task.deleteTask.useMutation();

  // useMutationHandlerを利用してMutationをラップ
  const createTask = useMutationHandler({
    mutation: createTaskMutation,
    successMessage: "タスクの作成に成功しました",
    errorMessage: "タスクの作成に失敗しました",
  });

  const updateTask = useMutationHandler({
    mutation: updateTaskMutation,
    successMessage: "タスクの更新に成功しました",
    errorMessage: "タスクの更新に失敗しました",
  });

  const deleteTask = useMutationHandler({
    mutation: deleteTaskMutation,
    successMessage: "タスクの削除に成功しました",
    errorMessage: "タスクの削除に失敗しました",
  });

  // 各操作がロード中かどうかを判定
  const isLoading =
    isReadLoading ||
    createTask.isLoading ||
    updateTask.isLoading ||
    deleteTask.isLoading;

  return {
    tasks, // 取得したタスク一覧を返す
    createTask: createTask.handleMutation,
    updateTask: updateTask.handleMutation,
    deleteTask: deleteTask.handleMutation,
    isLoading,
  };
};
