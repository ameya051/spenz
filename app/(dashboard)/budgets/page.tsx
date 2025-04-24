"use client"

import React from 'react'
import BudgetList from '@/components/budgets/budget-list'
import CreateBudgetButton from '@/components/budgets/create-budget-button'
import DashboardHeader from '@/components/dashboard/dashboard-header'
import DashboardShell from '@/components/dashboard/dashboard-shell'
import { useGetBudgets } from '@/features/budgets/api/use-get-budgets'
import { useGetAccounts } from '@/features/accounts/api/use-get-accounts'
import { useCreateAccount } from '@/features/accounts/api/use-create-account'
import { useCreateBudget } from '@/features/budgets/api/use-create-budget'

export default function BudgetsPage() {
  const budgetsQuery = useGetBudgets();
  const accountQuery = useGetAccounts();
  const accountMutation = useCreateAccount();
  const budgetMutation = useCreateBudget();

  const hasBudget = (budgetsQuery.data ?? []).length > 0;
  const accountOptions = (accountQuery.data ?? []).map((account) => ({
    label: account.name,
    value: account.id,
  }));

  const onCreateAccount = (name: string) => accountMutation.mutate({ name });
  
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Budgets"
        text="Create and manage your monthly budgets."
      >
        <CreateBudgetButton 
          hasBudget={hasBudget}
          accountOptions={accountOptions}
          onCreateAccount={onCreateAccount}
          isAccountLoading={accountQuery.isLoading}
          isAccountMutating={accountMutation.isPending}
          onCreateBudget={(data) => budgetMutation.mutate(data)}
          isBudgetMutating={budgetMutation.isPending}
        />
      </DashboardHeader>
      <div className="grid gap-4">
        <BudgetList 
          budgetsQuery={budgetsQuery}
        />
      </div>
    </DashboardShell>
  )
}