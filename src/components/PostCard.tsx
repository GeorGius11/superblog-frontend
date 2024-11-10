import { Post } from "@/types/post";
import Link from "next/link";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <div className="bg-gray rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-80">
      <Link href={`/posts/${post._id}`}>
        <img
          src="sample.png"
          alt={post.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="mt-2 text-gray-800">{post.description}</p>
        </div>
      </Link>
    </div>
  );
};

export default PostCard;
