import Link from "next/link";
import Post from "~/_Components/Post";
import { SignedOut, SignedIn } from "@clerk/nextjs";

const mockUrls = [
  "https://utfs.io/f/3d688acd-6231-4177-b7cd-b900e97a7618-wkfcr5.webp",
  "https://utfs.io/f/3d688acd-6231-4177-b7cd-b900e97a7618-wkfcr5.webp",
];

const mockPosts = mockUrls.map((url, index) => ({
  id: index + 1,
  url,
}));

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
        <Post />
      </SignedIn>
    </main>
  );
}
