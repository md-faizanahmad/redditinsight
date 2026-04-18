import { useEffect, useState } from "react";
import PostList from "../Post/PostList";

export default function TrendingPosts({ active }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // ❗ only fetch when active (not searching)
    if (!active) return;

    const fetchTrending = async () => {
      setLoading(true);

      try {
        const res = await fetch("/api/reddit"); // no query = trending

        if (!res.ok) {
          throw new Error("Failed to fetch trending");
        }

        const data = await res.json();

        if (!data?.data?.children) {
          throw new Error("Invalid Reddit response");
        }

        const mapped = data.data.children.map((item) => {
          const d = item.data;

          let image = null;
          if (d.preview?.images?.[0]?.source?.url) {
            image = d.preview.images[0].source.url.replace(/&amp;/g, "&");
          } else if (d.thumbnail?.startsWith("http")) {
            image = d.thumbnail;
          }

          let video = null;
          if (d.is_video && d.media?.reddit_video?.fallback_url) {
            video = d.media.reddit_video.fallback_url;
          }

          return {
            id: d.id,
            title: d.title,
            author: d.author,
            subreddit: d.subreddit,
            upvotes: d.ups,
            comments: d.num_comments,
            url: `https://reddit.com${d.permalink}`,
            createdAt: d.created_utc,
            image,
            video,
          };
        });

        setPosts(mapped);
      } catch (err) {
        console.error("Trending fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, [active]);

  if (!active) return null;

  return (
    <>
      <div className="px-4 py-4">
        <h2 className="text-lg font-semibold text-white/80">🔥 Trending Now</h2>
      </div>

      <PostList posts={posts} loading={loading} />
    </>
  );
}
