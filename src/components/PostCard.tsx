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
    <div className="bg-gray rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-88">
      <Link href={`/posts/${post._id}`}>
        <Image
          src={imageUrl}
          alt={post.title}
          width={360}
          height={48}
          className="w-full object-cover"
        />
        <div className="p-4">
          <h2 className="text-xl font-semibold line-clamp-1">{post.title}</h2>
          <p className="mt-2 text-gray-800 line-clamp-2">{post.description}</p>
        </div>
      </Link>
    </div>
  );
};

export default PostCard;
