import { fetchImage } from "~/server/db";

const Post = async () => {
  const result = await fetchImage(); // Assuming fetchImage() returns an object with an 'images' array
  const images = result.images; // Access the 'images' array from the result

  return (
    <div>
      {images.map((image, index) => (
        <div key={index}>
          <img src={image.url || ""} alt="" />
        </div>
      ))}
    </div>
  );
};

export default Post;
