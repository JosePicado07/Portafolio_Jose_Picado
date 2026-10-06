"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => null,
});

export default function HeroCanvas() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "requestIdleCallback" in window &&
      typeof window.requestIdleCallback === "function"
    ) {
      const id = window.requestIdleCallback(() => setReady(true), {
        timeout: 1200,
      });
      return () => window.cancelIdleCallback?.(id);
    }
    const timer = window.setTimeout(() => setReady(true), 200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="hero__canvas" aria-hidden="true">
      {ready ? <HeroScene /> : null}
    </div>
  );
}
