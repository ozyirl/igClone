import { NextRequest, NextResponse } from "next/server";
import { getMyImages } from "~/server/queries";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "4");

  try {
    const { images, totalCount } = await getMyImages(page, limit);
    return NextResponse.json({ posts: images, totalCount });
  } catch (error) {
    console.error("Failed to fetch images", error);
    return NextResponse.json(
      { error: "Failed to fetch images" },
      { status: 500 },
    );
  }
}
