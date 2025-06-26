import { useEffect, useRef } from 'react';

export default function useInfiniteScroll(callback, loading, hasMore) {
  const loaderRef = useRef();

  useEffect(() => {
    if (loading) return;
    const observer = new window.IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        callback();
      }
    });
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [callback, loading, hasMore]);

  return loaderRef;
}
