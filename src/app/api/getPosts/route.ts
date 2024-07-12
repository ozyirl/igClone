import { NextRequest, NextResponse } from "next/server";
import { getMyImages } from "~/server/queries";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const posts = await getMyImages(page, limit);
    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch images", error);
    return NextResponse.json(
      { error: "Failed to fetch images" },
      { status: 500 },
    );
  }
}
