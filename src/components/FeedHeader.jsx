export default function FeedHeader({ isSearching }) {
  return (
    <div className="px-4 py-4">
      {!isSearching ? (
        <h2 className="text-lg font-semibold text-white/80">🔥 Trending Now</h2>
      ) : (
        <h2 className="text-lg font-semibold text-white/80">
          🔍 Search Results
        </h2>
      )}
    </div>
  );
}
