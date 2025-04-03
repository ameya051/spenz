import { db } from "@/db/drizzle";
import { inngest } from "./client";
import { budgets, transactions } from "@/db/schema";
import { and, eq, gte, lt, sum } from "drizzle-orm";
import { clerkClient } from "@clerk/nextjs/server";
import { sendBudgetThresholdEmail } from "@/services/email-service";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },
);

export const checkBudgetAlerts = inngest.createFunction(
  { name: "Check Budget Alerts", id: "check-budget-alerts" },
  { cron: "0 */6 * * *" }, // Every 6 hours
  async ({ step }) => {
    const budgetsData = await step.run('fetch-budgets', async () => {
      return await db.query.budgets.findMany();
    });

    for (const budget of budgetsData) {
      await step.run(`check-budget-${budget.id}`, async () => {
        const startDate = new Date();
        startDate.setDate(1);

        const result = await db
          .select({ totalAmount: sum(transactions.amount), })
          .from(transactions)
          .where(and(
            eq(transactions.accountId, budget.accountId as string),
            lt(transactions.amount, 0),
            gte(transactions.date, startDate),
          ))
        const spent = Number(result[0]?.totalAmount || 0) * -1 / 1000;
        const percentage = (spent / budget.amount) * 100;
        if (percentage >= 20 && (!budget.lastAlertSent ||
          isNewMonth(new Date(budget.lastAlertSent), new Date()))) {
          const user = await clerkClient.users.getUser(budget.userId);
          await sendBudgetThresholdEmail(user.emailAddresses[0].emailAddress,
            budget.amount,
            spent,
            percentage
          )
          return await db
            .update(budgets)
            .set({ lastAlertSent: new Date() })
            .where(eq(budgets.id, budget.id));
        }
      })
    }
  }
);

// Helper function to check if the last alert was sent in a new month
function isNewMonth(lastAlertDate: Date, currentDate: Date): boolean {
  return (
    lastAlertDate.getMonth() !== currentDate.getMonth() ||
    lastAlertDate.getFullYear() !== currentDate.getFullYear()
  );
}