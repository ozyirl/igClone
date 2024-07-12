import { NextRequest, NextResponse } from "next/server";
import { getMyImages } from "~/server/queries";

type ImageType = {
  id: number;
  profileImageUrl: string | null;
  uploadedBy: string | null;
  url: string | null;
  description: string | null;
  userId: string | null;
};

export async function GET(req: NextRequest) {
  try {
    const posts: ImageType[] = await getMyImages();
    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch images", error);
    return NextResponse.json(
      { error: "Failed to fetch images" },
      { status: 500 },
    );
  }
}
