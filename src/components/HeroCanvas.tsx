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

    // Low-power / mobile fallback: keep HeroPoster, no layout shift.
    if (
      typeof navigator !== "undefined" &&
      typeof navigator.hardwareConcurrency === "number" &&
      navigator.hardwareConcurrency < 4
    ) {
      setMode("poster");
      return;
    }
    if (
      typeof navigator !== "undefined" &&
      "deviceMemory" in navigator &&
      typeof (navigator as Navigator & { deviceMemory?: number })
        .deviceMemory === "number" &&
      (navigator as Navigator & { deviceMemory?: number }).deviceMemory! < 4
    ) {
      setMode("poster");
      return;
    }
    if (
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(pointer: coarse)").matches
    ) {
      setMode("poster");
      return;
    }

    let cancelled = false;
    let idleId: number | undefined;
    let started = false;

    function start() {
      if (cancelled || started) return;
      started = true;
      cleanup();
      setMode("webgl");
    }

    function scheduleIdle() {
      if (cancelled || started) return;
      if (
        typeof window.requestIdleCallback === "function" &&
        "requestIdleCallback" in window
      ) {
        idleId = window.requestIdleCallback(() => start());
      }
      // No timer fallback: WebGL starts only on true idle or first interaction.
    }

    function cleanup() {
      window.removeEventListener("scroll", start);
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("keydown", start);
      window.removeEventListener("load", scheduleIdle);
      if (
        idleId !== undefined &&
        typeof window.cancelIdleCallback === "function"
      ) {
        window.cancelIdleCallback(idleId);
      }
    }

    window.addEventListener("scroll", start, { once: true, passive: true });
    window.addEventListener("pointerdown", start, { once: true });
    window.addEventListener("keydown", start, { once: true });

    if (document.readyState === "complete") {
      scheduleIdle();
    } else {
      window.addEventListener("load", scheduleIdle, { once: true });
    }

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return (
    <div className="hero__canvas" aria-hidden="true">
      {mode === "webgl" ? <HeroScene /> : null}
    </div>
  );
}
