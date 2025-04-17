import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetBudgets = () => {
  const query = useQuery({
    queryKey: ["budgets"],
    queryFn: async () => {
      const response = await client.api.budgets.$get();

      if (!response.ok) throw new Error("Failed to fetch budgets.");

      const { data } = await response.json();

      return data;
    },
  });

  return query;
};