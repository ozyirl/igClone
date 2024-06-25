import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { SimpleUploadButton } from "~/app/posts/simple-upload-button";
import { Plus } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";

export function NewPostDialog() {
  const [isUploaded, setIsUploaded] = useState(false);
  const [imageId, setImageId] = useState<number | null>(null);
  const [caption, setCaption] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleUploadComplete = (imageId: number) => {
    setImageId(imageId);
    setIsUploaded(true);
  };

  const handlePost = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/caption", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageId, caption }),
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
    <>
      {isUploaded ? (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Plus stroke="white" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-white">Make a post</DialogTitle>
              <DialogDescription>png, jpg, gif</DialogDescription>
            </DialogHeader>
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
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Plus stroke="white" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-white">Make a post</DialogTitle>
              <DialogDescription>png, jpg, gif</DialogDescription>
            </DialogHeader>
            <div className="flex items-center justify-center">
              <SimpleUploadButton onUploadComplete={handleUploadComplete} />
            </div>
            <div className="flex items-start justify-between">
              <DialogClose className="flex justify-end">
                <Button variant="outline" className="text-white">
                  Close
                </Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
