import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) onSearch(input);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-[470px] mx-auto px-4 relative flex items-center"
    >
      <span className="absolute left-8 text-gray-500">
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

      <input
        type="text"
        placeholder="Search topics..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full bg-[#262626] text-white text-sm rounded-lg py-2 pl-10 pr-4 outline-none focus:ring-1 focus:ring-white/20"
      />

      <button type="submit" className="hidden">
        Search
      </button>
    </form>
  );
}
