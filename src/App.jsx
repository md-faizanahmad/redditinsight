import FeedHeader from "./components/FeedHeader";
import Header from "./components/layouts/Header";
import PostList from "./components/Post/PostList";
import TrendingPosts from "./components/Post/TrendingPosts";
import SearchBar from "./components/SearchBar";
import BackToTop from "./components/shared/BackToTop";
import { useRedditSearch } from "./hooks/useRedditSearch";
export default function App() {
  const { posts, loading, error, search, loadMore, isSearching } =
    useRedditSearch();

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
          {/* <FeedHeader isSearching={isSearching} /> */}

          {/* Post Feed */}
          {/* <PostList posts={posts} loading={loading} loadMore={loadMore} /> */}

          {/* 🔥 TRENDING */}
          <TrendingPosts active={!isSearching} />

          {/* 🔍 SEARCH RESULTS */}
          {isSearching && (
            <>
              <div className="px-4 py-4">
                <h2 className="text-lg font-semibold text-white/80">
                  🔍 Search Results
                </h2>
              </div>

              <PostList posts={posts} loading={loading} loadMore={loadMore} />
            </>
          )}
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
      <footer className="w-full max-w-3xl mx-auto py-8 px-6">
        <div className="border-t border-zinc-900 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left Side: Rights */}
          <p className="text-[10px] md:text-xs font-medium text-zinc-500 uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} All Rights Reserved to{" "}
            <span className="text-zinc-300">Reddit</span>
          </p>

          {/* Center: Subtle Dot (Hidden on mobile) */}
          <div className="hidden md:block w-1 h-1 rounded-full bg-zinc-800" />

          {/* Right Side: Credit */}
          <p className="text-[10px] md:text-xs font-medium text-zinc-500 uppercase tracking-[0.2em]">
            Design by{" "}
            <span className="text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer tracking-widest font-bold">
              MFA Agency
            </span>
          </p>
        </div>
      </footer>
    </div>
  );
}
