import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import { Post } from "@/types/post";

interface PostPageProps {
  post?: Post;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts`);
  const fetchedPosts = await data.json();
  const posts: Post[] = fetchedPosts;

  const paths = posts.map((post) => ({
    params: { id: post._id },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const { id } = params!;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${id}`
    );
    const post = await res.json();

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
