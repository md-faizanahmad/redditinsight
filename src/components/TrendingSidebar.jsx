const topics = ["react", "nextjs", "ai", "startup", "javascript"];

export default function Trending({ onSelect }) {
  return (
    <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
      <h3 className="font-semibold mb-3">Trending</h3>

      <div className="flex flex-col gap-2">
        {topics.map((t) => (
          <button
            key={t}
            onClick={() => onSelect(t)}
            className="text-left text-sm text-gray-300 hover:text-white"
          >
            #{t}
          </button>
        ))}
      </div>
    </div>
  );
}
