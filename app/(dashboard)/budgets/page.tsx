"use client"

import React from 'react'
import BudgetList from '@/components/budgets/budget-list'
import CreateBudgetButton from '@/components/budgets/create-budget-button'
import DashboardHeader from '@/components/dashboard/dashboard-header'
import DashboardShell from '@/components/dashboard/dashboard-shell'

export default function BudgetsPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Budgets"
        text="Create and manage your monthly budgets."
      >
        <CreateBudgetButton />
      </DashboardHeader>
      <div className="grid gap-4">
        <BudgetList />
      </div>
    </DashboardShell>
  )
}