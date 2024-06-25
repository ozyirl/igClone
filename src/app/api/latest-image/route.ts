import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getLatestImage } from "~/server/queries";

export async function GET(req: NextRequest) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const latestImage = await getLatestImage(userId);

    if (!latestImage) {
      return NextResponse.json({ error: "No images found" }, { status: 404 });
    }

    return NextResponse.json(
      { success: true, image: latestImage },
      { status: 200 },
    );
  } catch (error) {
    console.error("Failed to fetch latest image:", error);
    return NextResponse.json(
      { error: "Failed to fetch latest image" },
      { status: 500 },
    );
  }
}

export const runtime = "edge";
