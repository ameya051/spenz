import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { db } from "@/db/drizzle";
import { budgets, insertBudgetSchema, transactions, categories } from "@/db/schema";
import { eq, and, isNull, sql, desc, gte, lte, sum } from "drizzle-orm";
// import { nanoid } from "nanoid";

const createBudgetSchema = insertBudgetSchema.omit({
  id: true,
  userId: true,
  createdAt: true,
});

const updateBudgetSchema = createBudgetSchema.partial();

// Create a Hono app with clerk middleware for authentication
const app = new Hono()
  // Get all budgets for the authenticated user
  .get("/", clerkMiddleware(), async (ctx) => {
    const auth = getAuth(ctx);
    if (!auth?.userId) {
      return ctx.json({ error: "Unauthorized." }, 401);
    }

    try {
      const result = await db.query.budgets.findMany({
        where: eq(budgets.userId, auth.userId),
        with: {
          category: true,
        },
        orderBy: [desc(budgets.createdAt)],
      });

      return ctx.json({ data: result });
    } catch (error) {
      console.error("Error fetching budgets:", error);
      return ctx.json({ error: "Failed to fetch budgets." }, 500);
    }
  })

  // Get budget details by ID
  .get("/:id", clerkMiddleware(), async (ctx) => {
    const auth = getAuth(ctx);
    if (!auth?.userId) {
      return ctx.json({ error: "Unauthorized." }, 401);
    }

    const id = ctx.req.param("id");
    
    try {
      const budget = await db.query.budgets.findFirst({
        where: and(
          eq(budgets.id, id),
          eq(budgets.userId, auth.userId)
        ),
        with: {
          category: true,
        },
      });

      if (!budget) {
        return ctx.json({ error: "Budget not found." }, 404);
      }

      return ctx.json({ data: budget });
    } catch (error) {
      console.error("Error fetching budget:", error);
      return ctx.json({ error: "Failed to fetch budget details." }, 500);
    }
  })

  // Get budget progress with spending data
  .get("/:id/progress", clerkMiddleware(), async (ctx) => {
    const auth = getAuth(ctx);
    if (!auth?.userId) {
      return ctx.json({ error: "Unauthorized." }, 401);
    }

    const id = ctx.req.param("id");
    
    try {
      // First get the budget
      const budget = await db.query.budgets.findFirst({
        where: and(
          eq(budgets.id, id),
          eq(budgets.userId, auth.userId)
        ),
      });

      if (!budget) {
        return ctx.json({ error: "Budget not found." }, 404);
      }
      
      // Define date range for the current period
      const today = new Date();
      let startDate, endDate;
      
      switch (budget.period) {
        case 'weekly':
          startDate = new Date(today);
          startDate.setDate(today.getDate() - today.getDay()); // Beginning of week (Sunday)
          endDate = new Date(today);
          endDate.setDate(startDate.getDate() + 6); // End of week (Saturday)
          break;
        case 'monthly':
          startDate = new Date(today.getFullYear(), today.getMonth(), 1); // Beginning of month
          endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0); // End of month
          break;
        case 'yearly':
          startDate = new Date(today.getFullYear(), 0, 1); // Beginning of year
          endDate = new Date(today.getFullYear(), 11, 31); // End of year
          break;
        default:
          startDate = budget.startDate;
          endDate = budget.endDate || today;
      }
      
      // Calculate spent amount in the current period
      let spentQuery;
      if (budget.categoryId) {
        // Budget for specific category
        spentQuery = await db
          .select({ total: sql<number>`sum(${transactions.amount})` })
          .from(transactions)
          .where(and(
            eq(transactions.categoryId, budget.categoryId),
            gte(transactions.date, startDate),
            lte(transactions.date, endDate)
          ));
      } else {
        // Budget for all categories
        spentQuery = await db
          .select({ total: sql<number>`sum(${transactions.amount})` })
          .from(transactions)
          .where(and(
            gte(transactions.date, startDate),
            lte(transactions.date, endDate)
          ));
      }
      
      const spent = spentQuery[0].total || 0;
      
      // Calculate remaining amount
      const remaining = budget.amount - spent;
      
      return ctx.json({ data: { budget, spent, remaining } });
    } catch (error) {
      console.error("Error fetching budget progress:", error);
      return ctx.json({ error: "Failed to fetch budget progress." }, 500);
    }
  })

  // Create a new budget
  .post("/", clerkMiddleware(), zValidator("json", createBudgetSchema), async (ctx) => {
    const auth = getAuth(ctx);
    if (!auth?.userId) {
      return ctx.json({ error: "Unauthorized." }, 401);
    }

    const data = ctx.req.valid("json");

    try {
      const newBudget = await db.insert(budgets).values({
        ...data,
        id: nanoid(),
        userId: auth.userId,
        createdAt: new Date(),
      });

      return ctx.json({ data: newBudget });
    } catch (error) {
      console.error("Error creating budget:", error);
      return ctx.json({ error: "Failed to create budget." }, 500);
    }
  })

  // Update an existing budget
  .put("/:id", clerkMiddleware(), zValidator("json", updateBudgetSchema), async (ctx) => {
    const auth = getAuth(ctx);
    if (!auth?.userId) {
      return ctx.json({ error: "Unauthorized." }, 401);
    }

    const id = ctx.req.param("id");
    const data = ctx.req.valid("json");

    try {
      const updatedBudget = await db.update(budgets)
        .set(data)
        .where(and(
          eq(budgets.id, id),
          eq(budgets.userId, auth.userId)
        ));

      return ctx.json({ data: updatedBudget });
    } catch (error) {
      console.error("Error updating budget:", error);
      return ctx.json({ error: "Failed to update budget." }, 500);
    }
  })

  // Delete a budget
  .delete("/:id", clerkMiddleware(), async (ctx) => {
    const auth = getAuth(ctx);
    if (!auth?.userId) {
      return ctx.json({ error: "Unauthorized." }, 401);
    }

    const id = ctx.req.param("id");

    try {
      await db.delete(budgets)
        .where(and(
          eq(budgets.id, id),
          eq(budgets.userId, auth.userId)
        ));

      return ctx.json({ data: "Budget deleted successfully." });
    } catch (error) {
      console.error("Error deleting budget:", error);
      return ctx.json({ error: "Failed to delete budget." }, 500);
    }
  })

  // Handle not found routes
  .get("/:route*", async (ctx) => {
    return ctx.json({ error: "Not found." }, 404);
  });

export default app;

function nanoid(): string | import("drizzle-orm").SQL<unknown> | import("drizzle-orm").Placeholder<string, any> {
  throw new Error("Function not implemented.");
}
