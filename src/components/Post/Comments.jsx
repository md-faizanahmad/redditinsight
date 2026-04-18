import { useEffect, useRef, useState } from "react";
import CommentItem from "./CommentItem";
import { MessageSquareText } from "lucide-react";
import { CommentSkeleton } from "../skeleton/CommentSkeleton";

export default function Comments({ postId, visible }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const cacheRef = useRef({});

  const fetchComments = async () => {
    if (cacheRef.current[postId]) {
      setComments(cacheRef.current[postId]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/comments?id=${postId}`);
      if (!res.ok) throw new Error("Failed to fetch comments");
      const data = await res.json();

      if (!Array.isArray(data)) throw new Error("Invalid response");

      cacheRef.current[postId] = data;
      setComments(data);
    } catch (err) {
      console.error("Comments error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (visible) fetchComments();
  }, [visible, postId]);

  if (!visible) return null;

  return (
    <div className="w-full animate-in fade-in slide-in-from-top-2 duration-500">
      {/* 1. LOADING STATE (UX Upgrade) */}
      {loading && (
        <div className="space-y-4">
          <CommentSkeleton />
        </div>
      )}

      {/* 2. EMPTY STATE */}
      {!loading && comments.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-zinc-600">
          <MessageSquareText
            size={32}
            strokeWidth={1.5}
            className="mb-2 opacity-20"
          />
          <p className="text-sm font-medium">
            No one has started the conversation yet.
          </p>
          <p className="text-xs">Be the first to share your thoughts!</p>
        </div>
      )}

      {/* 3. COMMENT FEED */}
      {!loading && comments.length > 0 && (
        <div className="flex flex-col gap-1">
          {comments.map((comment, index) => (
            <div
              key={comment.id}
              className={`transition-all duration-300 ${
                index === 0
                  ? "bg-zinc-900/40 border border-zinc-800/50 rounded-xl p-3 md:p-4 mb-2 shadow-inner"
                  : "px-2 md:px-4"
              }`}
            >
              {/* index === 0 adds a 'Featured' or 'Top' look to the first comment */}
              {index === 0 && (
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2 py-0.5 rounded">
                    Top Comment
                  </span>
                </div>
              )}
              <CommentItem comment={comment} depth={0} />
            </div>
          ))}
        </div>
      )}

      {/* 4. FOOTER (Optional but good UX) */}
      {!loading && comments.length > 5 && (
        <div className="mt-6 flex justify-center">
          <button className="text-xs font-bold text-zinc-500 hover:text-zinc-200 uppercase tracking-widest transition-colors">
            End of Discussion
          </button>
        </div>
      )}
    </div>
  );
}
