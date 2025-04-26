import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { db } from "@/db/drizzle";
import { accounts, budgets, insertBudgetSchema, transactions } from "@/db/schema";
import { eq, and, desc, inArray, lt, gte } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";

// Create budget schema excluding auto-generated fields
const createBudgetSchema = insertBudgetSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  userId: true,
});

// Update budget schema making all fields optional
const updateBudgetSchema = createBudgetSchema.partial();

const app = new Hono()
  // Get all budgets for the authenticated user
  .get("/",
    clerkMiddleware(),
    async (ctx) => {
      const auth = getAuth(ctx);
      if (!auth?.userId) {
        return ctx.json({ error: "Unauthorized" }, 401);
      }

      try {
        const result = await db.query.budgets.findMany({
          where: eq(budgets.userId, auth.userId),
          orderBy: [desc(budgets.createdAt)],
        });

        const accountIds = result.map((budget) => budget.accountId).filter((id): id is string => id !== null);
        const startDate = new Date();
        startDate.setDate(1);
        const expenses = await db.query.transactions.findMany({
          where: and(
            inArray(transactions.accountId, accountIds),
            lt(transactions.amount, 0), // Only get negative amounts (expenses)
            gte(transactions.date, startDate),
          ),
          orderBy: [desc(transactions.date)],
        });

        // Combine budgets with their expenses and calculate total spent
        const budgetsWithExpenses = result.map(budget => {
          const budgetExpenses = expenses.filter(expense =>
            expense.accountId === budget.accountId
          );

          // Calculate total spent (sum of all negative amounts)
          const spent = budgetExpenses.reduce((total, expense) =>
            total + Math.abs(expense.amount) / 1000, 0
          );

          return {
            ...budget,
            spent,
            remaining: budget.amount - spent,
            expenses: budgetExpenses
          };
        });

        return ctx.json({ data: budgetsWithExpenses });
      } catch (error) {
        console.error("Error fetching budgets:", error);
        return ctx.json({ error: "Failed to fetch budgets" }, 500);
      }
    })

  // Get a single budget by ID
  .get("/:id", clerkMiddleware(), async (ctx) => {
    const auth = getAuth(ctx);
    if (!auth?.userId) {
      return ctx.json({ error: "Unauthorized" }, 401);
    }

    const id = ctx.req.param("id");

    try {
      const budget = await db.query.budgets.findFirst({
        where: and(
          eq(budgets.id, id),
          eq(budgets.userId, auth.userId)
        ),
      });

      if (!budget) {
        return ctx.json({ error: "Budget not found" }, 404);
      }

      return ctx.json({ data: budget });
    } catch (error) {
      console.error("Error fetching budget:", error);
      return ctx.json({ error: "Failed to fetch budget" }, 500);
    }
  })

  // Create a new budget
  .post("/", clerkMiddleware(), zValidator("json", createBudgetSchema), async (ctx) => {
    const auth = getAuth(ctx);
    if (!auth?.userId) {
      return ctx.json({ error: "Unauthorized" }, 401);
    }

    const data = ctx.req.valid("json");

    try {
      const [newBudget] = await db.insert(budgets).values({
        ...data,
        id: nanoid(),
        userId: auth.userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      }).returning();

      return ctx.json({ data: newBudget }, 201);
    } catch (error) {
      console.error("Error creating budget:", error);
      return ctx.json({ error: "Failed to create budget" }, 500);
    }
  })

  // Update an existing budget
  .put("/:id", clerkMiddleware(), zValidator("json", updateBudgetSchema), async (ctx) => {
    const auth = getAuth(ctx);
    if (!auth?.userId) {
      return ctx.json({ error: "Unauthorized" }, 401);
    }

    const id = ctx.req.param("id");
    const data = ctx.req.valid("json");

    console.log("Updating budget with ID:", id, "Data:", data);
    

    try {
      const [updatedBudget] = await db.update(budgets)
        .set({
          ...data,
          updatedAt: new Date(),
        })
        .where(and(
          eq(budgets.id, id),
          eq(budgets.userId, auth.userId)
        ))
        .returning();

      if (!updatedBudget) {
        return ctx.json({ error: "Budget not found" }, 404);
      }

      return ctx.json({ data: updatedBudget });
    } catch (error) {
      console.error("Error updating budget:", error);
      return ctx.json({ error: "Failed to update budget" }, 500);
    }
  })

  // Delete a budget
  .delete("/:id", clerkMiddleware(), async (ctx) => {
    const auth = getAuth(ctx);
    if (!auth?.userId) {
      return ctx.json({ error: "Unauthorized" }, 401);
    }

    const id = ctx.req.param("id");

    try {
      const [deletedBudget] = await db.delete(budgets)
        .where(and(
          eq(budgets.id, id),
          eq(budgets.userId, auth.userId)
        ))
        .returning();

      if (!deletedBudget) {
        return ctx.json({ error: "Budget not found" }, 404);
      }

      return ctx.json({ data: "Budget deleted successfully" });
    } catch (error) {
      console.error("Error deleting budget:", error);
      return ctx.json({ error: "Failed to delete budget" }, 500);
    }
  });

export default app;
