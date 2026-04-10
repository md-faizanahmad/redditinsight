import { useState } from "react";
import { useRedditSearch } from "./hooks/useRedditSearch";

export default function App() {
  const [query, setQuery] = useState("");
  const { posts, loading, error, search } = useRedditSearch();

  return (
    <div>
      <input
        type="text"
        placeholder="Search Reddit..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button onClick={() => search(query)}>Search</button>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>
            👍 {post.upvotes} | r/{post.subreddit}
          </p>
        </div>
      ))}
    </div>
  );
}
