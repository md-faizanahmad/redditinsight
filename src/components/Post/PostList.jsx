import { useEffect, useRef, useCallback } from "react";
import PostCard from "./PostCard";
import PostSkeleton from "../skeleton/PostSkeleton";

export default function PostList({ posts, loading, loadMore }) {
  const observer = useRef();

  // This ref will be attached to the very last element in the list
  const lastPostElementRef = useCallback(
    (node) => {
      if (loading) return; // Don't trigger if already loading
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadMore(); // Trigger the next page of Reddit posts
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, loadMore],
  );

  const containerClasses =
    "mt-4 pb-10 flex flex-col items-center w-full max-w-[470px] mx-auto";

  return (
    <div className={containerClasses}>
      {posts.map((post, index) => {
        // If it's the last post in the current array, attach the ref
        if (posts.length === index + 1) {
          return (
            <div ref={lastPostElementRef} key={post.id} className="w-full">
              <PostCard post={post} />
            </div>
          );
        } else {
          return <PostCard key={post.id} post={post} />;
        }
      })}

      {/* Loading Skeletons */}
      {loading && (
        <div className="w-full flex flex-col mt-3 mb-8 ">
          {Array.from({ length: 2 }).map((_, i) => (
            <PostSkeleton key={`loading-${i}`} />
          ))}
        </div>
      )}
    </div>
  );
}
