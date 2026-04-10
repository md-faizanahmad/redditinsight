import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  const handleSearch = () => {
    if (!input.trim()) return;
    onSearch(input);
  };

  return (
    <div className="flex items-center gap-2 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-2 shadow-lg">
      <input
        type="text"
        placeholder="Search Reddit topics..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        className="bg-transparent outline-none px-4 py-2 w-72 text-white placeholder-gray-400"
      />

      <button
        onClick={handleSearch}
        disabled={!input.trim()}
        className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-lg disabled:opacity-50"
      >
        Search
      </button>
    </div>
  );
}
