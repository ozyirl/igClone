import Link from "next/link";
import Post from "~/_Components/Post";
const mockUrls = [
  "https://utfs.io/f/3d688acd-6231-4177-b7cd-b900e97a7618-wkfcr5.webp",
  "https://utfs.io/f/3d688acd-6231-4177-b7cd-b900e97a7618-wkfcr5.webp",
];

const mockPosts = mockUrls.map((url, index) => ({
  id: index + 1,
  url,
}));

export default function HomePage() {
  return (
    <main>
      <Post />
    </main>
  );
}
