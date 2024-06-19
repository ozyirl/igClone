import { fetchImage } from "~/server/db";
import Image from "next/image";
const Post = async () => {
  const result = await fetchImage();
  const images = result.images;

  return (
    <div>
      {images.map((image, index) => (
        <div className="mt-16 h-72 w-72" key={index}>
          <img src={image.url || ""} alt="" />
        </div>
      ))}
    </div>
  );
};

export default Post;
