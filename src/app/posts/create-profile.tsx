"use client";

import { Button } from "~/components/ui/button";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

const CreateProfile = () => {
  const { userId } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profileExists, setProfileExists] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkUserProfile = async () => {
      const response = await fetch("/api/checkUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      const data = await response.json();
      setProfileExists(data.exists);
    };

    if (userId) {
      checkUserProfile();
    }
  }, [userId]);

  const handleProfileCreate = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error("Failed to create profile");
      }

      const result = await response.json();
      console.log("API response:", result);
      setProfileExists(true);
    } catch (error) {
      console.error("Failed to create profile", error);
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  if (profileExists === null) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {profileExists ? (
        <p>Your profile already exists.</p>
      ) : (
        <Button
          onClick={handleProfileCreate}
          className="mt-4"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Profile"}
        </Button>
      )}
    </div>
  );
};

export default CreateProfile;
