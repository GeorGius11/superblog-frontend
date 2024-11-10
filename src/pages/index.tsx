import { useState, useEffect } from "react";
import { Post } from "../types/post";

const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const asyncWrapper = async () => {
      const data = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts`);
      const fetchedPosts = await data.json();
      setPosts(fetchedPosts);
    };

    asyncWrapper();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.title}>{post.title}</div>
      ))}
    </div>
  );
};

export default HomePage;
