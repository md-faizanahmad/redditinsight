import Header from "./components/layouts/Header";
import PostList from "./components/PostList";
import SearchBar from "./components/SearchBar";
import { useRedditSearch } from "./hooks/useRedditSearch";

export default function App() {
  const { posts, loading, error, search } = useRedditSearch();

  return (
    <div className="p-4">
      <Header />
      <SearchBar onSearch={search} />
      <PostList posts={posts} loading={loading} error={error} />
    </div>
  );
}
