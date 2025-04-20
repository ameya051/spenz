import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<typeof client.api.budgets[":id"]["$put"]>;
type RequestType = InferRequestType<typeof client.api.budgets[":id"]["$put"]>["json"];

export const useUpdateBudget = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (data) => {
      const response = await client.api.budgets[":id"].$put({
        param: { id },
        json: data,
      });
      return response.json();
    },
    onSuccess: () => {
      toast.success("Budget updated.");
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
    onError: () => {
      toast.error("Failed to update budget.");
    },
  });
};