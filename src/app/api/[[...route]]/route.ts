import { Hono } from "hono";

import { handle } from "hono/vercel";

export const runtime = "nodejs";

const app = new Hono().basePath("/api");

app.get("/hello", (c) => {
  return c.json({ hello: "world" });
});

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
