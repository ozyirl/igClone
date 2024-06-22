import type { NextRequest } from "next/server";
import { findLike } from "~/server/queries";
import { config } from "dotenv";

config({ path: ".env" });

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const imageId = searchParams.get("imageId")
    ? parseInt(searchParams.get("imageId") || "0", 10)
    : NaN;

  // Check if userId is null or empty string
  if (!userId || typeof userId !== "string") {
    return new Response(
      JSON.stringify({ error: "Invalid request parameters" }),
      { status: 400 },
    );
  }

  if (isNaN(imageId)) {
    return new Response(JSON.stringify({ error: "Invalid imageId" }), {
      status: 400,
    });
  }

  try {
    const existingLike = await findLike(userId, imageId);
    const isLiked = !!existingLike;

    return new Response(JSON.stringify({ isLiked }), { status: 200 });
  } catch (error) {
    console.error("Failed to fetch like status", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch like status" }),
      { status: 500 },
    );
  }
}
