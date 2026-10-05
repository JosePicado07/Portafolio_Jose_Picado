"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { heroStagger, heroItem } from "@/lib/animations";

const STATS = [
  { value: "92%", key: "hero-stat-1" as const },
  { value: "500K+", key: "hero-stat-2" as const },
  { value: "350+", key: "hero-stat-3" as const },
];

export function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="hero"
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        position: "relative",
        overflow: "hidden",
        paddingTop: "80px",
      }}
    >
      {/* Grid background */}
      <div
        className="grid-bg"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Top accent: availability badge */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "absolute",
          top: "88px",
          right: "1.5rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.375rem 0.875rem",
          borderRadius: "100px",
          backgroundColor: "var(--bg-card)",
          border: "1px solid var(--border-color)",
          fontSize: "0.75rem",
          fontFamily: "var(--font-body)",
          fontWeight: 500,
          color: "var(--ink-dim)",
          zIndex: 1,
        }}
      >
        <span
          style={{
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            backgroundColor: "var(--accent)",
            flexShrink: 0,
            boxShadow: "0 0 0 2px oklch(46% 0.19 162 / 0.25)",
            animation: "pulse 2s infinite",
          }}
        />
        {t("hero-avail")}
      </motion.div>

      {/* Main content */}
      <motion.div
        variants={heroStagger}
        initial="hidden"
        animate="visible"
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "72rem",
          margin: "0 auto",
          padding: "0 1.5rem 4rem",
          width: "100%",
        }}
      >
        {/* Role tag */}
        <motion.div variants={heroItem} style={{ marginBottom: "1.5rem" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--brand)",
              padding: "0.375rem 0.875rem",
              border: "1px solid var(--brand)",
              borderRadius: "4px",
              opacity: 0.9,
            }}
          >
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--brand)" }} />
            {t("hero-title")}
          </span>
        </motion.div>

        {/* Name — architectural display */}
        <motion.div variants={heroItem}>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              lineHeight: 0.92,
              letterSpacing: "-0.055em",
              color: "var(--ink)",
              marginBottom: "1.75rem",
            }}
          >
            <span
              style={{
                display: "block",
                fontSize: "clamp(2.5rem, 7vw, 5rem)",
                color: "var(--ink-dim)",
              }}
            >
              José Andrés
            </span>
            <span
              style={{
                display: "block",
                fontSize: "clamp(5.5rem, 14vw, 9.5rem)",
              }}
            >
              PICADO
            </span>
          </h1>
        </motion.div>

        {/* Tagline + hook */}
        <motion.div variants={heroItem} style={{ maxWidth: "36rem", marginBottom: "2.25rem" }}>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.9375rem",
              fontWeight: 500,
              color: "var(--ink-muted)",
              letterSpacing: "0.01em",
              marginBottom: "1rem",
            }}
          >
            {t("hero-tagline")}
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(1.0625rem, 2vw, 1.25rem)",
              fontWeight: 700,
              color: "var(--accent)",
              lineHeight: 1.4,
            }}
          >
            {t("hero-pain-hook")}
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          variants={heroItem}
          style={{ display: "flex", flexWrap: "wrap", gap: "0.875rem", marginBottom: "3.5rem" }}
        >
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.75rem 1.5rem",
              backgroundColor: "var(--brand)",
              color: "#fff",
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: "0.9375rem",
              borderRadius: "8px",
              textDecoration: "none",
              transition: "background-color 0.2s ease, transform 0.15s ease",
              border: "1px solid transparent",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "var(--brand-hover)";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "var(--brand)";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
            }}
          >
            {t("hero-cta")}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M8 12l-4-4m4 4 4-4M8 12V4" />
            </svg>
          </a>

          <a
            href="/Portaflio_Jose_Picado/assets/CV_Jose_Picado_2026.pdf"
            download
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.75rem 1.5rem",
              backgroundColor: "transparent",
              color: "var(--ink)",
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: "0.9375rem",
              borderRadius: "8px",
              textDecoration: "none",
              border: "1px solid var(--border-color)",
              transition: "border-color 0.2s ease, color 0.2s ease, transform 0.15s ease, background-color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--brand)";
              (e.currentTarget as HTMLAnchorElement).style.color = "var(--brand)";
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "var(--bg-card)";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border-color)";
              (e.currentTarget as HTMLAnchorElement).style.color = "var(--ink)";
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M8 2v9M4 8l4 4 4-4M2 14h12" />
            </svg>
            {t("hero-downloadCV")}
          </a>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.75rem 1.5rem",
              backgroundColor: "transparent",
              color: "var(--accent)",
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: "0.9375rem",
              borderRadius: "8px",
              textDecoration: "none",
              border: "1px solid var(--accent)",
              transition: "background-color 0.2s ease, transform 0.15s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "oklch(46% 0.19 162 / 0.08)";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
            }}
          >
            {t("hero-contact")}
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={heroItem}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0",
            borderTop: "1px solid var(--border-subtle)",
            paddingTop: "2rem",
          }}
        >
          {STATS.map(({ value, key }, i) => (
            <div
              key={key}
              style={{
                flex: "1 1 120px",
                padding: "0 2rem 0 0",
                borderRight: i < STATS.length - 1 ? "1px solid var(--border-subtle)" : "none",
                marginRight: i < STATS.length - 1 ? "2rem" : "0",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontWeight: 700,
                  fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                  letterSpacing: "-0.04em",
                  color: "var(--ink)",
                  lineHeight: 1,
                  marginBottom: "0.375rem",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {value}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.8125rem",
                  fontWeight: 500,
                  color: "var(--ink-muted)",
                  letterSpacing: "0.01em",
                }}
              >
                {t(key)}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "120px",
          background: "linear-gradient(to top, var(--bg-base), transparent)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </section>
  );
}
