"use client";

import { useEffect } from "react";

const REVEAL_SELECTOR = "[data-reveal], [data-draw]";
const GROUP_SELECTOR = "[data-draw-group]";

export default function MotionObserver() {
  useEffect(() => {
    let ready = false;
    const markReady = () => {
      if (ready) return;
      ready = true;
      document.documentElement.classList.add("motion-ready");
    };

    const handleEntries = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver,
    ) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.setAttribute("data-in", "true");
        observer.unobserve(entry.target);
      }
      markReady();
    };

    const revealObserver = new IntersectionObserver(handleEntries, {
      threshold: 0.15,
      rootMargin: "0px 0px -10% 0px",
    });

    const groupObserver = new IntersectionObserver(handleEntries, {
      threshold: 0.25,
      rootMargin: "0px 0px -10% 0px",
    });

    const revealTargets = Array.from(
      document.querySelectorAll(REVEAL_SELECTOR),
    );
    const groupTargets = Array.from(document.querySelectorAll(GROUP_SELECTOR));

    if (revealTargets.length === 0 && groupTargets.length === 0) {
      markReady();
      return;
    }

    revealTargets.forEach((target) => revealObserver.observe(target));
    groupTargets.forEach((target) => groupObserver.observe(target));

    return () => {
      revealObserver.disconnect();
      groupObserver.disconnect();
    };
  }, []);

  return null;
}
