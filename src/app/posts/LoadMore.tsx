"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Spinner } from "~/components/ui/spinner";
import { getMyImages } from "~/server/queries";

import PostList from "./PostList";

type ImageType = {
  id: number;
  profileImageUrl: string | null;
  uploadedBy: string | null;
  url: string | null;
  description: string | null;
  userId: string | null;
};

export function LoadMore() {
  const [images, setImages] = useState<ImageType[]>([]);
  const [page, setPage] = useState(1);

  const { ref, inView } = useInView();

  const loadMoreImages = async () => {
    const nextPage = (page % 2) + 1;
    const newProducts = (await getMyImages(nextPage)) ?? [];
    setImages((prevProducts: ImageType[]) => [...prevProducts, ...newProducts]);
    setPage(nextPage);
  };

  useEffect(() => {
    if (inView) {
      loadMoreImages();
    }
  }, [inView]);

  return (
    <>
      <PostList image={images} />
      <div
        className="col-span-1 flex items-center justify-center p-4 sm:col-span-2 md:col-span-3"
        ref={ref}
      >
        <Spinner />
      </div>
    </>
  );
}
