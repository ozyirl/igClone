"use client";

import { useRouter } from "next/navigation";
import { useUploadThing } from "~/utils/uploadthing";
import { toast } from "sonner";
import { SquarePlus } from "lucide-react";
import { Button } from "~/components/ui/button";
type Input = Parameters<typeof useUploadThing>;

const useUploadThingInputProps = (...args: Input) => {
  const $ut = useUploadThing(...args);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    const result = await $ut.startUpload(selectedFiles);

    console.log("uploaded files", result);
  };

  return {
    inputProps: {
      onChange,
      multiple: ($ut.permittedFileInfo?.config?.image?.maxFileCount ?? 1) > 1,
      accept: "image/*",
    },
    isUploading: $ut.isUploading,
  };
};

type Props = {
  onUploadComplete: (imageId: number) => void;
};

export function SimpleUploadButton({ onUploadComplete }: Props) {
  const router = useRouter();

  const { inputProps } = useUploadThingInputProps("imageUploader", {
    onUploadBegin() {
      toast("uploading...", {
        duration: 100000,
        id: "upload-begin",
      });
    },
    onUploadError(error) {
      toast.dismiss("upload-begin");
      toast.error("Upload failed");
    },
    async onClientUploadComplete() {
      toast.dismiss("upload-begin");
      toast.success("upload complete");

      try {
        const response = await fetch("/api/latest-image");
        if (!response.ok) {
          throw new Error("Failed to fetch latest image");
        }
        const { image } = await response.json();
        onUploadComplete(image.id);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch latest image");
      }

      router.refresh();
    },
  });

  return (
    <div>
      <label htmlFor="upload-button" className="cursor-pointer text-white">
        <div className="flex h-8 w-32 items-center justify-center rounded-sm bg-white">
          <h1 className="font-medium text-zinc-600">Upload Image</h1>
        </div>
      </label>
      <input
        id="upload-button"
        type="file"
        className="sr-only"
        {...inputProps}
      />
    </div>
  );
}
