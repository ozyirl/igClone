import type { NextRequest } from "next/server";
import { createUser } from "~/server/queries";

export async function POST(req: NextRequest) {
  console.log("api route called");

  try {
    const { userId } = await req.json();

    if (!userId) {
      return new Response(JSON.stringify({ error: "invalid parameters" }), {
        status: 400,
      });
    }

    if (userId) {
      await createUser(userId);
      console.log("user created");
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } else {
      console.log("user id does not exist");
      return new Response(
        JSON.stringify({ success: false, message: "no user id" }),
        { status: 404 },
      );
    }
  } catch (error) {
    console.error("failed to add user", error);
    return new Response(JSON.stringify({ error: "failed to add user" }), {
      status: 500,
    });
  }
}
