import { useEffect, useRef } from "react";

export function useInfiniteScroll(callback) {
  const observerRef = useRef();

  const lastElementRef = (node) => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        callback();
      }
    });

    if (node) observerRef.current.observe(node);
  };

  return lastElementRef;
}
