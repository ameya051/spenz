import { Hono } from "hono";
import { handle } from "hono/vercel";

import accountsApp from "./accounts";
import categoriesApp from "./categories";
import transactionsApp from "./transactions";
import budgetsApp from "./budgets";
import summaryApp from "./summary";

export const runtime = "edge";

const app = new Hono()
  .basePath("/api")
  .route("/accounts", accountsApp)
  .route("/categories", categoriesApp)
  .route("/transactions", transactionsApp)
  .route("/budgets", budgetsApp)
  .route("/summary", summaryApp)

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof app;

