import type { NextApiRequest, NextApiResponse } from "next";
import { imageLiked } from "~/server/queries";
import { config } from "dotenv";

config({ path: ".env" });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log("API route called");

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { userId, imageId, like } = req.body;

  console.log("Request body:", req.body);

  if (!userId || !imageId || typeof like !== "boolean") {
    return res.status(400).json({ error: "Invalid request parameters" });
  }

  try {
    await imageLiked(userId, parseInt(imageId), like);
    console.log("Successfully updated like status");
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Failed to update like status", error);
    res.status(500).json({ error: "Failed to update like status" });
  }
}
