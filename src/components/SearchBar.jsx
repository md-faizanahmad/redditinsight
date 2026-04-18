import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-130 mx-auto px-4 relative flex items-center group"
    >
      {/* Search Icon (Decorative/Left) */}
      <span className="absolute left-8 text-gray-500 group-focus-within:text-white transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </span>

      {/* Input Field */}
      <input
        type="text"
        placeholder="Search"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full bg-[#262626] text-white text-sm rounded-lg py-2 pl-10 pr-12 outline-none border border-transparent focus:border-white/20 transition-all"
      />

      {/* Actual Search Button (Right) */}
      <button
        type="submit"
        disabled={!input.trim()}
        className={`absolute right-6 p-1.5 rounded-md transition-all duration-200 
          ${
            input.trim()
              ? "text-blue-500 hover:bg-blue-500/10 scale-110"
              : "text-gray-600 opacity-0 pointer-events-none"
          }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </form>
  );
}
