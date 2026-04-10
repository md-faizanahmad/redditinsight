import { useState, useCallback } from "react";

export function useRedditSearch() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = useCallback(async (query) => {
    if (!query || query.trim() === "") {
      setPosts([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        `https://www.reddit.com/search.json?q=${encodeURIComponent(query)}`,
      );

      if (!res.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await res.json();

      const cleaned = data.data.children.map((item) => ({
        id: item.data.id,
        title: item.data.title,
        author: item.data.author,
        upvotes: item.data.ups,
        subreddit: item.data.subreddit,
        url: `https://reddit.com${item.data.permalink}`,
      }));

      setPosts(cleaned);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  return { posts, loading, error, search };
}
