import { useEffect, useState } from "react";

export default function Comments({ postId, visible }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!visible) return;

    const fetchComments = async () => {
      setLoading(true);

      try {
        const res = await fetch(`/api/comments?id=${postId}`);
        const data = await res.json();
        setComments(data);
      } catch (err) {
        console.error("Comments error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [visible, postId]);

  if (!visible) return null;

  return (
    <div className="mt-3 space-y-2 text-sm text-white/80">
      {loading && <p>Loading comments...</p>}

      {!loading && comments.length === 0 && (
        <p className="text-white/50">No comments</p>
      )}

      {comments.map((c) => (
        <div key={c.id} className="border-l border-white/10 pl-3">
          <p className="text-xs text-white/50">
            u/{c.author} • {c.upvotes} upvotes
          </p>
          <p className="line-clamp-3">{c.body}</p>
        </div>
      ))}
    </div>
  );
}
