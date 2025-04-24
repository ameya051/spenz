"use client"

import { UseQueryResult } from "@tanstack/react-query"
import BudgetCard from "./budget-card"
import { EmptyState } from "../shared/empty-state"
import EditBudgetDialog from "./edit-budget-dialog"

interface Expense {
  date: string;
  id: string;
  amount: number;
  notes: string | null;
  accountId: string;
  categoryId: string | null;
}

interface Budget {
  id: string;
  userId: string;
  amount: number;
  accountId: string | null;
  lastAlertSent: string | null;
  createdAt: string;
  updatedAt: string;
  spent: number;
  remaining: number;
  expenses: Expense[];
}

interface Props {
  budgetsQuery: UseQueryResult<Budget[]>
}

export default function BudgetList({ budgetsQuery }: Props) {
  if (budgetsQuery.isLoading) {
    return <BudgetListSkeleton />
  }

  if (budgetsQuery.data?.length === 0) {
    return (
      <EmptyState
        title="No budgets created yet"
        description="Create your first budget to start tracking your spending."
        icon="Wallet"
      />
    )
  }

  return (
    <>
      <EditBudgetDialog />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {budgetsQuery.data?.map((budget) => (
          <BudgetCard key={budget.id} budget={budget} />
        ))}
      </div>
    </>
  )
}

function BudgetListSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <div 
          key={i}
          className="h-[180px] rounded-xl border border-dashed p-6 animate-pulse bg-muted"
        />
      ))}
    </div>
  )
}