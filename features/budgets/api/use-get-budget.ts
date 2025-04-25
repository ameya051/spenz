import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetBudget = (id: string | null) => {
  const query = useQuery({
    queryKey: ["budgets", id],
    queryFn: async () => {
      if (!id) return null;
      
      const response = await client.api.budgets[":id"].$get({
        param: { id },
      });

      if (!response.ok) throw new Error("Failed to fetch budget.");

      const { data } = await response.json();
      return data;
    },
    enabled: !!id,
  });

  return query;
};