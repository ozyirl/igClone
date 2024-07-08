import Image from "next/image";

export default function UserProfile({
  params: { id: uploadedby },
}: {
  params: { id: string };
}) {
  return (
    <div className="mt-48 flex items-center justify-center">
      {/* <Image src=""></Image> */}
      <h1 className="text-xl text-white">{uploadedby}</h1>
    </div>
  );
}
