import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { images } from "./db/schema";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function getMyImages() {
  const images = await db.query.images.findMany({});

  return images;
}

// export async function fetchUserId() {
//   const image = await db.query.images.findFirst({
//     where: {
//       userId: images.userId
//     },
//     select: {
//       userId: true,
//     },
//   });

//   return image ? image.userId : null;
// }
