import Link from "next/link";
import Post from "~/_Components/Post";

import { user } from "~/server/db";
const mockUrls = [
  "https://utfs.io/f/3d688acd-6231-4177-b7cd-b900e97a7618-wkfcr5.webp",
  "https://utfs.io/f/3d688acd-6231-4177-b7cd-b900e97a7618-wkfcr5.webp",
];

const mockPosts = mockUrls.map((url, index) => ({
  id: index + 1,
  url,
}));

export default async function HomePage() {
  const users = await user;

  console.log(users);

  return (
    <main>
      {users.map((user) => (
        <div
          key={user.id}
          className="flex h-screen items-center justify-center text-xl text-white"
        >
          {user.fullName}
        </div>
      ))}
      {/* <Post /> */}
    </main>
  );
}
