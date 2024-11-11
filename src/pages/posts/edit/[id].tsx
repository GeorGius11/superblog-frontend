import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { Post } from "@/types/post";
import { fetchPostById, updatePost } from "@/lib/api";
import { useState } from "react";

interface EditPostPageProps {
  post: Post;
}

export default function EditPostPage({ post }: EditPostPageProps) {
  const router = useRouter();
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description || "");
  const [content, setContent] = useState(post.content || "");
  const [imageUrl, setImageUrl] = useState(post.imageUrl || "");
  const [loading, setLoading] = useState(false);

  const handleUpdatePost = async () => {
    setLoading(true);
    try {
      await updatePost(post._id, { title, description, content, imageUrl });
      router.push("/posts/manage");
    } catch (error) {
      console.error("Error updating post:", error);
      alert("An error occurred while updating the post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-5 min-h-screen">
      <h1 className="text-3xl font-bold mb-5">Edit Post</h1>
      <div className="mb-5">
        <label className="block mb-2">Title</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <label className="block mb-2">Description</label>
        <textarea
          className="w-full p-2 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div className="mb-5">
        <label className="block mb-2">Image URL</label>
        <textarea
          className="w-full p-2 border rounded"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        ></textarea>
      </div>
      <div className="mb-5">
        <label className="block mb-2">Content</label>
        <textarea
          className="w-full p-2 border rounded"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      <button
        onClick={handleUpdatePost}
        className="px-4 py-2 bg-blue-500 text-white rounded"
        disabled={loading}
      >
        {loading ? "Updating..." : "Update Post"}
      </button>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const { id } = params!;
    const post = await fetchPostById(id as string);

    if (!post) {
      return { notFound: true };
    }

    return {
      props: { post },
    };
  } catch (error) {
    console.error("Error fetching post:", error);
    return { notFound: true };
  }
};
