const topics = ["react", "nextjs", "ai", "startup", "javascript"];

export default function Trending({ onSelect }) {
  return (
    <div className="w-full px-4 mt-6">
      <h3 className="text-sm text-gray-400 mb-3">Trending</h3>

      {/* 🔥 Horizontal Scroll */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
        {topics.map((t) => (
          <button
            key={t}
            onClick={() => onSelect(t)}
            className="whitespace-nowrap px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm hover:bg-white/20 transition"
          >
            #{t}
          </button>
        ))}
      </div>
    </div>
  );
}
