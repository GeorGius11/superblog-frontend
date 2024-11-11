import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import { Post } from "@/types/post";
import { fetchPostById, fetchPosts } from "@/lib/api";
import Image from "next/image";
import sampleImage from "/public/sample.png";

interface PostPageProps {
  post?: Post;
}

export default function PostPage({ post }: PostPageProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Loading...</p>;
  }

  if (!post) {
    return <p>Post not found</p>;
  }

  const imageUrl = post.imageUrl
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${post.imageUrl}`
    : sampleImage;

  return (
    <div className="container mx-auto px-4 lg:px-0 py-8">
      <h1 className="text-2xl sm:text-4xl font-bold mb-6 text-center">
        {post.title}
      </h1>
      <div className="flex flex-col lg:flex-row lg:items-start lg:pt-8">
        <div className="flex justify-center w-full lg:w-1/4 mt-6 lg:mt-0 lg:pr-16">
          {post.imageUrl && (
            <Image
              src={imageUrl}
              alt={post.title}
              width={700}
              height={475}
              className="rounded-lg shadow-md"
            />
          )}
        </div>
        <div className="w-full pt-8 lg:w-3/4 lg:pt-0">
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content || "" }}
          />
        </div>
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { posts } = await fetchPosts(1, 12);
  const paths = posts.map((post) => ({
    params: { id: post._id },
  }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const { id } = params!;
    const post = await fetchPostById(id as string);

    if (!post) {
      return { notFound: true };
    }

    return {
      props: { post },
      revalidate: 10,
    };
  } catch (error) {
    console.error("Error fetching post:", error);
    return { notFound: true };
  }
};
