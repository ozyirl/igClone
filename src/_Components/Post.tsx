import { fetchImage } from "~/server/db";
import Image from "next/image";

const Post = async () => {
  const result = await fetchImage();
  const images = result.images;

  return (
    <>
      <div className="mt-28 h-80 w-72 rounded-md border-2 border-white">
        <div className=" flex flex-row rounded-md border-b-[1px] border-white py-2">
          <Image src="/ninja.png" alt="" height={30} width={30}></Image>
          <h1 className="text-lg font-normal text-white">user id</h1>
        </div>
        <div className="flex items-center justify-center">
          {images.map((image, index) => (
            <div className=" h-48 w-48" key={index}>
              <Image
                src={image.url || ""}
                alt=""
                width={480}
                height={480}
                style={{ objectFit: "contain" }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Post;
