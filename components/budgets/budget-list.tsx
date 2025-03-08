"use client"

import { useEffect, useState } from "react"
import { Budget } from "@/types/budget"
import BudgetCard from "./budget-card"
import { EmptyState } from "../shared/empty-state"

const MOCK_BUDGETS: Budget[] = [
  {
    id: "1",
    name: "Groceries",
    amount: 500,
    spent: 350,
    categoryId: "1",
    period: "monthly",
    createdAt: new Date(),
  },
  {
    id: "2",
    name: "All Expenses",
    amount: 2000,
    spent: 1200,
    categoryId: null, // null means all categories
    period: "monthly",
    createdAt: new Date(),
  },
  {
    id: "3",
    name: "Dining Out",
    amount: 300,
    spent: 275,
    categoryId: "2",
    period: "monthly",
    createdAt: new Date(),
  },
]

export default function BudgetList() {
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real app, you would fetch budgets from an API
    // For now, use mock data
    setTimeout(() => {
      setBudgets(MOCK_BUDGETS)
      setIsLoading(false)
    }, 500)
  }, [])

  if (isLoading) {
    return <BudgetListSkeleton />
  }

  if (budgets.length === 0) {
    return (
      <EmptyState
        title="No budgets created yet"
        description="Create your first budget to start tracking your spending."
        icon="Wallet"
      />
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {budgets.map((budget) => (
        <BudgetCard key={budget.id} budget={budget} />
      ))}
    </div>
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