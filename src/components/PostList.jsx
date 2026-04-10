export default function PostList({ posts, loading, error }) {
  if (loading) return <p className="text-center mt-6">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!posts.length) return <p className="text-center mt-6">No results</p>;

  return (
    <div className="mt-8 space-y-4 max-w-2xl mx-auto">
      {posts.map((post) => (
        <div key={post.id} className="border p-4 rounded">
          <h3 className="font-semibold">{post.title}</h3>
          <p className="text-sm text-gray-500">
            👍 {post.upvotes} | r/{post.subreddit}
          </p>
        </div>
      ))}
    </div>
  );
}
