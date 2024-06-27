"use client";

import { Button } from "~/components/ui/button";
import { useState } from "react";
import { auth } from "@clerk/nextjs/server";
const CreateProfile = () => {
  const [loading, setLoading] = useState(false);
  const handleProfileCreate = async () => {
    setLoading(true);
    const user = auth();
    const userId = user.userId;
    try {
      const response = await fetch("/api/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      if (!response.ok) {
        throw new Error("Failed to update like status");
      }

      const result = await response.json();
      console.log("API response:", result);
    } catch (error) {
      console.error("failed to post a comment", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button onClick={handleProfileCreate} className="mt-4">
        Create Profile
      </Button>
    </div>
  );
};

export default CreateProfile;
