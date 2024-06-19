import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

const user = await db.select().from(schema.users);

export async function fetchImage() {
  const images = await db
    .select({ url: schema.images.url })
    .from(schema.images);

  const imageID = await db.select({ id: schema.images.id }).from(schema.images);

  return { images, imageID };
}

export { user };
