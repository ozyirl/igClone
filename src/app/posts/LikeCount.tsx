import { useEffect, useState } from "react";

type Props = {
  imageId: number;
};

const LikeCount = ({ imageId }: Props) => {
  const [likes, setLikes] = useState<number | null>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTotalLikes = async () => {
      try {
        const response = await fetch(`/api/getLikeCount?imageId=${imageId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch likes");
        }
        const data = await response.json();
        setLikes(data.postLikes);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalLikes();
  }, [imageId]);

  if (loading) {
    return <p className="mb-1 text-xs text-white">Loading...</p>;
  }

  return (
    <p className="mb-1 text-xs text-white">
      {likes === 0 ? null : `${likes} Likes`}
    </p>
  );
};

export default LikeCount;
