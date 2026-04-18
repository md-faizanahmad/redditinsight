export function CommentSkeleton() {
  return (
    <div className="mt-6 space-y-6 animate-pulse px-4 md:px-0">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex gap-4">
          {/* Avatar & Rail Placeholder */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-7 h-7 bg-zinc-800 rounded-full" />
            <div className="w-px h-full bg-zinc-900" />
          </div>

          {/* Content Placeholder */}
          <div className="flex-1 pt-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-3 w-24 bg-zinc-800 rounded" />
              <div className="h-3 w-12 bg-zinc-900 rounded" />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-full bg-zinc-800 rounded" />
              <div className="h-3 w-3/4 bg-zinc-800 rounded" />
            </div>
            <div className="flex gap-4">
              <div className="h-6 w-16 bg-zinc-900 rounded-md" />
              <div className="h-6 w-12 bg-zinc-900 rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
