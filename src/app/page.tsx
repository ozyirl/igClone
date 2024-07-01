import Link from "next/link";
import { SignedOut, SignedIn } from "@clerk/nextjs";
import PostList from "./posts/PostList";

export default function HomePage() {
  return (
    <main>
      <SignedOut>
        <div className="flex h-screen items-center justify-center">
          <h1 className="text-2xl font-semibold text-white">
            Sign in to see the posts
          </h1>
        </div>
      </SignedOut>

      <SignedIn>
        <PostList />
      </SignedIn>
    </main>
  );
}
