import { useState, useEffect } from "react";
import { Post } from "../types/post";
import PostCard from "@/components/PostCard";
import { fetchPosts } from "@/lib/api";

const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const asyncWrapper = async () => {
      const fetchedPosts = await fetchPosts();
      setPosts(fetchedPosts);
    };

    asyncWrapper();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((post) => (
          <PostCard key={post.title} post={post} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
