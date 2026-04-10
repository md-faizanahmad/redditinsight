import Header from "./components/layouts/Header";
import PostList from "./components/Post/PostList";
import SearchBar from "./components/SearchBar";
import Trending from "./components/TrendingSidebar";
import { useRedditSearch } from "./hooks/useRedditSearch";

export default function App() {
  const { posts, loading, error, search, loadMore } = useRedditSearch();

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* HERO SECTION */}
      <div className="flex flex-col items-center justify-center text-center px-4 pt-24">
        <Header />
        <SearchBar onSearch={search} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto px-4 mt-10">
        {/* MAIN */}
        <div className="md:col-span-3">
          <PostList posts={posts} loading={loading} loadMore={loadMore} />
        </div>

        {/* SIDEBAR */}
        <div className="hidden md:block">
          <Trending onSelect={search} />
        </div>
      </div>
      {/* RESULTS */}
    </div>
  );
}
