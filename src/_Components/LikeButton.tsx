"use client";
import { Heart, MessageCircle } from "lucide-react";
import { useState } from "react";
import { imageLiked } from "~/server/queries";

interface LikeButtonProps {
  userId: string | null;
  imageId: number;
}
const LikeButton = ({
  imageId,
  userId,
}: {
  imageId: number;
  userId: string | null;
}) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = async () => {
    setIsLiked(!isLiked);

    if (userId === null) {
      console.error("User ID is null, cannot update like status");
      return;
    }

    try {
      await imageLiked(userId, imageId, !isLiked);
    } catch (error) {
      console.error("Failed to update like status", error);
      setIsLiked(isLiked);
    }
  };
  return (
    <div className="px-1">
      <button className="px-1" onClick={handleLike}>
        <Heart fill={isLiked ? "red" : "none"} />
      </button>
      <button className="px-1">
        <MessageCircle />
      </button>
    </div>
  );
};

export default LikeButton;
