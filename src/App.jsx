import Header from "./components/layouts/Header";
import PostList from "./components/Post/PostList";
import SearchBar from "./components/SearchBar";
import { useRedditSearch } from "./hooks/useRedditSearch";

export default function App() {
  const { posts, loading, error, search } = useRedditSearch();

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* HERO SECTION */}
      <div className="flex flex-col items-center justify-center text-center px-4 pt-24">
        <Header />
        <SearchBar onSearch={search} />
      </div>
      {/* RESULTS */}
      <PostList posts={posts} loading={loading} error={error} />
    </div>
  );
}
