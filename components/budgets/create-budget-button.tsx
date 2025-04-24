"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Loader2 } from "lucide-react";
import BudgetDialog from "./budget-dialog";

interface BudgetFormData {
  accountId: string;
  amount: number;
}

interface Props {
  hasBudget: boolean;
  accountOptions: { label: string; value: string }[];
  onCreateAccount: (name: string) => void;
  isAccountLoading: boolean;
  isAccountMutating: boolean;
  onCreateBudget: (data: BudgetFormData) => void;
  isBudgetMutating: boolean;
}

export default function CreateBudgetButton({
  hasBudget,
  accountOptions,
  onCreateAccount,
  isAccountLoading,
  isAccountMutating,
  onCreateBudget,
  isBudgetMutating
}: Props) {
  const [open, setOpen] = useState(false);

  function handleCreateBudget(data: BudgetFormData): void {
    onCreateBudget(data);
    setOpen(false);
  }

  return (
    <>
      <Button 
        onClick={() => setOpen(true)} 
        disabled={hasBudget || isAccountLoading || isBudgetMutating}
        title={
          isAccountLoading 
            ? "Loading..." 
            : hasBudget 
            ? "You already have a budget" 
            : "Create a new budget"
        }
      >
        {(isAccountLoading || isBudgetMutating) ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <PlusCircle className="mr-2 h-4 w-4" />
        )}
        {isAccountLoading ? "Loading..." : "New Budget"}
      </Button>

      <BudgetDialog
        open={open}
        onOpenChange={setOpen}
        accountOptions={accountOptions}
        onCreateAccount={onCreateAccount}
        disabled={isAccountMutating}
        isLoading={isAccountLoading}
        onSubmit={handleCreateBudget}
        isSubmitting={isBudgetMutating}
      />
    </>
  );
}
