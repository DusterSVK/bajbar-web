"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Ľahký reveal-on-scroll wrapper. Pridá `.is-in` keď prvok vojde do viewportu
 * (IntersectionObserver). Rešpektuje prefers-reduced-motion cez CSS.
 */
export function Reveal({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "li" | "article";
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);

  const Comp = Tag as "div";
  return (
    <Comp ref={ref as React.Ref<HTMLDivElement>} className={`reveal ${shown ? "is-in" : ""} ${className}`}>
      {children}
    </Comp>
  );
}
