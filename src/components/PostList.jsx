export default function PostList({ posts, loading, error }) {
  if (loading)
    return <p className="text-center mt-10 text-gray-400">Loading...</p>;

  if (error) return <p className="text-center mt-10 text-red-400">{error}</p>;

  if (!posts.length)
    return <p className="text-center mt-10 text-gray-500">No results</p>;

  return (
    <div className="mt-16 px-4 max-w-4xl mx-auto grid gap-6">
      {posts.map((post) => (
        <a
          key={post.id}
          href={post.url}
          target="_blank"
          rel="noreferrer"
          className="block p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
        >
          <h3 className="text-lg font-semibold leading-snug">{post.title}</h3>

          <div className="mt-2 text-sm text-gray-400 flex gap-4">
            <span>👍 {post.upvotes}</span>
            <span>r/{post.subreddit}</span>
            <span>u/{post.author}</span>
          </div>
        </a>
      ))}
    </div>
  );
}
