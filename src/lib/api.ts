import axios from "axios";
import { Post } from "@/types/post";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchPosts = async (
  page = 1,
  limit = 10
): Promise<{ posts: Post[]; pageCount: number; total: number }> => {
  const response = await axios.get(`${BASE_URL}/posts`, {
    params: { page, limit },
  });

  const { data, total } = response.data;
  const pageCount = Math.ceil(total / limit);

  return { posts: data, pageCount, total };
};

export const fetchPostById = async (id: string): Promise<Post> => {
  const response = await axios.get(`${BASE_URL}/posts/${id}`);
  return response.data;
};
