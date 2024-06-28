import { NextRequest } from "next/server";
import { createUser } from "~/server/queries";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  console.log("api route called");

  try {
    const { userId } = auth();

    if (!userId) {
      return new Response(JSON.stringify({ error: "User not authenticated" }), {
        status: 401,
      });
    }

    await createUser(userId);
    console.log("user created");
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("failed to add user", error);
    return new Response(JSON.stringify({ error: "failed to add user" }), {
      status: 500,
    });
  }
}
