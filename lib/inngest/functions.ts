import { db } from "@/db/drizzle";
import { inngest } from "./client";
import { accounts, budgets, categories, transactions } from "@/db/schema";
import { and, eq, gte, lt, lte, sum } from "drizzle-orm";
import { clerkClient } from "@clerk/nextjs/server";
import { sendBudgetThresholdEmail, sendMonthlyInsightsEmail } from "@/services/email-service";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface Stats {
  totalIncome: number;
  totalExpenses: number;
  byCategory: Record<string, number>;
}

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
          .select({ totalAmount: sum(transactions.amount) })
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

export const generateMonthlyReports = inngest.createFunction(
  {
    id: "generate-monthly-reports",
    name: "Generate Monthly Reports",
  },
  { cron: "0 0 1 * *" }, // First day of each month
  async ({ step }) => {
    const users = await step.run("fetch-users", async () => {
      return await db.selectDistinct({ userId: accounts.userId }).from(accounts);
    });

    let processedCount = 0;

    for (const { userId } of users) {
      await step.run(`generate-report-${userId}`, async () => {
        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);

        const stats = await getMonthlyStats(userId, lastMonth);
        const monthName = lastMonth.toLocaleString("default", {
          month: "long",
          year: "numeric"
        });

        // Get user details from Clerk
        const user = await clerkClient.users.getUser(userId);
        const emailAddress = user.emailAddresses[0].emailAddress;
        const userName = user.firstName || "there";

        // Generate AI insights
        const insights = await generateFinancialInsights(stats, monthName);

        // Send the email with complete report data
        await sendMonthlyInsightsEmail(
          emailAddress,
          userName,
          {
            stats,
            month: monthName,
            insights
          }
        );

        processedCount++;
      });
    }

    return { processed: processedCount };
  }
);

async function getMonthlyStats(userId: string, month: Date) {
  const startDate = new Date(month.getFullYear(), month.getMonth(), 1);
  const endDate = new Date(month.getFullYear(), month.getMonth() + 1, 0);

  const transactionsData = await db
    .select({
      amount: transactions.amount,
      categoryId: transactions.categoryId,
      accountId: transactions.accountId,
      categoryName: categories.name,
    })
    .from(transactions)
    .innerJoin(accounts, eq(transactions.accountId, accounts.id))
    .leftJoin(categories, eq(transactions.categoryId, categories.id))
    .where(
      and(
        eq(accounts.userId, userId),
        gte(transactions.date, startDate),
        lte(transactions.date, endDate)
      )
    );

  return transactionsData.reduce(
    (stats: Stats & { transactionCount: number }, t) => {
      const amount = Number(t.amount);
      // Assuming negative amounts are expenses, positive are income
      if (amount < 0) {
        stats.totalExpenses += Math.abs(amount)/1000;
        stats.byCategory[t.categoryName!] = (stats.byCategory[t.categoryName!] || 0) + Math.abs(amount)/1000;
      } else {
        stats.totalIncome += amount/1000;
      }
      return stats;
    },
    {
      totalExpenses: 0,
      totalIncome: 0,
      byCategory: {},
      transactionCount: transactionsData.length,
    }
  );
}

async function generateFinancialInsights(stats: Stats, month: string) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    Analyze this financial data and provide 3 concise, actionable insights.
    Focus on spending patterns and practical advice.
    Keep it friendly and conversational.

    Financial Data for ${month}:
    - Total Income: INR ${stats.totalIncome}
    - Total Expenses: INR ${stats.totalExpenses}
    - Net Income: INR ${stats.totalIncome - stats.totalExpenses}
    - Expense Categories: ${Object.entries(stats.byCategory)
      .map(([category, amount]) => `${category}: INR ${amount}`)
      .join(", ")}

    Format the response as a JSON array of strings, like this:
    ["insight 1", "insight 2", "insight 3"]
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("Error generating insights:", error);
    return [
      "Your highest expense category this month might need attention.",
      "Consider setting up a budget for better financial management.",
      "Track your recurring expenses to identify potential savings.",
    ];
  }
}

// Helper function to check if the last alert was sent in a new month
function isNewMonth(lastAlertDate: Date, currentDate: Date): boolean {
  return (
    lastAlertDate.getMonth() !== currentDate.getMonth() ||
    lastAlertDate.getFullYear() !== currentDate.getFullYear()
  );
}
