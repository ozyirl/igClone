import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { db } from "~/server/db";
import { images } from "~/server/db/schema";
import { clerkClient } from "@clerk/clerk-sdk-node";
const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 40 } })
    .middleware(async ({ req }) => {
      const user = auth();

      if (!user.userId) throw new UploadThingError("Unauthorized");

      const userName = await clerkClient.users.getUser(user.userId);

      return { userId: user.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const user = await clerkClient.users.getUser(metadata.userId); // Fetch user details using clerkClient

      const fullName = `${user.firstName} ${user.lastName}`;
      await db.insert(images).values({
        url: file.url,
        userId: metadata.userId,
        uploadedBy: fullName,
      });

      return { uploadedBy: fullName };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;