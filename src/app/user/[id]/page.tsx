export default function UserProfile({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  return (
    <div className="flex h-screen items-center justify-center">
      <h1 className="text-xl text-white">{photoId}</h1>
    </div>
  );
}
