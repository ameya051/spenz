"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import BudgetDialog from "./budget-dialog";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";
import { useCreateBudget } from "@/features/budgets/api/use-create-budget";

interface BudgetFormData {
  accountId: string;
  amount: number;
}

export default function CreateBudgetButton() {
  const [open, setOpen] = useState(false);

  const budgetmutation = useCreateBudget()


  const accountQuery = useGetAccounts();
  const accountOptions = (accountQuery.data ?? []).map((account) => ({
    label: account.name,
    value: account.id,
  }));

  const accountMutation = useCreateAccount();
  const onCreateAccount = (name: string) => accountMutation.mutate({ name });

  function handleCreateBudget(data: BudgetFormData): void {
    console.log(data);
    budgetmutation.mutate(data);
    setOpen(false);
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <PlusCircle className="mr-2 h-4 w-4" />
        New Budget
      </Button>

      <BudgetDialog
        open={open}
        onOpenChange={setOpen}
        accountOptions={accountOptions}
        onCreateAccount={onCreateAccount}
        disabled={accountMutation.isPending}
        onSubmit={handleCreateBudget}
      />
    </>
  );
}
