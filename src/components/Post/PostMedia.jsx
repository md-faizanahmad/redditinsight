import { useState } from "react";

export default function PostMedia({ image, video }) {
  const [loaded, setLoaded] = useState(false);

  if (video) {
    return (
      <video src={video} controls className="w-full max-h-125 object-cover" />
    );
  }

  if (image) {
    return (
      <div className="relative w-full max-h-125 overflow-hidden">
        {/* Blur placeholder */}
        <img
          src={image}
          alt=""
          className={`w-full object-cover blur-xl scale-110 absolute top-0 left-0 transition-opacity duration-500 ${
            loaded ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Actual image */}
        <img
          src={image}
          alt=""
          onLoad={() => setLoaded(true)}
          className={`w-full object-cover transition duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    );
  }

  return null;
}
