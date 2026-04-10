import React, { useState, useEffect } from "react";
import "./home.css";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const apiUrl =
          process.env.NODE_ENV === "production"
            ? "https://your-vercel-app-name.vercel.app/api/reddit"
            : "/api/reddit";

        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        const data = await response.json();

        const postsData = data.data.children.map((child) => ({
          title: child.data.title,
          selfTextHTML: child.data.selftext_html,
          url: child.data.url,
          score: child.data.score,
        }));
        setPosts(postsData);
        setLoading(false);
      } catch (err) {
        setError(
          `Failed to fetch posts: ${err.message}. This may be due to rate limits or server issues.`
        );
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);
  if (loading) {
    return <div className="loading">Loading posts...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="home-container">
      <h1 className="header">ReactJS Reddit Posts</h1>
      <div className="posts-grid">
        {posts.map((post, index) => (
          <div key={index} className="post-card">
            <h2 className="post-title">{post.title}</h2>
            <div className="post-score">Score: {post.score}</div>

            {post.selfTextHTML && (
              <div
                className="post-content"
                dangerouslySetInnerHTML={{ __html: post.selfTextHTML }}
              />
            )}

            {post.url && (
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="post-url"
              >
                {post.url}
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
