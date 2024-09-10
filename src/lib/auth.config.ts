import { db } from "@/db/db";
import { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

export default {
  adapter: DrizzleAdapter(db),
  providers: [GitHub],
  session: {
    strategy: "jwt",
  },
} satisfies NextAuthConfig;
