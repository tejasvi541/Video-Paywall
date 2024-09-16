import { db } from "@/db/db";
import { users } from "@/db/schema";
import { signStreamURL } from "@/lib/sign-stream-url";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import * as z from "zod";

const app = new Hono().get(
  "/get-signed-url",
  verifyAuth(),
  zValidator(
    "query",
    z.object({
      iFrameUrl: z.string(),
    })
  ),
  async (c) => {
    const session = c.get("authUser");
    const { iFrameUrl } = c.req.valid("query");

    if (!session.token?.email) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, session.token.email));

    if (user.length === 0) {
      return c.json({ error: "User not found" }, 404);
    }

    if (!user[0].isPremium) {
      return c.json({ error: "User is not premium" }, 403);
    }
    // get siging url
    const signedUrl = signStreamURL(iFrameUrl, process.env.BUNNY_SECURITY_KEY!);
    if (!signedUrl) {
      return c.json({ error: "Error signing url" }, 500);
    }
    return c.json({ signedUrl }, 200);
  }
);

export default app;
