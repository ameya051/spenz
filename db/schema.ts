import { integer, pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
import { z } from "zod";

export const accounts = pgTable("accounts", {
    id: text("id").primaryKey(),
    plaidId: text("plaid_id"),
    name: text("name").notNull(),
    userId: text("user_id").notNull(),
});

export const accountsRelations = relations(accounts, ({ many }) => ({
    transactions: many(transactions),
}));

export const insertAccountSchema = createInsertSchema(accounts);

export const categories = pgTable("categories", {
    id: text("id").primaryKey(),
    plaidId: text("plaid_id"),
    name: text("name").notNull(),
    userId: text("user_id").notNull(),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
    transactions: many(transactions),
    budgets: many(budgets),
}));

export const insertCategorySchema = createInsertSchema(categories);

export const transactions = pgTable("transactions", {
    id: text("id").primaryKey(),
    amount: integer("amount").notNull(),
    payee: text("payee").notNull(),
    notes: text("notes"),
    date: timestamp("date", { mode: "date" }).notNull(),
    accountId: text("account_id").references(() => accounts.id, {
        onDelete: "cascade",
    }).notNull(),
    categoryId: text("category_id").references(() => categories.id, {
        onDelete: "set null",
    }),
});

export const transactionsRelations = relations(transactions, ({ one }) => ({
    account: one(accounts, {
        fields: [transactions.accountId],
        references: [accounts.id],
    }),
    categories: one(categories, {
        fields: [transactions.categoryId],
        references: [categories.id],
    }),
}));

export const insertTransactionSchema = createInsertSchema(transactions, {
    date: z.coerce.date(),
});

export const budgets = pgTable("budgets", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  amount: integer("amount").notNull(), // Budget amount in cents
  period: text("period").notNull(), // 'monthly', 'weekly', 'yearly'
  categoryId: text("category_id").references(() => categories.id, {
    onDelete: "set null",
  }), // null means all categories
  startDate: timestamp("start_date", { mode: "date" }).notNull(),
  endDate: timestamp("end_date", { mode: "date" }),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  userId: text("user_id").notNull(),
  isRecurring: boolean("is_recurring").default(true).notNull(),
});

export const budgetsRelations = relations(budgets, ({ one }) => ({
  category: one(categories, {
    fields: [budgets.categoryId],
    references: [categories.id],
  }),
}));

export const insertBudgetSchema = createInsertSchema(budgets, {
  amount: z.coerce.number().positive("Amount must be positive"),
  period: z.enum(["monthly", "weekly", "yearly"]).default("monthly"),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional(),
});

