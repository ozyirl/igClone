"use client";

import { Button } from "~/components/ui/button";
import { useState } from "react";

const FollowButton = () => {
  const [variant, setVariant] = useState<"default" | "outline">("default");
  const [buttonText, setButtonText] = useState<string>("Follow");
  const HandleClick = async () => {
    setVariant("outline");
    setButtonText("following");
  };
  return (
    <div>
      <Button
        onClick={HandleClick}
        className="w-[220px]"
        type="submit"
        variant={variant}
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default FollowButton;
