import { defineConfig } from "drizzle-kit";
import { config } from "dotenv";

config({ path: "./.env.local" });

export default defineConfig({
  schema: "./src/db/schema.ts",
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
  dialect: "postgresql",
  verbose: true,
  strict: true,
});
