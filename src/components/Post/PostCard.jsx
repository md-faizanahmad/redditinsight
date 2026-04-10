import PostMedia from "./PostMedia";
import PostMeta from "./PostMeta";

export default function PostCard({ post }) {
  return (
    <div className="bg-black border border-white/10 rounded-xl overflow-hidden max-w-xl mx-auto">
      {/* HEADER */}
      <div className="flex items-center gap-3 p-4">
        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-sm">
          {post.author[0]}
        </div>

        <div className="text-sm">
          <p className="font-semibold">u/{post.author}</p>
          <p className="text-gray-400 text-xs">r/{post.subreddit}</p>
        </div>
      </div>

      {/* MEDIA */}
      <PostMedia image={post.image} video={post.video} />

      {/* ACTION BAR */}
      <div className="flex items-center gap-4 px-4 py-3 text-lg">
        <span>❤️ {post.upvotes}</span>
        <span>💬 {post.comments}</span>
      </div>

      {/* CONTENT */}
      <div className="px-4 pb-4">
        <p className="text-sm">
          <span className="font-semibold mr-2">u/{post.author}</span>
          {post.title}
        </p>
      </div>
    </div>
  );
}
