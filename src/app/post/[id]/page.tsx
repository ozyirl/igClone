import { getImageDetails } from "~/server/queries";
import Image from "next/image";
import LikeCount from "~/app/posts/LikeCount";
import LikeButton from "~/app/posts/LikeButton";
export default async function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const imageDetails = await getImageDetails(Number(photoId));

  const imageUrl = imageDetails?.url;

  return (
    <div className="flex h-screen flex-col justify-center ">
      <div className=" flex items-center justify-start p-2 text-white">
        <Image
          src={imageDetails?.profileImageUrl || ""}
          height={40}
          width={40}
          alt=""
          className="rounded-full"
        ></Image>
        <div>
          <h2 className="text-md px-2 text-center text-white">
            {imageDetails?.fullname}
          </h2>
        </div>
      </div>
      <div className="relative h-[420px] w-[400px] rounded-md border-2 border-gray-400/10">
        <Image
          src={imageUrl || ""}
          alt=""
          layout="fill"
          objectFit="cover"
          className="rounded-md"
        />
      </div>
      <div className="ml-1 mt-1 flex flex-col items-start justify-start px-1">
        <LikeCount imageId={Number(photoId)} />

        <div className="-ml-3">
          <LikeButton imageId={Number(photoId)} />
        </div>

        <span className="flex flex-row ">
          {imageDetails?.description ? (
            <p className="mr-1 text-xs text-white">{imageDetails.fullname}</p>
          ) : null}
          <p className="text-xs font-thin text-white">
            {imageDetails?.description}
          </p>
        </span>
      </div>
    </div>
  );
}
