import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/_components/ui/use-toast";

export const useTimeLogMutation = () => {
  const router = useRouter();
  const { toast } = useToast();

  const { data: timeLogs = [], isLoading: isReadLoading } =
    api.timeLog.list.useQuery();

  const createTimeLog = api.timeLog.create.useMutation({
    onSuccess: () => {
      toast({
        title: "success",
        description: "記録に成功しました",
        duration: 3000,
      });
      setTimeout(() => router.push("/timer"), 3000); // reloadの代わりにrouter.pushを使用
    },
    onError: () => {
      toast({
        title: "error",
        description: "登録に失敗しました",
        duration: 3000,
      });
    },
  });

  const updateTimeLog = api.timeLog.update.useMutation({
    onSuccess: () => {
      toast({
        title: "success",
        description: "更新に成功しました",
        duration: 3000,
      });
      setTimeout(() => router.push("/timer"), 3000); // reloadの代わりにrouter.pushを使用
    },
    onError: () => {
      toast({
        title: "error",
        description: "登録に失敗しました",
        duration: 3000,
      });
    },
  });

  const deleteTimeLog = api.timeLog.delete.useMutation({
    onSuccess: () => {
      toast({
        title: "success",
        description: "削除に成功しました",
        duration: 3000,
      });
      setTimeout(() => router.push("/timer"), 3000); // reloadの代わりにrouter.pushを使用
    },
    onError: () => {
      toast({
        title: "error",
        description: "削除に失敗しました",
        duration: 3000,
      });
    },
  });

  const isCreateLoading = createTimeLog.status === "pending";
  const isUpdateLoading = updateTimeLog.status === "pending";
  const isDeleteLoading = deleteTimeLog.status === "pending";

  const isLoading =
    isReadLoading || isCreateLoading || isUpdateLoading || isDeleteLoading;

  return {
    timeLogs,
    createTimeLog,
    updateTimeLog,
    deleteTimeLog,
    isLoading,
  };
};
