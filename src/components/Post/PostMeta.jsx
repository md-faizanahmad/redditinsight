export default function PostMeta({ post }) {
  const date = new Date(post.createdAt * 1000).toLocaleDateString();

  return (
    <div className="mt-3 text-sm text-gray-400 flex flex-wrap gap-4">
      <span>👍 {post.upvotes}</span>
      <span>💬 {post.comments}</span>
      <span>r/{post.subreddit}</span>
      <span>u/{post.author}</span>
      <span>{date}</span>
    </div>
  );
}
