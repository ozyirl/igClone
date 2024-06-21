import { db } from "./db";
import { and, eq } from "drizzle-orm";
import { likes } from "./db/schema";
export async function getMyImages() {
  const images = await db.query.images.findMany({});

  return images;
}

export async function imageLiked(
  userId: string,
  imageId: number,
  like: boolean,
) {
  try {
    if (like) {
      await db.insert(likes).values({
        userId,
        imageId,
      });
    } else {
      await db
        .delete(likes)
        .where(and(eq(likes.userId, userId), eq(likes.imageId, imageId)));
    }
  } catch (error) {
    console.error("Failed to update like status", error);
    throw new Error("Failed to update like status");
  }
}
