"use client";

import { Button } from "~/components/ui/button";
import { useState } from "react";

const UnfollowButton = () => {
  const [variant, setVariant] = useState<"default" | "outline">("outline");
  const [buttonText, setButtonText] = useState<string>("Following");

  const handleClick = () => {
    setVariant("default");
    setButtonText("Follow");
  };

  return (
    <div>
      <Button
        onClick={handleClick}
        variant={variant}
        type="submit"
        className="w-[220px]"
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default UnfollowButton;
