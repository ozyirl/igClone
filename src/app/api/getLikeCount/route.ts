import { NextRequest, NextResponse } from "next/server";
import { getImageLikes } from "~/server/queries";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const imageId = searchParams.get("imageId")
    ? parseInt(searchParams.get("imageId") || "0", 10)
    : NaN;

  if (isNaN(imageId)) {
    return NextResponse.json({ error: "Invalid image ID" }, { status: 400 });
  }

  try {
    const postLikes = await getImageLikes(imageId);
    return NextResponse.json({ postLikes }, { status: 200 });
  } catch (error) {
    console.error("Failed to get likes", error);
    return NextResponse.json({ error: "Failed to get likes" }, { status: 500 });
  }
}
