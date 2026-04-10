import PostSkeleton from "../shared/PostSkeleton";
import PostCard from "./PostCard";

export default function PostList({ posts, loading }) {
  // Center the feed and limit width to feel like a mobile app on desktop
  const containerClasses =
    "mt-16 pb-10 flex flex-col items-center gap-2 md:gap-4 w-full max-w-[470px] mx-auto";

  if (loading && posts.length === 0) {
    return (
      <div className={containerClasses}>
        {Array.from({ length: 3 }).map((_, i) => (
          <PostSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {loading && (
        <div className="w-full flex flex-col gap-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <PostSkeleton key={`loading-${i}`} />
          ))}
        </div>
      )}
    </div>
  );
}
