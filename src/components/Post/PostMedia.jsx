import { useState } from "react";

export default function PostMedia({ image, video }) {
  const [loaded, setLoaded] = useState(false);

  // Use aspect-square or min-h-[300px] to prevent layout shift
  const mediaClass = "w-full h-auto max-h-[600px] object-contain";

  if (video) {
    return <video src={video} controls playsInline className={mediaClass} />;
  }

  if (image) {
    return (
      <div className="relative w-full bg-neutral-900 overflow-hidden flex items-center justify-center">
        {/* Blur placeholder */}
        {!loaded && (
          <img
            src={image}
            alt=""
            className="w-full h-full object-cover blur-2xl absolute inset-0 scale-110"
          />
        )}

        <img
          src={image}
          alt={image}
          onLoad={() => setLoaded(true)}
          className={`${mediaClass} transition-opacity duration-300 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    );
  }

  return null;
}
