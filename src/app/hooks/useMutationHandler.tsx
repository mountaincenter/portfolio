import { type UseMutationResult } from "@tanstack/react-query";
import { useToast } from "@/app/_components/ui/use-toast";

interface UseMutationHandlerProps<TData, TVariables> {
  mutation: UseMutationResult<TData, unknown, TVariables, unknown>;
  successMessage: string;
  errorMessage: string;
}

export const useMutationHandler = <TData, TVariables>({
  mutation,
  successMessage,
  errorMessage,
}: UseMutationHandlerProps<TData, TVariables>) => {
  const { toast } = useToast();

  const { mutate, status } = mutation;

  const handleMutation = (data: TVariables) => {
    mutate(data, {
      onSuccess: () => {
        toast({
          title: "success",
          description: successMessage,
          duration: 3000,
        });
        setTimeout(() => {
          console.log("Refreshing router after mutation");
          window.location.reload(); // 強制的にページをリロード
        }, 3000);
      },
      onError: (error: unknown) => {
        // error の型を unknown にする
        console.error(`${successMessage} error`, error);
        toast({
          title: "error",
          description: errorMessage,
          duration: 3000,
        });
      },
    });
  };

  const isLoading = status === "pending";

  return { handleMutation, isLoading };
};
