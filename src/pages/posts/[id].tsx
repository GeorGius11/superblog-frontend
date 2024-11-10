import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import { Post } from "@/types/post";
import { fetchPostById, fetchPosts } from "@/lib/api";

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

  return (
    <div className="container mx-auto p-5 min-h-screen">
      <h1 className="text-5xl font-bold">{post.title}</h1>
      <img
        src={"/sample.png"}
        alt={post.title}
        className="w-full object-cover mt-5 rounded-lg"
      />
      <div
        className="mt-6 prose"
        dangerouslySetInnerHTML={{ __html: post.content! }}
      />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts: Post[] = await fetchPosts();

  const paths = posts.map((post) => ({
    params: { id: post._id },
  }));

  return { paths, fallback: true };
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