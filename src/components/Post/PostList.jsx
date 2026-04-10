import PostCard from "./PostCard";

export default function PostList({ posts, loading, error }) {
  if (loading)
    return <p className="text-center mt-10 text-gray-400">Loading...</p>;

  if (error) return <p className="text-center mt-10 text-red-400">{error}</p>;

  if (!posts.length)
    return <p className="text-center mt-10 text-gray-500">No results</p>;

  return (
    <div className="mt-16 px-4 max-w-4xl mx-auto grid gap-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
