import { getImageLikes } from "~/server/queries";

type Props = {
  imageId: number;
};

const LikeCount = async ({ imageId }: Props) => {
  const totalLikes = await getImageLikes(imageId);
  return (
    <>
      <p className="mb-1 text-xs text-white">
        {totalLikes === 0 ? null : `${totalLikes} Likes`}
      </p>
    </>
  );
};

export default LikeCount;
