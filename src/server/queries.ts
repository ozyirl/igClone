import { db } from "./db";

export async function getMyImages() {
  const images = await db.query.images.findMany({});

  return images;
}
