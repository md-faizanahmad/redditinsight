import PostMedia from "./PostMedia";
import { Heart, MessageCircle, Send, Bookmark } from "lucide-react"; // Optional: Use icons for real IG feel

export default function PostCard({ post }) {
  return (
    <div className="bg-black w-full border-b border-white/10 md:border md:rounded-sm mb-4">
      {/* HEADER: Subreddit and Author */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-purple-600 p-[1.5px]">
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-[10px] border-2 border-black">
              {post.author[0].toUpperCase()}
            </div>
          </div>
          <div className="flex flex-col leading-tight">
            <p className="text-sm font-semibold hover:text-gray-400 cursor-pointer">
              r/{post.subreddit}
            </p>
            <p className="text-xs text-gray-400">u/{post.author}</p>
          </div>
        </div>
        <button className="text-white font-bold px-2">•••</button>
      </div>

      {/* MEDIA: Square or fixed ratio is key for IG */}
      <div className="w-full bg-neutral-900 flex items-center">
        <PostMedia image={post.image} video={post.video} />
      </div>

      {/* ACTION BAR: Use icons instead of text emoji if possible */}
      <div className="flex items-center justify-between px-3 pt-3 pb-2">
        <div className="flex items-center gap-4">
          <button className="hover:opacity-60 transition text-2xl">❤️</button>
          <button className="hover:opacity-60 transition text-2xl">💬</button>
          <button className="hover:opacity-60 transition text-2xl">✈️</button>
        </div>
        <button className="text-2xl">🔖</button>
      </div>

      {/* LIKES & CONTENT */}
      <div className="px-3 pb-4 space-y-1">
        <p className="text-sm font-semibold">
          {post.upvotes.toLocaleString()} likes
        </p>
        <p className="text-sm leading-snug">
          <span className="font-semibold mr-2">r/{post.subreddit}</span>
          {post.title}
        </p>
        <p className="text-xs text-gray-500 uppercase tracking-tighter pt-1">
          View all {post.comments} comments
        </p>
      </div>
    </div>
  );
}
