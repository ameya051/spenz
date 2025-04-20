import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { calculatePercentage, formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { useEditBudget } from "@/features/budgets/hooks/use-edit-budget";
import { useConfirm } from "@/hooks/use-confirm";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Budget {
  id: string;
  amount: number;
  spent: number;
  categoryId?: string;
}

export const useDeleteBudget = (budgetId: string) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/budgets/${budgetId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete budget');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
    },
  });
};

export default function BudgetCard({ budget }: { budget: Budget }) {
  const percentage = calculatePercentage(budget.spent, budget.amount);
  const remaining = budget.amount - budget.spent;
  const { onOpen } = useEditBudget();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this budget."
  );
  const deleteMutation = useDeleteBudget(budget.id);

  // Determine the color of the progress bar based on percentage
  let progressColor = "bg-green-500";
  if (percentage > 85) {
    progressColor = "bg-red-500";
  } else if (percentage > 65) {
    progressColor = "bg-amber-500";
  }

  const handleDelete = async () => {
    const ok = await confirm();
    if (ok) {
      deleteMutation.mutate();
    }
  };

  return (
    <>
      <ConfirmDialog />
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <h1>Monthly Budget</h1>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => onOpen(budget.id)}
            >
              <span className="sr-only">Edit</span>
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="destructive"
              size="icon"
              className="h-8 w-8"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
            >
              <span className="sr-only">Delete</span>
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">
              {formatCurrency(budget.amount)}
            </span>
            <span
              className={`text-sm font-medium ${
                percentage >= 100 ? "text-red-500" : "text-muted-foreground"
              }`}
            >
              {formatCurrency(budget.spent)} spent
            </span>
          </div>
          <div className="space-y-1">
            <Progress
              value={percentage > 100 ? 100 : percentage}
              className={`h-2 ${progressColor}`}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{percentage}% used</span>
              <span>{formatCurrency(remaining)} remaining</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
