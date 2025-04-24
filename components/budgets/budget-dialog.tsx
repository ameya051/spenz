"use client";

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
import { Select } from "../select";

const budgetFormSchema = z.object({
  amount: z.coerce.number().positive("Amount must be positive"),
  accountId: z.coerce.string().nonempty("Account is required"),
});

type BudgetFormValues = z.infer<typeof budgetFormSchema>;

interface BudgetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: BudgetFormValues) => void;
  accountOptions: { label: string; value: string }[];
  onCreateAccount: (name: string) => void;
  disabled?: boolean;
  isLoading?: boolean;
  isSubmitting?: boolean;
}

export default function BudgetDialog({
  open,
  onOpenChange,
  onSubmit,
  accountOptions,
  onCreateAccount,
  disabled,
  isLoading,
  isSubmitting
}: BudgetDialogProps) {
  const form = useForm<BudgetFormValues>({
    resolver: zodResolver(budgetFormSchema),
  });

  const handleSubmit = (values: BudgetFormValues) => {
    form.reset();
    onSubmit(values);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Budget</DialogTitle>
          <DialogDescription>
            Set a budget for a specific category or for all your expenses.
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
              disabled={disabled}
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
                      disabled={disabled}
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
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        &#8377;
                      </span>
                      <Input
                        type="number"
                        className="pl-7"
                        placeholder="0.00"
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
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Create Budget</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
