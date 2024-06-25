import { NextApiRequest, NextApiResponse } from "next";
import { auth } from "@clerk/nextjs/server";
import { createCaption } from "~/server/queries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { imageId, caption } = req.body;
    const user = auth();

    if (!user.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      await createCaption(imageId, caption);
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error("Failed to save caption:", error);
      return res.status(500).json({ error: "Failed to save caption" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
