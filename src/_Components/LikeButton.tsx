"use client";
import { Heart, MessageCircle } from "lucide-react";
import { useState } from "react";

interface LikeButtonProps {
  userId: string | null;
  imageId: number;
}

const LikeButton = ({ imageId, userId }: LikeButtonProps) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = async () => {
    console.log("Like button clicked");
    setIsLiked(!isLiked);

    if (userId === null) {
      console.error("User ID is null, cannot update like status");
      return;
    }

    try {
      console.log(
        `Sending request to API: userId=${userId}, imageId=${imageId}, like=${!isLiked}`,
      );
      const response = await fetch("app/api/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, imageId, like: !isLiked }),
      });

      if (!response.ok) {
        throw new Error("Failed to update like status");
      }

      const result = await response.json();
      console.log("API response:", result);
    } catch (error) {
      console.error("Failed to update like status", error);
      setIsLiked(isLiked); // Revert like state on failure
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
