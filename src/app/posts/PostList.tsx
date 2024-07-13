"use client";
import Image from "next/image";
import { HoverBorderGradient } from "~/_Components/hover-gradient";
import LikeButton from "~/app/posts/LikeButton";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";
import { useEffect, useState, useRef, useCallback } from "react";
import LikeCount from "./LikeCount";

import { Spinner } from "~/components/ui/spinner";

type ImageType = {
  id: number;
  profileImageUrl: string | null;
  uploadedBy: string | null;
  url: string | null;
  description: string | null;
  userId: string | null;
};

export interface PostListProps {
  initialImages?: ImageType[] | null;
}

const POSTS_PER_PAGE = 4;

const PostList = ({ initialImages }: PostListProps) => {
  const [images, setImages] = useState<ImageType[]>(initialImages || []);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const lastImageElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0]?.isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore],
  );

  const loadMorePosts = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `/api/getPosts?page=${page}&limit=${POSTS_PER_PAGE}`,
      );
      if (!response.ok) throw new Error("Failed to fetch posts");
      const data = await response.json();

      if (!data.posts || !Array.isArray(data.posts)) {
        throw new Error("Invalid response format");
      }

      setImages((prevImages) => {
        const newImages = data.posts.filter(
          (post: any) =>
            !prevImages.some((prevPost) => prevPost.id === post.id),
        );
        return [...prevImages, ...newImages];
      });

      setHasMore(images.length + data.posts.length < data.totalCount);
    } catch (err) {
      console.error("Failed to fetch more posts", err);
      setError("Failed to load more posts. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [page, hasMore, images.length]);

  useEffect(() => {
    if (!initialImages) {
      loadMorePosts();
    }
  }, [initialImages, loadMorePosts]);

  useEffect(() => {
    if (page > 1) {
      loadMorePosts();
    }
  }, [page, loadMorePosts]);

  return (
    <div className="mt-28">
      {images.map((image, index) => (
        <div
          key={image.id}
          ref={index === images.length - 1 ? lastImageElementRef : null}
          className="mb-6 mt-12 flex h-auto max-w-72 flex-col rounded-md border-[1px] border-white"
        >
          <div className="mx-2 flex flex-row rounded-md py-2">
            <div className="mx-1 mt-1 flex justify-center text-center">
              <HoverCard>
                <HoverBorderGradient
                  containerClassName="rounded-full"
                  as="button"
                  className="bg flex items-center space-x-2 px-1 text-white"
                >
                  <HoverCardTrigger>
                    <Image
                      src={image.profileImageUrl || "/ninja.png"}
                      className="rounded-full p-[0.8px]"
                      alt=""
                      height={30}
                      width={30}
                      style={{ objectFit: "cover" }}
                    />
                  </HoverCardTrigger>
                  <span className="px-1 font-thin">
                    <Link href={`/user/${image.userId}`}>
                      {image.uploadedBy || "Unknown"}
                    </Link>
                  </span>

                  <HoverCardContent>
                    <div className="flex justify-between space-x-4">
                      <Avatar>
                        <AvatarImage src={image.profileImageUrl || ""} />
                        <AvatarFallback>VC</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">
                          {image.uploadedBy}
                        </h4>
                        <div className="flex items-center">
                          <p className="text-md">followers 20</p>
                          <br />
                          <p className="text-md">following 20</p>
                        </div>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverBorderGradient>
              </HoverCard>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="relative h-72 w-[286px] overflow-hidden rounded-md border-white object-cover">
              <Link href={`/post/${image.id}`}>
                <Image
                  src={image.url || ""}
                  alt=""
                  layout="fill"
                  objectFit="contain"
                />
              </Link>
            </div>
          </div>

          <div className="ml-1 mt-8 flex items-center space-x-2">
            <LikeButton imageId={image.id} />
          </div>
          <div className="mb-8 ml-4 mt-1">
            <span>
              <LikeCount imageId={image.id} />
              <span className="flex flex-row ">
                {image.description ? (
                  <p className="mr-1 text-xs text-white">{image.uploadedBy}</p>
                ) : null}
                <p className="text-xs font-thin text-white">
                  {image.description}
                </p>
              </span>
            </span>
          </div>
        </div>
      ))}
      {loading && (
        <div className="flex items-center justify-center py-4">
          <Spinner />
        </div>
      )}
      {error && <p className="py-4 text-center text-red-500">{error}</p>}
      {!hasMore && !loading && !error && (
        <p className="py-4 text-center">No more posts to load</p>
      )}
    </div>
  );
};

export default PostList;
