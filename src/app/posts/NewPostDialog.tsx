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
import { useRouter } from "next/navigation";
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
  const router = useRouter();
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
        setIsUploaded(false);
      } else {
        console.error("Failed to save caption");
      }
    } catch (error) {
      console.error("Failed to save caption:", error);
    } finally {
      router.refresh();
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
            <Button variant="outline" className="text-black dark:text-white">
              new post
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-black dark:text-white">
                Write a caption
              </DialogTitle>
              <DialogDescription>
                or dont lol totally upto you
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label
                  htmlFor="description"
                  className="sr-only text-black dark:text-white"
                >
                  Caption
                </Label>
                <Input
                  id="description"
                  className="text-black dark:text-white"
                  value={caption}
                  onChange={handleCaptionChange}
                  placeholder="caption"
                />
              </div>
            </div>
            <DialogFooter className="px-1 sm:justify-end ">
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
            <Button variant="outline" className="text-black dark:text-white">
              new post
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-black dark:text-white">
                Make a post
              </DialogTitle>
              <DialogDescription>png, jpg, gif</DialogDescription>
            </DialogHeader>
            <div className="flex items-center justify-center">
              <SimpleUploadButton onUploadComplete={handleUploadComplete} />
            </div>
            <div className="flex items-start justify-between">
              <DialogClose className="flex justify-end">
                <Button
                  variant="secondary"
                  className=" text-black dark:text-white"
                >
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
