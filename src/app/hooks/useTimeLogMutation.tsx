import { api } from "@/trpc/react";
import { useToast } from "@/app/_components/ui/use-toast";

export const useTimeLogMutation = () => {
  const { toast } = useToast();

  const { data: timeLogs = [], isLoading: isReadLoading } =
    api.timeLog.list.useQuery();

  const createTimeLog = api.timeLog.create.useMutation({
    onSuccess: () => {
      console.log("Create mutation success");
      toast({
        title: "success",
        description: "記録に成功しました",
        duration: 3000,
      });
      setTimeout(() => {
        console.log("Refreshing router after create");
        window.location.reload(); // 強制的にページをリロード
      }, 3000);
    },
    onError: (error) => {
      console.error("Create mutation error", error);
      toast({
        title: "error",
        description: "登録に失敗しました",
        duration: 3000,
      });
    },
  });

  const updateTimeLog = api.timeLog.update.useMutation({
    onSuccess: () => {
      console.log("Update mutation success");
      toast({
        title: "success",
        description: "更新に成功しました",
        duration: 3000,
      });
      setTimeout(() => {
        console.log("Refreshing router after update");
        window.location.reload(); // 強制的にページをリロード
      }, 3000);
    },
    onError: (error) => {
      console.error("Update mutation error", error);
      toast({
        title: "error",
        description: "登録に失敗しました",
        duration: 3000,
      });
    },
  });

  const deleteTimeLog = api.timeLog.delete.useMutation({
    onSuccess: () => {
      console.log("Delete mutation success");
      toast({
        title: "success",
        description: "削除に成功しました",
        duration: 3000,
      });
      setTimeout(() => {
        console.log("Refreshing router after delete");
        window.location.reload(); // 強制的にページをリロード
      }, 3000);
    },
    onError: (error) => {
      console.error("Delete mutation error", error);
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
