import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { toast } from "sonner";

export const useDeleteBudget = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await client.api.budgets[":id"].$delete({
        param: { id },
      });
      return response.json();
    },
    onSuccess: () => {
      toast.success("Budget deleted.");
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
    onError: () => {
      toast.error("Failed to delete budget.");
    },
  });
};