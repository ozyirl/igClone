import Image from "next/image";
import { HoverBorderGradient } from "~/_Components/hover-gradient";
import { getMyImages } from "../../server/queries";
import LikeButton from "~/app/posts/LikeButton";
import { useCaptionStore } from "~/store/captionStore";

type ImageType = {
  id: number;
  profileImageUrl: string | null;
  uploadedBy: string | null;
  url: string | null;
  description: string | null;
  userId: string | null;
};

const PostList = async () => {
  const posts: ImageType[] = await getMyImages();

  return (
    <div className="mt-28">
      {posts.map((image) => (
        <div
          key={image.id}
          className="mb-6 mt-12 flex h-auto max-w-72 flex-col rounded-md border-[1px] border-white"
        >
          <div className="mx-2 flex flex-row rounded-md py-2">
            <div className="mx-1 mt-1 flex justify-center text-center">
              <HoverBorderGradient
                containerClassName="rounded-full"
                as="button"
                className="bg flex items-center space-x-2 px-1 text-white"
              >
                <Image
                  src={image.profileImageUrl || "/ninja.png"}
                  className="rounded-full p-[0.8px]"
                  alt=""
                  height={30}
                  width={30}
                  style={{ objectFit: "cover" }}
                />
                <span className="px-1 font-thin">
                  {image.uploadedBy || "Unknown"}
                </span>
              </HoverBorderGradient>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className=" relative h-72 w-[286px]  overflow-hidden rounded-md border-white object-cover">
              <Image
                src={image.url || ""}
                alt=""
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
          <div className="ml-2 mt-8 flex items-center space-x-2">
            <LikeButton imageId={image.id} />
          </div>
          <div className="mb-8 ml-4 mt-2">
            <p className="text-xs font-thin text-white">{image.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
