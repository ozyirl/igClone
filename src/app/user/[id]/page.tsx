import Image from "next/image";
import { getUserDetails, getUserImages, getImageCount } from "~/server/queries";
import { Separator } from "~/components/ui/separator";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { getFollowStatus, followUser } from "~/server/queries";
import FollowButton from "~/_Components/follow-button";
import UnfollowButton from "~/_Components/unfollow-button";
import { unfollowUser } from "~/server/queries";
import { getFollowerCount } from "~/server/queries";

export default async function UserProfile({
  params: { id: profileId },
}: {
  params: { id: string };
}) {
  if (!profileId) {
    throw new Error("Page not found");
  }

  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }
  const user = await getUserDetails(profileId);
  const userImages = await getUserImages(profileId);
  const totalPosts = await getImageCount(profileId);
  const followCount = await getFollowerCount(profileId);

  const status = await getFollowStatus(userId, profileId);

  const handleFollow = async () => {
    "use server";
    if (!userId) {
      throw new Error("Unauthorized");
    }

    if (!profileId) {
      throw new Error("Profile doesn't exist");
    }

    await followUser(userId, profileId);
  };

  const handleUnfollow = async () => {
    "use server";

    if (!userId) {
      throw new Error("Unauthorized");
    }

    if (!profileId) {
      throw new Error("Profile doesn't exist");
    }

    await unfollowUser(userId, profileId);
  };

  return (
    <>
      <div className="flex flex-col px-2">
        <div className="mt-48 flex items-center justify-center gap-4">
          <div className="px-4">
            <Image
              className="rounded-full"
              src={user?.profileImageUrl || ""}
              height={100}
              width={100}
              alt=""
            />
          </div>

          <div className="mb-12 ">
            <div className="gap-4 py-4">
              <h1 className="text-md text-center text-white">
                {user?.fullName}
              </h1>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex h-5 flex-row items-center justify-between space-x-4 text-sm">
                <div>posts</div>
                <Separator orientation="vertical" />
                <div>followers</div>
                <Separator orientation="vertical" />
                <div>following</div>
              </div>
              <div className="flex h-5 flex-row items-center justify-around space-x-4 text-sm">
                <div> {totalPosts}</div>
                <div>{followCount}</div>
                <div>WIP</div>
              </div>
            </div>
          </div>
        </div>
        <div className="pr -mt-6 flex items-center justify-end">
          {userId !== profileId ? (
            <div>
              {status ? (
                <form action={handleUnfollow}>
                  <UnfollowButton />
                </form>
              ) : (
                <form action={handleFollow}>
                  <FollowButton />
                </form>
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
        <Separator className="my-4" />

        <div className="flex flex-wrap gap-2">
          {userImages.map((image, index) => (
            <div
              key={index}
              className="relative mb-2 flex h-32 w-1/3 items-start justify-center rounded-md border-[1px] border-white/25 px-1"
              style={{ maxWidth: "33%" }}
            >
              <Link href={`/post/${image.id}`}>
                <Image
                  className="rounded-md"
                  src={image.url || ""}
                  alt=""
                  layout="fill"
                  objectFit="cover"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
