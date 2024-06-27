import Link from "next/link";

import { SignedOut, SignedIn } from "@clerk/nextjs";
import PostList from "./posts/PostList";
import { Button } from "~/components/ui/button";
import CreateProfile from "~/_Components/create-profile";
export default async function HomePage() {
  return (
    <main>
      <SignedOut>
        <div className="flex h-screen items-center justify-center">
          <h1 className="text-2xl font-semibold text-white">
            sign in to see the posts
          </h1>
        </div>
      </SignedOut>

      <SignedIn>
        <PostList />
        {/* <div className="flex h-screen flex-col items-center justify-center">
          <h1 className="text-2xl font-semibold text-white">
            create your profile with just a click
          </h1>
          <CreateProfile />
        </div> */}
      </SignedIn>
    </main>
  );
}
