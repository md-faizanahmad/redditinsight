import { useState, useEffect, useRef } from "react";

export function useRedditSearch() {
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [after, setAfter] = useState(null);

  const debounceRef = useRef(null);

  // 🔥 SEARCH WITH DEBOUNCE
  const search = (q) => {
    setQuery(q);

    clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      fetchPosts(q, true);
    }, 500);
  };

  // 🔥 FETCH FUNCTION
  const fetchPosts = async (q, reset = false) => {
    if (!q) return;

    setLoading(true);
    // fetch(`/api/reddit?q=${query}`)
    const url = `/api/reddit?q=${query}${after && !reset ? `&after=${after}` : ""}`;
    console.log(url);
    const res = await fetch(url);
    const data = await res.json();

    const newPosts = data.data.children.map((item) => {
      const d = item.data;

      // 🔥 High quality image
      let image = null;
      if (d.preview?.images?.[0]?.source?.url) {
        image = d.preview.images[0].source.url.replace(/&amp;/g, "&");
      }

      // 🔥 Video support
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
        image:
          d.thumbnail && d.thumbnail.startsWith("http") ? d.thumbnail : null,
        url: `https://reddit.com${d.permalink}`,
        createdAt: d.created_utc,
        image,
        video,
      };
    });

    setPosts((prev) => (reset ? newPosts : [...prev, ...newPosts]));
    setAfter(data.data.after);
    setLoading(false);
  };

  // 🔥 LOAD MORE (INFINITE SCROLL)
  const loadMore = () => {
    if (!loading) fetchPosts(query);
  };

  return {
    posts,
    loading,
    search,
    loadMore,
  };
}
