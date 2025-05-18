import { integer, pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
import { z } from "zod";

export const users = pgTable("users", {
    id: text("id").primaryKey(),
    clerkUserId: text("clerk_user_id").notNull().unique(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    imageUrl: text("image_url"),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
    accounts: many(accounts),
    categories: many(categories),
    budgets: many(budgets),
}));

export const insertUserSchema = createInsertSchema(users);

export const accounts = pgTable("accounts", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    userId: text("user_id").notNull(),
});

export const accountsRelations = relations(accounts, ({ many, one }) => ({
    transactions: many(transactions),
    user: one(users, {
        fields: [accounts.userId],
        references: [users.id],
    }),
}));

export const insertAccountSchema = createInsertSchema(accounts);

export const categories = pgTable("categories", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    userId: text("user_id").notNull(),
});

export const categoriesRelations = relations(categories, ({ many, one }) => ({
    transactions: many(transactions),
    user: one(users, {
        fields: [categories.userId],
        references: [users.id],
    }),
}));

export const insertCategorySchema = createInsertSchema(categories);

export const transactions = pgTable("transactions", {
    id: text("id").primaryKey(),
    amount: integer("amount").notNull(),
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
    amount: integer("amount").notNull(), // Budget amount in cents
    accountId: text("account_id").references(() => accounts.id, {
        onDelete: "cascade",
    }),
    userId: text("user_id").notNull(),
    lastAlertSent: timestamp("last_alert_sent", { mode: "date" }),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

export const budgetsRelations = relations(budgets, ({ one }) => ({
    account: one(accounts, {
        fields: [budgets.accountId],
        references: [accounts.id],
    }),
    user: one(users, {
        fields: [budgets.userId],
        references: [users.id],
    }),
}));

export const insertBudgetSchema = createInsertSchema(budgets, {
    amount: z.coerce.number().positive("Amount must be positive"),
    accountId: z.coerce.string().nonempty("Account is required"),
});
