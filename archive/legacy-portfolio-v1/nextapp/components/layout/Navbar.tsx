"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";

const NAV_LINKS = [
  { key: "nav-about" as const, href: "#about" },
  { key: "nav-projects" as const, href: "#projects" },
  { key: "nav-skills" as const, href: "#skills" },
  { key: "nav-contact" as const, href: "#contact" },
];

export function Navbar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        transition: "background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
        backgroundColor: scrolled ? "var(--bg-base)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--border-subtle)" : "1px solid transparent",
        boxShadow: scrolled ? "var(--shadow-sm)" : "none",
        backdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      <nav
        style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem" }}
        aria-label="Main navigation"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "64px",
          }}
        >
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleNavClick("#hero"); }}
            style={{ display: "flex", alignItems: "center", gap: "0.625rem", textDecoration: "none" }}
            aria-label="José Picado — back to top"
          >
            <Image
              src="/Portaflio_Jose_Picado/images/logo.jpg"
              alt="José Picado"
              width={36}
              height={36}
              style={{ borderRadius: "50%", objectFit: "cover" }}
              priority
            />
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "1rem",
                letterSpacing: "-0.02em",
                color: "var(--ink)",
              }}
            >
              JP
            </span>
          </a>

          {/* Desktop nav */}
          <div
            className="hidden md:flex"
            style={{ alignItems: "center", gap: "0.25rem" }}
          >
            {NAV_LINKS.map(({ key, href }) => (
              <a
                key={key}
                href={href}
                onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "var(--ink-dim)",
                  textDecoration: "none",
                  padding: "0.5rem 0.875rem",
                  borderRadius: "6px",
                  transition: "color 0.15s ease, background-color 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "var(--brand)";
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "var(--bg-card)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "var(--ink-dim)";
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
                }}
              >
                {t(key)}
              </a>
            ))}
            <div style={{ width: "1px", height: "20px", backgroundColor: "var(--border-color)", margin: "0 0.5rem" }} />
            <ThemeToggle />
            <LanguageSwitcher />
          </div>

          {/* Mobile: controls + hamburger */}
          <div className="flex md:hidden" style={{ alignItems: "center", gap: "0.5rem" }}>
            <ThemeToggle />
            <LanguageSwitcher />
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                padding: "0.5rem",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    display: "block",
                    width: "22px",
                    height: "1.5px",
                    backgroundColor: "var(--ink)",
                    borderRadius: "2px",
                    transition: "transform 0.25s ease, opacity 0.25s ease",
                    transform:
                      menuOpen
                        ? i === 0
                          ? "translateY(6.5px) rotate(45deg)"
                          : i === 1
                          ? "scaleX(0)"
                          : "translateY(-6.5px) rotate(-45deg)"
                        : "none",
                    opacity: menuOpen && i === 1 ? 0 : 1,
                  }}
                />
              ))}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            style={{
              padding: "1rem 0 1.5rem",
              borderTop: "1px solid var(--border-subtle)",
              display: "flex",
              flexDirection: "column",
              gap: "0.25rem",
            }}
          >
            {NAV_LINKS.map(({ key, href }) => (
              <a
                key={key}
                href={href}
                onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1rem",
                  fontWeight: 500,
                  color: "var(--ink-dim)",
                  textDecoration: "none",
                  padding: "0.75rem 1rem",
                  borderRadius: "8px",
                  transition: "color 0.15s ease, background-color 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "var(--brand)";
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "var(--bg-card)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "var(--ink-dim)";
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
                }}
              >
                {t(key)}
              </a>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
