import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchPosts, deletePosts } from "../../lib/api";
import { Post } from "@/types/post";

export default function ManagePostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPostIds, setSelectedPostIds] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const asyncWrapper = async () => {
      setLoading(true);

      const { posts } = await fetchPosts(1, 1000);
      setPosts(posts);

      setLoading(false);
    };

    asyncWrapper();
  }, []);

  const handleSelectPost = (id: string) => {
    setSelectedPostIds((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((postId) => postId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const handleDeletePosts = async () => {
    if (selectedPostIds.length === 0) {
      alert("Please select at least one post to delete.");
      return;
    }

    const confirmDelete = confirm(
      `Are you sure you want to delete ${selectedPostIds.length} post(s)?`
    );

    if (!confirmDelete) return;

    try {
      await deletePosts(selectedPostIds);

      setPosts((prevPosts) =>
        prevPosts.filter((post) => !selectedPostIds.includes(post._id))
      );

      setSelectedPostIds([]);
    } catch (error) {
      console.error("Error deleting posts:", error);
      alert("An error occurred while deleting posts.");
    }
  };

  const handleDeletePost = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    try {
      await deletePosts([id]);

      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));

      setSelectedPostIds((prevSelected) =>
        prevSelected.filter((postId) => postId !== id)
      );
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("An error occurred while deleting the post.");
    }
  };

  const handleEditPost = (id: string) => {
    router.push(`/posts/edit/${id}`);
  };

  return (
    <div className="container mx-auto p-5 min-h-screen">
      <h1 className="text-3xl font-bold mb-5">Manage Posts</h1>
      {loading ? (
        <p>Loading posts...</p>
      ) : (
        <>
          <div className="mb-5">
            <button
              onClick={handleDeletePosts}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Delete Selected
            </button>
          </div>
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="border p-2">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedPostIds(posts.map((post) => post._id));
                      } else {
                        setSelectedPostIds([]);
                      }
                    }}
                    checked={selectedPostIds.length === posts.length}
                  />
                </th>
                <th className="border p-2">Title</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post._id}>
                  <td className="border p-2 text-center">
                    <input
                      type="checkbox"
                      onChange={() => handleSelectPost(post._id)}
                      checked={selectedPostIds.includes(post._id)}
                    />
                  </td>
                  <td className="border p-2">{post.title}</td>
                  <td className="flex justify-center border p-2">
                    <button
                      onClick={() => handleEditPost(post._id)}
                      className="px-2 py-1 bg-blue-500 text-white rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeletePost(post._id)}
                      className="px-2 py-1 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
