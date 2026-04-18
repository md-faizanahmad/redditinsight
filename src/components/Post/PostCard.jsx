import { useState } from "react";
import { formatTime } from "../../utils/formatTime";
import PostMedia from "./PostMedia";
import {
  MessageSquare,
  Share,
  MoreHorizontal,
  User,
  Clock,
  ArrowBigUp,
  ArrowBigDown,
} from "lucide-react";
import Comments from "./Comments";

export default function PostCard({ post }) {
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="group relative w-full max-w-3xl mx-auto bg-zinc-950/40 backdrop-blur-md border border-zinc-800/50 hover:border-zinc-500/30 transition-all duration-500 rounded-2xl mb-8 overflow-hidden">
      {/* 1. HEADER (Adaptive Layout) */}
      <div className="flex items-center justify-between px-4 md:px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20 uppercase">
              {post.subreddit[0]}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-zinc-950" />
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-zinc-100 truncate">
              r/{post.subreddit}
            </h3>
            <div className="flex items-center gap-2 text-[10px] md:text-[11px] text-zinc-500 uppercase tracking-tight">
              <span className="truncate flex items-center gap-1">
                <User size={10} /> {post.author}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 whitespace-nowrap">
                <Clock size={10} /> {formatTime(post.createdAt)}
              </span>
            </div>
          </div>
        </div>
        <button className="p-2 text-zinc-600 hover:text-white transition-colors hover:bg-zinc-900 rounded-lg">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* 2. CONTENT TITLE */}
      <div className="px-4 md:px-6 pb-4">
        <h2 className="text-lg md:text-xl font-semibold text-zinc-100 leading-snug group-hover:text-indigo-300 transition-colors duration-300">
          {post.title}
        </h2>
      </div>

      {/* 3. MEDIA (Mobile-First Spacing) */}
      <div className="mx-0 md:mx-4 md:rounded-xl overflow-hidden border-y md:border border-zinc-800/50 shadow-2xl bg-black/20">
        <PostMedia image={post.image} video={post.video} />
      </div>

      {/* 4. UNIFIED INTERACTION HUB (The UX Win) */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 md:px-6 py-4 md:py-6">
        <div className="flex items-center gap-2">
          {/* Unified Vote Capsule: Works perfectly on Mobile & Desktop */}
          <div className="flex items-center bg-zinc-900/60 border border-zinc-800 rounded-full p-1 group/votes">
            <button className="p-1.5 md:p-2 text-zinc-500 hover:text-orange-500 hover:bg-orange-500/10 rounded-full transition-all">
              <ArrowBigUp size={22} strokeWidth={2.5} />
            </button>
            <span className="px-2 text-xs md:text-sm font-black text-zinc-200 min-w-[3ch] text-center">
              {post.upvotes >= 1000
                ? `${(post.upvotes / 1000).toFixed(1)}k`
                : post.upvotes}
            </span>
            <button className="p-1.5 md:p-2 text-zinc-500 hover:text-indigo-500 hover:bg-indigo-500/10 rounded-full transition-all">
              <ArrowBigDown size={22} strokeWidth={2.5} />
            </button>
          </div>

          {/* Discussion Button */}
          <button
            onClick={() => setShowComments(!showComments)}
            className={`flex items-center gap-2 px-4 md:px-5 py-2.5 rounded-full text-xs md:text-sm font-medium transition-all ${
              showComments
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                : "bg-zinc-900/60 text-zinc-400 border border-zinc-800 hover:border-zinc-500 hover:text-zinc-100"
            }`}
          >
            <MessageSquare size={18} />
            <span className="hidden xs:inline">Discussion</span>
          </button>
        </div>

        {/* Share Action */}
        <button className="p-2.5 md:p-3 bg-zinc-900/60 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-500 rounded-full transition-all active:scale-90">
          <Share size={18} />
        </button>
      </div>

      {/* 5. COMMENT DRAWER */}
      {showComments && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-300 border-t border-zinc-900 bg-zinc-950/60 px-4 md:px-6 py-4">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">
              Community Insights
            </span>
          </div>
          <Comments postId={post.id} visible={showComments} />
        </div>
      )}
    </div>
  );
}
