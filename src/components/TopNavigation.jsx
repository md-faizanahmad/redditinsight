import Header from "./layouts/Header";
import SearchBar from "./SearchBar";

export default function TopNavigation({ onSearch }) {
  return (
    <div className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-white/10">
      <Header />
      <div className="pb-3">
        <SearchBar onSearch={onSearch} />
      </div>
    </div>
  );
}
