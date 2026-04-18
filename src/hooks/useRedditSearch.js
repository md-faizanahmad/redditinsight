import { useState, useRef } from "react";

export function useRedditSearch() {
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [after, setAfter] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const debounceRef = useRef(null);

  // const search = (q) => {
  //   clearTimeout(debounceRef.current);

  //   debounceRef.current = setTimeout(() => {
  //     setQuery(q);
  //     setAfter(null);
  //     fetchPosts(q, true);
  //   }, 500);
  // };

  // With Trending Post

  const search = (q) => {
    clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      if (!q || q.trim() === "") {
        setIsSearching(false);
        fetchPosts("", true); // fetch trending
        return;
      }

      setIsSearching(true);
      setQuery(q);
      setAfter(null);
      fetchPosts(q, true);
    }, 500);
  };

  const fetchPosts = async (q, reset = false) => {
    if (!q) return;

    setLoading(true);

    try {
      const currentAfter = reset ? null : after;
      // const url = `/api/reddit?q=${q}${currentAfter ? `&after=${after}` : ""}`;

      // with trending post
      const url = q
        ? `/api/reddit?q=${q}${after && !reset ? `&after=${after}` : ""}`
        : `/api/reddit`;

      const res = await fetch(url);
      if (!res.ok) throw new Error("Fetch failed");

      const data = await res.json();

      const newPosts = data.data.children.map((item) => {
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

      setPosts((prev) => (reset ? newPosts : [...prev, ...newPosts]));
      setAfter(data.data.after);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && after) {
      fetchPosts(query);
    }
  };

  return {
    posts,
    loading,
    search,
    loadMore,
    isSearching,
  };
}
