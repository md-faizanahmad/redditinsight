export default function PostMedia({ image, video }) {
  if (video) {
    return (
      <video
        src={video}
        controls
        className="w-full max-h-[500px] object-cover"
      />
    );
  }

  if (image) {
    return (
      <img src={image} alt="" className="w-full max-h-[500px] object-cover" />
    );
  }

  return null;
}
