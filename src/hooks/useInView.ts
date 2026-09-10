import { useEffect, useRef, useState } from "react";

/**
 * Fires `onEnter` once when the element first enters the viewport.
 * Useful for triggering CSS animations on scroll.
 */
export function useInView(
  options: IntersectionObserverInit = { threshold: 0.12 },
) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        obs.disconnect(); // fire only once
      }
    }, options);

    obs.observe(el);
    return () => obs.disconnect();
  }, [options]);

  return { ref, inView };
}
