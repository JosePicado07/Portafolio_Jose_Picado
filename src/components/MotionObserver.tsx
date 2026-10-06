"use client";

import { useEffect } from "react";

const REVEAL_SELECTOR = "[data-reveal], [data-draw]";
const GROUP_SELECTOR = "[data-draw-group]";

function intersectsViewport(element: Element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.bottom > 0 &&
    rect.top < window.innerHeight &&
    rect.right > 0 &&
    rect.left < window.innerWidth
  );
}

export default function MotionObserver() {
  useEffect(() => {
    const pending: Element[] = [];
    for (const target of Array.from(
      document.querySelectorAll(`${REVEAL_SELECTOR}, ${GROUP_SELECTOR}`),
    )) {
      if (intersectsViewport(target)) target.setAttribute("data-in", "true");
      else pending.push(target);
    }

    const handleEntries = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver,
    ) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.setAttribute("data-in", "true");
        observer.unobserve(entry.target);
      }
    };

    const revealObserver = new IntersectionObserver(handleEntries, {
      threshold: 0.15,
      rootMargin: "0px 0px -10% 0px",
    });

    const groupObserver = new IntersectionObserver(handleEntries, {
      threshold: 0.25,
      rootMargin: "0px 0px -10% 0px",
    });

    for (const target of pending) {
      if (target.matches(GROUP_SELECTOR)) groupObserver.observe(target);
      else revealObserver.observe(target);
    }

    const frame = requestAnimationFrame(() =>
      document.documentElement.classList.add("motion-ready"),
    );

    return () => {
      cancelAnimationFrame(frame);
      revealObserver.disconnect();
      groupObserver.disconnect();
    };
  }, []);

  return null;
}
