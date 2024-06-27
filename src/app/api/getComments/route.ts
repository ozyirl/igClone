import { NextRequest, NextResponse } from "next/server";
import { getComments } from "~/server/queries";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const imageId = searchParams.get("imageId")
    ? parseInt(searchParams.get("imageId") || "0", 10)
    : NaN;

  if (!userId || typeof userId !== "string") {
    return NextResponse.json(
      { error: "invalid request params" },
      { status: 400 },
    );
  }

  if (isNaN(imageId)) {
    return NextResponse.json({ error: "invalid imageID" }, { status: 400 });
  }

  try {
    const comments = await getComments(imageId);

    return NextResponse.json({ comments }, { status: 200 });
  } catch (error) {
    console.error("failed to fetch comments", error);
    return NextResponse.json(
      { error: "failed to fetch comments" },
      { status: 500 },
    );
  }
}
