import { useState } from "react";
import {
  ArrowBigUp,
  ArrowBigDown,
  MessageSquare,
  MoreHorizontal,
  ChevronUp,
} from "lucide-react";

export default function CommentItem({ comment, depth = 0 }) {
  const [collapsed, setCollapsed] = useState(false);

  if (depth > 5) return null;

  return (
    <div
      className={`mt-4 ${depth > 0 ? "ml-3 md:ml-6 border-l border-zinc-800/50 pl-4" : ""}`}
    >
      {/* AUTHOR & META */}
      <div className="flex items-center gap-2 mb-1">
        <div className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[10px] font-bold text-zinc-400">
          {comment.author[0].toUpperCase()}
        </div>
        <span className="text-xs font-bold text-zinc-200">
          u/{comment.author}
        </span>
        <span className="text-[10px] text-zinc-600 italic">2h ago</span>

        {collapsed && (
          <button
            onClick={() => setCollapsed(false)}
            className="text-[10px] font-black text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded transition-colors"
          >
            Expand
          </button>
        )}
      </div>

      {!collapsed && (
        <div className="flex flex-col">
          <div className="flex-1 pb-2">
            {/* BODY */}
            <p className="text-sm text-zinc-300 leading-relaxed mb-3 pr-2">
              {comment.body}
            </p>

            {/* ACTION BAR */}
            <div className="flex items-center gap-4 text-zinc-500 mb-2">
              <div className="flex items-center bg-zinc-900/50 rounded-lg border border-zinc-800/50 p-0.5">
                <button className="p-1 hover:text-orange-500 hover:bg-zinc-800 rounded transition-all">
                  <ArrowBigUp size={16} />
                </button>
                <span className="text-[11px] font-bold px-1 text-zinc-300">
                  {comment.upvotes}
                </span>
                <button className="p-1 hover:text-indigo-500 hover:bg-zinc-800 rounded transition-all">
                  <ArrowBigDown size={16} />
                </button>
              </div>
              <button className="flex items-center gap-1.5 text-[11px] font-medium hover:text-zinc-200 transition-colors">
                <MessageSquare size={14} /> Reply
              </button>
              <button className="p-1 hover:text-zinc-200 transition-colors">
                <MoreHorizontal size={14} />
              </button>
            </div>

            {/* RECURSIVE REPLIES */}
            {comment.replies?.length > 0 && (
              <div className="mt-2 space-y-2">
                {comment.replies.map((reply) => (
                  <CommentItem
                    key={reply.id}
                    comment={reply}
                    depth={depth + 1}
                  />
                ))}

                {/* --- THE NEW BOTTOM CLOSE TRIGGER --- */}
                {depth < 2 && ( // Only show on major branches to avoid clutter
                  <div className="pt-2 mt-4 border-t border-zinc-900/50 flex justify-start">
                    <button
                      onClick={() => {
                        setCollapsed(true);
                        // Optional: Scroll back to the start of this specific comment
                        window.scrollTo({
                          behavior: "smooth",
                          top: window.scrollY - 100,
                        });
                      }}
                      className="group flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition-all"
                    >
                      <ChevronUp
                        size={14}
                        className="text-zinc-500 group-hover:text-indigo-400"
                      />
                      <span className="text-[10px] font-bold text-zinc-500 group-hover:text-zinc-200 uppercase tracking-widest">
                        Collapse Thread
                      </span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
