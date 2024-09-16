import authConfig from "@/lib/auth.config";
import { Context, Hono } from "hono";
import { AuthConfig, initAuthConfig } from "@hono/auth-js";
import { handle } from "hono/vercel";

import userRoutes from "@/app/api/[[...route]]/user";
import paymentsRoutes from "@/app/api/[[...route]]/payments";
import videRoutes from "@/app/api/[[...route]]/video";
export const runtime = "nodejs";

function getAuthConfig(_c: Context): AuthConfig {
  return {
    secret: _c.env.AUTH_SECRET,
    ...authConfig,
  };
}

const app = new Hono().basePath("/api");
app.use("*", initAuthConfig(getAuthConfig));
const routes = app
  .route("/user", userRoutes)
  .route("/payments", paymentsRoutes)
  .route("/video", videRoutes);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
export type AppType = typeof routes;
