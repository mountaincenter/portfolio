import { useState } from "react";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

// 型定義を明示する
type HealthMetricsMutationHook = {
  message: string;
  createHealthMetrics: ReturnType<
    typeof api.healthMetrics.createHealthMetrics.useMutation
  >;
  updateHealthMetrics: ReturnType<
    typeof api.healthMetrics.updateHealthMetrics.useMutation
  >;
  deleteHealthMetrics: ReturnType<
    typeof api.healthMetrics.deleteHealthMetrics.useMutation
  >;
};

export const useHealthMetricsMutation = (
  onSuccessCallback?: () => void,
): HealthMetricsMutationHook => {
  const router = useRouter();
  const [message, setMessage] = useState<string>("");

  const handleSuccess = (successMessage: string) => {
    setMessage(successMessage);
    setTimeout(() => setMessage(""), 3000);
    router.refresh();
    if (onSuccessCallback) {
      onSuccessCallback();
    }
  };

  const handleError = (errorMessage: string) => {
    setMessage(errorMessage);
    setTimeout(() => setMessage(""), 3000);
  };

  const createHealthMetrics = api.healthMetrics.createHealthMetrics.useMutation(
    {
      onSuccess: () => handleSuccess("体重を登録しました"),
      onError: () => handleError("体重の登録に失敗しました"),
    },
  );

  const updateHealthMetrics = api.healthMetrics.updateHealthMetrics.useMutation(
    {
      onSuccess: () => handleSuccess("体重を更新しました"),
      onError: () => handleError("体重の更新に失敗しました"),
    },
  );

  const deleteHealthMetrics = api.healthMetrics.deleteHealthMetrics.useMutation(
    {
      onSuccess: () => handleSuccess("体重を削除しました"),
      onError: () => handleError("体重の削除に失敗しました"),
    },
  );

  return {
    message,
    createHealthMetrics,
    updateHealthMetrics,
    deleteHealthMetrics,
  };
};
