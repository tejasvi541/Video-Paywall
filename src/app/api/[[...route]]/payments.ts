import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { verifyAuth } from "@hono/auth-js";
import { z } from "zod";
import { razorpay } from "@/lib/razorpay";
import crypto from "crypto";
import { db } from "@/db/db";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";
const app = new Hono()
  .post(
    "/verify-payment",
    verifyAuth(),
    zValidator(
      "json",
      z.object({
        paymentId: z.string(),
        orderId: z.string(),
        signature: z.string(),
      })
    ),
    async (c) => {
      const session = c.get("authUser");
      if (!session.token?.email) {
        return c.json({ error: "unauthorized" }, 401);
      }

      const { paymentId, orderId, signature } = c.req.valid("json");

      const crypt = crypto.createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET!
      );
      crypt.update(`${orderId}|${paymentId}`);
      const hash = crypt.digest("hex");

      if (hash !== signature) {
        return c.json({ error: "signature mismatch" }, 400);
      }

      await db
        .update(users)
        .set({ isPremium: true })
        .where(eq(users.email, session.token.email))
        .run();

      return c.json({ data: "payment success" }, 200);
    }
  )
  .post(
    "/create-order",
    verifyAuth(),
    zValidator(
      "json",
      z.object({
        planId: z.string().nonempty(),
      })
    ),
    async (c) => {
      const session = c.get("authUser");
      if (!session.token?.email) {
        return c.json({ error: "unauthorized" }, 401);
      }

      const options = {
        amount: 999,
        currency: "inr",
        receipt: "order_rcptid_111",
      };

      const order = await razorpay.orders.create(options);

      if (!order) {
        return c.json({ error: "order creation failed" }, 500);
      }

      return c.json({ data: order }, 200);
    }
  );

export default app;
