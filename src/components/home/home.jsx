import React, { useEffect, useState } from "react";
import "./home.css";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          "https://www.reddit.com/r/reactjs.json?raw_json=1"
        );
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        setPosts(data.data.children);
      } catch (err) {
        console.error(err);
        setError("Something went wrong while fetching posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container">
      <h1 className="header">🔥 Top Posts from r/reactjs</h1>
      <hr className="divider" />

      {loading && <p className="loading">Loading posts...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <div className="grid">
          {posts.map((post) => {
            const { id, title, selftext_html, url, score } = post.data;
            return (
              <div key={id} className="card">
                <h2>{title}</h2>
                {selftext_html && (
                  <div
                    className="card-body"
                    dangerouslySetInnerHTML={{ __html: selftext_html }}
                  />
                )}
                <div className="card-footer">
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-link"
                  >
                    Read more →
                  </a>
                  <span className="card-score">⭐ {score}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Home;
