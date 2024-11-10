import axios from "axios";
import { Post } from "@/types/post";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await axios.get(`${BASE_URL}/posts`);
  return response.data;
};

export const fetchPostById = async (id: string): Promise<Post> => {
  const response = await axios.get(`${BASE_URL}/posts/${id}`);
  return response.data;
};
