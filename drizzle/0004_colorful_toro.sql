CREATE TABLE "budgets" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"amount" integer NOT NULL,
	"period" text NOT NULL,
	"category_id" text,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"user_id" text NOT NULL,
	"is_recurring" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
ALTER TABLE "budgets" ADD CONSTRAINT "budgets_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;