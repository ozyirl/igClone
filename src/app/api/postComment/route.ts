import type { NextRequest } from "next/server";
import { putComment } from "~/server/queries";
export async function POST(req: NextRequest) {
  console.log("api route called");

  try {
    const { userId, imageId, content } = await req.json();
    console.log("request body", { userId, imageId, content });
    if (!userId || !imageId || !content) {
      return new Response(
        JSON.stringify({ error: "invalid request parameters" }),
        { status: 400 },
      );
    }

    if (content) {
      await putComment(userId, parseInt(imageId, 10), content);
      console.log("comment POSTed");
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } else {
      console.log("comment does not exist");
      return new Response(
        JSON.stringify({ success: false, message: "no comment" }),
        { status: 404 },
      );
    }
  } catch (error) {
    console.error("failed to add comment", error);
    return new Response(JSON.stringify({ error: "failed to add comment" }), {
      status: 500,
    });
  }
}
