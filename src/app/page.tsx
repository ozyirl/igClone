import Link from "next/link";

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
      <div className="flex flex-wrap gap-2">
        {mockPosts.map((post) => (
          <div key={post.id} className="w-48">
            <img src={post.url} />
            <h1 className="flex items-center justify-center">{post.id}</h1>
          </div>
        ))}
      </div>
    </main>
  );
}
