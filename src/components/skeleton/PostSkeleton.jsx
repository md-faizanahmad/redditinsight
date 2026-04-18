export default function PostSkeleton() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden animate-pulse mb-8">
      {/* Header */}
      <div className="flex items-center gap-3 p-4">
        <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
        <div className="flex flex-col gap-2">
          <div className="w-24 h-3 bg-gray-700 rounded"></div>
          <div className="w-16 h-2 bg-gray-700 rounded"></div>
        </div>
      </div>

      {/* Media */}
      <div className="w-full h-64 bg-gray-800"></div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <div className="w-full h-3 bg-gray-700 rounded"></div>
        <div className="w-3/4 h-3 bg-gray-700 rounded"></div>
      </div>
    </div>
  );
}
