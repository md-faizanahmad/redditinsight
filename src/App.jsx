import Header from "./components/layouts/Header";
import PostList from "./components/Post/PostList";
import SearchBar from "./components/SearchBar";
import BackToTop from "./components/shared/BackToTop";
import { useRedditSearch } from "./hooks/useRedditSearch";

export default function App() {
  const { posts, loading, error, search, loadMore } = useRedditSearch();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* STICKY TOP NAVIGATION */}
      <div className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-white/10">
        <Header />
        <div className="pb-3">
          <SearchBar onSearch={search} />
        </div>
      </div>

      {/* MAIN FEED AREA */}
      <main className="w-full flex justify-center">
        <div className="w-full max-w-117.5">
          {/* Error Message UI */}
          {error && (
            <div className="p-4 text-center text-red-400 text-sm">
              <p>Something went wrong. Please try again.</p>
            </div>
          )}

          {/* Post Feed */}
          <PostList posts={posts} loading={loading} loadMore={loadMore} />

          {/* INFINITE SCROLL TRIGGER (Optional but recommended) */}
          {!loading && posts.length > 0 && (
            <div className="flex justify-center py-8">
              <button
                onClick={loadMore}
                className="text-blue-500 font-semibold text-sm hover:text-white transition"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </main>
      <BackToTop />
      {/* BOTTOM SPACING FOR MOBILE BROWSERS */}
      <div className="h-20" />
    </div>
  );
}
