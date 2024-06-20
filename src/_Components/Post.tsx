import Image from "next/image";
import { getMyImages } from "~/server/queries";
import { HoverBorderGradient } from "./hover-gradient";
const Post = async () => {
  const posts = await getMyImages();

  return (
    <>
      <div className="mt-28">
        {[...posts].map((image) => (
          <div className="mt-12 h-80 w-72 rounded-md border-2 border-white">
            <div className=" mx-2 flex flex-row rounded-md py-2">
              <div className="flex justify-center text-center">
                <HoverBorderGradient
                  containerClassName="rounded-full"
                  as="button"
                  className="flex items-center space-x-2 bg-white px-1 text-black dark:bg-black dark:text-white"
                >
                  <Image
                    src={image.profileImageUrl || "/ninja.png"}
                    className=" rounded-full  p-[1px]"
                    alt=""
                    height={30}
                    width={30}
                  ></Image>
                  <span className="px-1 font-thin">{image.uploadedBy}</span>
                </HoverBorderGradient>
              </div>
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
