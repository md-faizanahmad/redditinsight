import PostSkeleton from "../shared/PostSkeleton";
import PostCard from "./PostCard";

export default function PostList({ posts, loading }) {
  // 🔥 Skeleton state
  if (loading && posts.length === 0) {
    return (
      <div
        className="mt-16 px-4 grid gap-6 
        grid-cols-1 
        md:grid-cols-2 
        lg:grid-cols-3"
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <PostSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div
      className="mt-16 px-4 grid gap-6 
      grid-cols-1 
      md:grid-cols-2 
      lg:grid-cols-3"
    >
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {/* 🔥 Load more skeleton */}
      {loading &&
        Array.from({ length: 3 }).map((_, i) => (
          <PostSkeleton key={`loading-${i}`} />
        ))}
    </div>
  );
}
