import Image from "next/image";
import { HoverBorderGradient } from "~/_Components/hover-gradient";
import { getMyImages } from "../../server/queries";
import LikeButton from "~/_Components/LikeButton";

type ImageType = {
  id: number;
  profileImageUrl: string | null;
  uploadedBy: string | null;
  url: string | null;
  description: string | null;
};

const PostList = async () => {
  const posts: ImageType[] = await getMyImages();

  return (
    <div className="mt-28">
      {posts.map((image) => (
        <div
          key={image.id}
          className="mt-12 flex h-[400px] w-72 flex-col rounded-md border-[1px] border-white"
        >
          <div className="mx-2 flex flex-row rounded-md py-2">
            <div className="mx-1 mt-1 flex justify-center text-center">
              <HoverBorderGradient
                containerClassName="rounded-full"
                as="button"
                className=" flex items-center space-x-2 bg-white px-1 text-black dark:bg-black dark:text-white"
              >
                <Image
                  src={image.profileImageUrl || "/ninja.png"}
                  className="rounded-full p-[0.8px]"
                  alt=""
                  height={30}
                  width={30}
                />
                <span className="px-1 font-thin">
                  {image.uploadedBy || "Unknown"}
                </span>
              </HoverBorderGradient>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="h-48 w-48">
              <Image
                src={image.url || ""}
                alt=""
                width={480}
                height={480}
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
          <div className="ml-2 mt-16 flex items-center space-x-2 ">
            <LikeButton imageId={image.id} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
