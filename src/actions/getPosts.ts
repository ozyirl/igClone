"use server";

import { getMyImages } from "~/server/queries";

export async function getPosts(page: number, limit: number) {
  try {
    const { images, totalCount } = await getMyImages(page, limit);
    return {
      posts: images,
      totalCount,
      error: null,
    };
  } catch (error) {
    console.error("Failed to fetch images", error);
    return { posts: [], totalCount: 0, error: "Failed to fetch images" };
  }
}
