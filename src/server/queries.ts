import { db } from "./db";
import { and, eq } from "drizzle-orm";
import { likes, users } from "./db/schema";
export async function getMyImages() {
  const images = await db.query.images.findMany({});

  return images;
}

export async function createUser(userId: string, fullName: string) {
  await db.insert(users).values({
    userId: userId,
    fullName: fullName,
  });
}

export async function findLike(userId: string, imageId: number) {
  const results = await db
    .select()
    .from(likes)
    .where((likes) => and(eq(likes.userId, userId), eq(likes.imageId, imageId)))
    .execute();

  return results[0] || null;
}

export async function removeLike(userId: string, imageId: number) {
  return await db
    .delete(likes)
    .where(and(eq(likes.userId, userId), eq(likes.imageId, imageId)));
}

export async function imageLiked(
  userId: string,
  imageId: number,
  like: boolean,
) {
  if (like) {
    return await db.insert(likes).values({
      userId: userId,
      imageId: imageId,
    });
  }
}
