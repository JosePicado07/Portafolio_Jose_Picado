"use client";

import { useLanguage } from "@/context/LanguageContext";

export function LanguageSwitcher() {
  const { lang, switchLanguage } = useLanguage();

  return (
    <button
      onClick={switchLanguage}
      aria-label={`Switch to ${lang === "es" ? "English" : "Spanish"}`}
      className="text-xs font-mono font-semibold tracking-widest transition-colors duration-200 px-2 py-1 rounded"
      style={{ color: "var(--ink-dim)" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.color = "var(--brand)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.color = "var(--ink-dim)";
      }}
    >
      <span style={{ color: "var(--brand)", fontFamily: "var(--font-mono)" }}>
        {lang.toUpperCase()}
      </span>
      <span style={{ color: "var(--border-color)" }}> / </span>
      <span>{lang === "es" ? "EN" : "ES"}</span>
    </button>
  );
}
