import Image from "next/image";
import { getMyImages } from "~/server/queries";
import { useUser } from "@clerk/nextjs";
const Post = async () => {
  const posts = await getMyImages();
  // const user = await fetchUserId()
  return (
    <>
      <div className="mt-28">
        {[...posts].map((image) => (
          <div className="mt-12 h-80 w-72 rounded-md border-2 border-white">
            <div className=" flex flex-row rounded-md border-b-[1px] border-white py-2">
              <Image src="/ninja.png" alt="" height={30} width={30}></Image>
              <h1 className="text-lg font-normal text-white">
                {/* {image.username} */}
              </h1>
            </div>
            <div className="flex items-center justify-center">
              <div className=" h-48 w-48" key={image.id}>
                <Image
                  src={image.url || ""}
                  alt=""
                  width={480}
                  height={480}
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Post;
