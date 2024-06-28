import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { putComment } from "~/server/queries";

export async function POST(req: NextRequest) {
  console.log("api route called");

  try {
    const { userId, imageId, content } = await req.json();
    console.log("request body", { userId, imageId, content });

    const headersList = headers();
    console.log("Headers:", Object.fromEntries(headersList));

    if (!userId || !imageId || !content) {
      return NextResponse.json(
        { error: "invalid request parameters" },
        { status: 400 },
      );
    }

    if (content) {
      await putComment(userId, parseInt(imageId, 10), content);
      console.log("comment POSTed");
      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      console.log("comment does not exist");
      return NextResponse.json(
        { success: false, message: "no comment" },
        { status: 404 },
      );
    }
  } catch (error) {
    console.error("failed to add comment", error);
    return NextResponse.json(
      { error: "failed to add comment" },
      { status: 500 },
    );
  }
}
