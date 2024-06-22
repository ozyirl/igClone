import type { NextRequest } from "next/server";
import { imageLiked, findLike, removeLike } from "~/server/queries";
import { config } from "dotenv";

config({ path: ".env" });

export async function POST(req: NextRequest) {
  console.log("API route called");

  try {
    const { userId, imageId, like } = await req.json();
    console.log("Request body:", { userId, imageId, like });

    if (!userId || !imageId || typeof like !== "boolean") {
      return new Response(
        JSON.stringify({ error: "Invalid request parameters" }),
        { status: 400 },
      );
    }

    const existingLike = await findLike(userId, imageId);

    if (existingLike) {
      if (like) {
        console.log("Like already exists");
        return new Response(JSON.stringify({ success: true }), { status: 200 });
      } else {
        await removeLike(userId, imageId);
        console.log("Successfully removed like status");
        return new Response(JSON.stringify({ success: true }), { status: 200 });
      }
    } else {
      if (like) {
        await imageLiked(userId, parseInt(imageId, 10), like);
        console.log("Successfully updated like status");
        return new Response(JSON.stringify({ success: true }), { status: 200 });
      } else {
        console.log("No like to remove");
        return new Response(
          JSON.stringify({ success: false, message: "No like to remove" }),
          { status: 404 },
        );
      }
    }
  } catch (error) {
    console.error("Failed to update like status", error);
    return new Response(
      JSON.stringify({ error: "Failed to update like status" }),
      { status: 500 },
    );
  }
}
