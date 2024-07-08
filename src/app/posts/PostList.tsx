import Image from "next/image";
import { HoverBorderGradient } from "~/_Components/hover-gradient";
import { getMyImages } from "../../server/queries";
import LikeButton from "~/app/posts/LikeButton";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";
import LikeCount from "./LikeCount";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";
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
              <HoverCard>
                <HoverBorderGradient
                  containerClassName="rounded-full"
                  as="button"
                  className="bg flex items-center space-x-2 px-1 text-white"
                >
                  <HoverCardTrigger>
                    <Image
                      src={image.profileImageUrl || "/ninja.png"}
                      className="rounded-full p-[0.8px]"
                      alt=""
                      height={30}
                      width={30}
                      style={{ objectFit: "cover" }}
                    />
                  </HoverCardTrigger>
                  <span className="px-1 font-thin">
                    <Link href={`/user/${image.userId}`}>
                      {image.uploadedBy || "Unknown"}
                    </Link>
                  </span>

                  <HoverCardContent>
                    <div className="flex justify-between space-x-4">
                      <Avatar>
                        <AvatarImage src={image.profileImageUrl || ""} />
                        <AvatarFallback>VC</AvatarFallback>
                      </Avatar>
                      <div className=" space-y-1">
                        <h4 className="text-sm font-semibold">
                          {image.uploadedBy}
                        </h4>
                        <div className="flex items-center">
                          {/*prettier-ignore */}
                          <p className="text-md">followers {" "} 20</p>
                          <br />
                          <p className="text-md">following 20</p>
                        </div>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverBorderGradient>
              </HoverCard>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className=" relative h-72 w-[286px]  overflow-hidden rounded-md border-white object-cover">
              <Link href={`/post/${image.id}`}>
                <Image
                  src={image.url || ""}
                  alt=""
                  layout="fill"
                  objectFit="contain"
                />
              </Link>
            </div>
          </div>

          <div className="ml-1 mt-8 flex items-center space-x-2">
            <LikeButton imageId={image.id} />
          </div>
          <div className="mb-8 ml-4 mt-1">
            <span>
              <LikeCount imageId={image.id} />
              <span className="flex flex-row ">
                {image.description ? (
                  <p className="mr-1 text-xs text-white">{image.uploadedBy}</p>
                ) : (
                  <></>
                )}

                <p className="text-xs font-thin text-white">
                  {image.description}
                </p>
              </span>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
