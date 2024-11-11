import { Post } from "@/types/post";
import Link from "next/link";
import Image from "next/image";
import sampleImage from "/public/sample.png";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const imageUrl = post.imageUrl
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${post.imageUrl}`
    : sampleImage;

  return (
    <div className="bg-gray rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 w-100 h-88">
      <Link href={`/posts/${post._id}`}>
        <div className="relative w-full h-48">
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            className="object-cover w-full h-full rounded-t-lg"
          />
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold line-clamp-1">{post.title}</h2>
          <p className="mt-2 text-gray-800 line-clamp-2">{post.description}</p>
        </div>
      </Link>
    </div>
  );
};

export default PostCard;
