import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    if (typeof document === "undefined") return;
    const original = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = original;
    };
  }, []);

  return null;
}
