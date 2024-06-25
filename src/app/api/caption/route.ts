import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createCaption } from "~/server/queries";

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    const { imageId, caption } = await req.json();

    if (!userId) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    if (!imageId || !caption) {
      return new NextResponse(
        JSON.stringify({ error: "Invalid request parameters" }),
        { status: 400 },
      );
    }

    await createCaption(imageId, caption);
    return new NextResponse(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Failed to save caption:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to save caption" }),
      { status: 500 },
    );
  }
}

export const runtime = "edge";
