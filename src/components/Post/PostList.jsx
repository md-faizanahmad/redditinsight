import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import PostCard from "./PostCard";

export default function PostList({ posts, loading, loadMore }) {
  const lastRef = useInfiniteScroll(loadMore);

  return (
    <div className="mt-16 px-4 max-w-4xl mx-auto grid gap-6">
      {posts.map((post, index) => {
        if (index === posts.length - 1) {
          return <PostCard ref={lastRef} key={post.id} post={post} />;
        }
        return <PostCard key={post.id} post={post} />;
      })}

      {loading && <p className="text-center text-gray-400">Loading more...</p>}
    </div>
  );
}
