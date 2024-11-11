import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { fetchPosts } from "../lib/api";
import PostCard from "../components/PostCard";
import { Post } from "@/types/post";

interface HomePageProps {
  posts: Post[];
  pageCount: number;
  currentPage: number;
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const page = query.page ? parseInt(query.page as string) : 1;
  const limit = 12;
  const { posts, pageCount } = await fetchPosts(page, limit);

  return {
    props: { posts, pageCount, currentPage: page },
  };
};

export default function HomePage({
  posts,
  pageCount,
  currentPage,
}: HomePageProps) {
  const router = useRouter();

  const handlePageChange = (newPage: number) => {
    router.push(`/?page=${newPage}`);
  };

  return (
    <div className="container mx-auto p-5 mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
      {pageCount > 1 && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="px-4 py-2 mx-1 bg-gray-300 rounded"
          >
            Previous
          </button>
          {[...Array(pageCount)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 mx-1 rounded ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= pageCount}
            className="px-4 py-2 mx-1 bg-gray-300 rounded"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
