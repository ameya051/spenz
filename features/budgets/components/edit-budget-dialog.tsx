import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select } from "../../../components/select";
import { useEditBudget } from "@/features/budgets/hooks/use-edit-budget";
import { useUpdateBudget } from "@/features/budgets/api/use-update-budget";
import { useGetBudget } from "@/features/budgets/api/use-get-budget";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";
import { useEffect } from "react";

const editBudgetFormSchema = z.object({
  amount: z.coerce.number().positive("Amount must be positive"),
  accountId: z.coerce.string().nonempty("Account is required"),
});

type EditBudgetFormValues = z.infer<typeof editBudgetFormSchema>;

export default function EditBudgetDialog() {
  const { isOpen, onClose, budgetId } = useEditBudget();
  const budgetQuery = useGetBudget(budgetId);
  const updateMutation = useUpdateBudget(budgetId!);

  const accountQuery = useGetAccounts();
  const accountOptions = (accountQuery.data ?? []).map((account) => ({
    label: account.name,
    value: account.id,
  }));

  const accountMutation = useCreateAccount();
  const onCreateAccount = (name: string) => accountMutation.mutate({ name });

  const form = useForm<EditBudgetFormValues>({
    resolver: zodResolver(editBudgetFormSchema),
  });

  useEffect(() => {
    if (budgetQuery.data) {
      form.reset({
        amount: budgetQuery.data.amount,
        accountId: budgetQuery.data.accountId || "",
      });
    }
  }, [budgetQuery.data, form]);

  const handleSubmit = (values: EditBudgetFormValues) => {
    updateMutation.mutate(values, {
      onSuccess: () => {
        form.reset();
        onClose();
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Budget</DialogTitle>
          <DialogDescription>
            Update your budget amount or associated account.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              name="accountId"
              control={form.control}
              disabled={accountMutation.isPending || budgetQuery.isLoading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account</FormLabel>
                  <FormControl>
                    <Select
                      placeholder="Select an account"
                      options={accountOptions}
                      onCreate={onCreateAccount}
                      value={field.value}
                      onChange={field.onChange}
                      disabled={accountMutation.isPending || budgetQuery.isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-muted-foreground">&#8377;</span>
                      </div>
                      <Input
                        type="number"
                        className="pl-7"
                        placeholder="0.00"
                        disabled={budgetQuery.isLoading}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                variant="outline"
                type="button"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={updateMutation.isPending || budgetQuery.isLoading}
              >
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}