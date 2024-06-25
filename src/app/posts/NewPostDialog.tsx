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
import { SimpleUploadButton } from "~/_Components/simple-upload-button";
import { Plus } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";

export function NewPostDialog() {
  const [isUploaded, setIsUploaded] = useState(false);

  const handleUploadComplete = () => {
    setIsUploaded(true);
  };

  return (
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
        {isUploaded && (
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        )}
        <div className="flex items-start justify-start">
          <DialogClose>
            <Button variant="outline" className="text-white">
              Close
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
