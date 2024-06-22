import * as schema from "./schema";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";

config({ path: ".env" });

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set.");
}

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema });
