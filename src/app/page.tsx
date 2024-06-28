import Link from "next/link";
import { SignedOut, SignedIn } from "@clerk/nextjs";
import PostList from "./posts/PostList";
import CreateProfile from "./posts/create-profile";

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
        {/* <div className="flex h-screen flex-col items-center justify-center">
          <h1 className="text-2xl font-semibold text-white">
            Create your profile with just a click
          </h1>
          <CreateProfile />
        </div> */}
        <PostList />
      </SignedIn>
    </main>
  );
}
