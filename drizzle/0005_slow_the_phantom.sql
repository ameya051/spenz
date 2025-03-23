ALTER TABLE "budgets" DROP CONSTRAINT "budgets_category_id_categories_id_fk";
--> statement-breakpoint
ALTER TABLE "transactions" ALTER COLUMN "payee" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "budgets" ADD COLUMN "last_alert_sent" timestamp;--> statement-breakpoint
ALTER TABLE "budgets" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "budgets" DROP COLUMN "name";--> statement-breakpoint
ALTER TABLE "budgets" DROP COLUMN "period";--> statement-breakpoint
ALTER TABLE "budgets" DROP COLUMN "category_id";--> statement-breakpoint
ALTER TABLE "budgets" DROP COLUMN "start_date";--> statement-breakpoint
ALTER TABLE "budgets" DROP COLUMN "end_date";--> statement-breakpoint
ALTER TABLE "budgets" DROP COLUMN "is_recurring";