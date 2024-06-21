"use client";
import { Heart, MessageCircle } from "lucide-react";
import { useState } from "react";

type Props = {
  imageId: number;
};

const LikeButton = (props: Props) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
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
