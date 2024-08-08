import { api } from "@/trpc/react";
import { useMutationHandler } from "./useMutationHandler";

export const useHealthMetricsMutation = () => {
  const { data: healthMetrics = [], isLoading: isReadLoading } =
    api.healthMetrics.list.useQuery();

  const createHealthMetricsMutation = api.healthMetrics.create.useMutation();
  const updateHealthMetricsMutation = api.healthMetrics.update.useMutation();
  const deleteHealthMetricsMutation = api.healthMetrics.delete.useMutation();

  const createHealthMetrics = useMutationHandler({
    mutation: createHealthMetricsMutation,
    successMessage: "記録に成功しました",
    errorMessage: "登録に失敗しました",
  });

  const updateHealthMetrics = useMutationHandler({
    mutation: updateHealthMetricsMutation,
    successMessage: "更新に成功しました",
    errorMessage: "更新に失敗しました",
  });

  const deleteHealthMetrics = useMutationHandler({
    mutation: deleteHealthMetricsMutation,
    successMessage: "削除に成功しました",
    errorMessage: "削除に失敗しました",
  });

  const isLoading =
    isReadLoading ||
    createHealthMetrics.isLoading ||
    updateHealthMetrics.isLoading ||
    deleteHealthMetrics.isLoading;

  return {
    healthMetrics,
    createHealthMetrics: createHealthMetrics.handleMutation,
    updateHealthMetrics: updateHealthMetrics.handleMutation,
    deleteHealthMetrics: deleteHealthMetrics.handleMutation,
    isLoading,
  };
};
