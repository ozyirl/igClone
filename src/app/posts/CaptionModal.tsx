import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Plus } from "lucide-react";
import { useCaptionStore } from "~/store/captionStore";
import { SimpleUploadButton } from "./simple-upload-button";
export function DialogCloseButton() {
  const [caption, setCaption] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handlePost = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/caption", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageId: 5, caption }),
      });

      if (response.ok) {
        console.log("Caption saved successfully");
      } else {
        console.error("Failed to save caption");
      }
    } catch (error) {
      console.error("Failed to save caption:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCaptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCaption(e.target.value);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus stroke="white" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">Make a post</DialogTitle>
          <DialogDescription>png,jpg,gif</DialogDescription>
        </DialogHeader>
        {/* <div className="flex items-center justify-center">
          <SimpleUploadButton />
        </div> */}
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="description" className="sr-only text-white">
              Caption
            </Label>
            <Input
              id="description"
              className="text-white"
              value={caption}
              onChange={handleCaptionChange}
            />
          </div>
        </div>

        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant="default"
            onClick={handlePost}
            disabled={loading}
          >
            {loading ? "Posting..." : "Post"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
