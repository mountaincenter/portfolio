import { api } from "@/trpc/react";
import { useMutationHandler } from "./useMutationHandler";

export const useTimeLogMutation = () => {
  const { data: timeLogs = [], isLoading: isReadLoading } =
    api.timeLog.list.useQuery();

  const createTimeLogMutation = api.timeLog.create.useMutation();
  const updateTimeLogMutation = api.timeLog.update.useMutation();
  const deleteTimeLogMutation = api.timeLog.delete.useMutation();

  const createTimeLog = useMutationHandler({
    mutation: createTimeLogMutation,
    successMessage: "記録に成功しました",
    errorMessage: "登録に失敗しました",
  });

  const updateTimeLog = useMutationHandler({
    mutation: updateTimeLogMutation,
    successMessage: "更新に成功しました",
    errorMessage: "更新に失敗しました",
  });

  const deleteTimeLog = useMutationHandler({
    mutation: deleteTimeLogMutation,
    successMessage: "削除に成功しました",
    errorMessage: "削除に失敗しました",
  });

  const isLoading =
    isReadLoading ||
    createTimeLog.isLoading ||
    updateTimeLog.isLoading ||
    deleteTimeLog.isLoading;

  return {
    timeLogs,
    createTimeLog: createTimeLog.handleMutation,
    updateTimeLog: updateTimeLog.handleMutation,
    deleteTimeLog: deleteTimeLog.handleMutation,
    isLoading,
  };
};
