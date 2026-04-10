import PostMeta from "./PostMeta";

export default function PostCard({ post }) {
  return (
    <a
      href={post.url}
      target="_blank"
      rel="noreferrer"
      className="block rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition overflow-hidden"
    >
      {/* IMAGE */}
      {post.image && (
        <img
          src={post.image}
          alt="thumbnail"
          className="w-full h-48 object-cover"
        />
      )}

      {/* CONTENT */}
      <div className="p-5">
        <h3 className="text-lg font-semibold leading-snug line-clamp-2">
          {post.title}
        </h3>

        <PostMeta post={post} />
      </div>
    </a>
  );
}
