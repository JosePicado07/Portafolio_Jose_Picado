"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => null,
});

export default function HeroCanvas() {
  const [mode, setMode] = useState<"unknown" | "webgl" | "poster">("unknown");

  useEffect(() => {
    if (!document.documentElement.classList.contains("webgl-ok")) {
      setMode("poster");
      return;
    }
    if (
      typeof window !== "undefined" &&
      "requestIdleCallback" in window &&
      typeof window.requestIdleCallback === "function"
    ) {
      const id = window.requestIdleCallback(() => setMode("webgl"), {
        timeout: 1200,
      });
      return () => window.cancelIdleCallback?.(id);
    }
    const timer = window.setTimeout(() => setMode("webgl"), 200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="hero__canvas" aria-hidden="true">
      {mode === "webgl" ? <HeroScene /> : null}
    </div>
  );
}
