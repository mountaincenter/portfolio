import { api } from "@/trpc/react";
import { useMutationHandler } from "./useMutationHandler";

export const useUserMutation = () => {
  const { data: user, isLoading: isUserLodaing } =
    api.user.getUserById.useQuery();

  const updateUserMutation = api.user.update.useMutation();

  const updateUser = useMutationHandler({
    mutation: updateUserMutation,
    successMessage: "更新に成功しました",
    errorMessage: "更新に失敗しました",
  });

  const isLoading = isUserLodaing || updateUser.isLoading;

  return {
    user,
    updateUser: updateUser.handleMutation,
    isLoading,
  };
};
