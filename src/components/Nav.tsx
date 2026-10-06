"use client";

import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { nav, urls } from "@/content/en";

const HAIRLINE_AFTER_PX = 8;
const PANEL_ID = "nav-disclosure";
const SPY_IDS = ["#projects", "#skills", "#about", "#contact"];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [panelMounted, setPanelMounted] = useState(false);
  const [panelShown, setPanelShown] = useState(false);
  const [panelClosing, setPanelClosing] = useState(false);
  const [language, setLanguage] = useState("EN");
  const [active, setActive] = useState<string | null>(null);
  const [bar, setBar] = useState<{ x: number; w: number } | null>(null);
  const linksRef = useRef<HTMLUListElement>(null);
  const closeTimer = useRef(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > HAIRLINE_AFTER_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const measureBar = useCallback(() => {
    const list = linksRef.current;
    if (!list || !active) {
      setBar(null);
      return;
    }
    const link = list.querySelector<HTMLAnchorElement>(`a[href="${active}"]`);
    if (!link) {
      setBar(null);
      return;
    }
    setBar({ x: link.offsetLeft, w: link.offsetWidth });
  }, [active]);

  useEffect(() => {
    measureBar();
    window.addEventListener("resize", measureBar);
    if (document.fonts) {
      document.fonts.ready.then(() => measureBar()).catch(() => undefined);
    }
    return () => window.removeEventListener("resize", measureBar);
  }, [measureBar]);

  useEffect(() => {
    const sections = SPY_IDS.map((id) => document.querySelector(id)).filter(
      (section): section is Element => section !== null,
    );
    if (sections.length === 0) return;
    const visible = new Set<string>();
    const spy = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = `#${(entry.target as HTMLElement).id}`;
          if (entry.isIntersecting) visible.add(id);
          else visible.delete(id);
        }
        setActive(SPY_IDS.filter((id) => visible.has(id)).pop() ?? null);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((section) => spy.observe(section));
    return () => spy.disconnect();
  }, []);

  const openMenu = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    setPanelClosing(false);
    setOpen(true);
    setPanelMounted(true);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => setPanelShown(true)),
    );
  }, []);

  const closeMenu = useCallback(() => {
    setOpen(false);
    setPanelShown(false);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setPanelMounted(false);
      return;
    }
    setPanelClosing(true);
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => {
      setPanelMounted(false);
      setPanelClosing(false);
    }, 200);
  }, []);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  const toggleMenu = useCallback(() => {
    if (open) closeMenu();
    else openMenu();
  }, [open, closeMenu, openMenu]);

  return (
    <header className="nav" data-scrolled={scrolled ? "" : undefined}>
      <div className="container nav__inner">
        <a className="wordmark" href={nav.wordmarkHref}>
          {nav.wordmark}
        </a>

        <nav aria-label={nav.navLabel} className="nav__primary">
          <ul className="nav__links" ref={linksRef}>
            {nav.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={active === link.href ? "true" : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <span
            className="nav__bar"
            aria-hidden="true"
            data-on={bar ? "true" : "false"}
            style={
              bar
                ? { transform: `translateX(${bar.x}px) scaleX(${bar.w})` }
                : undefined
            }
          />
        </nav>

        <div className="lang" role="group" aria-label={nav.langGroupLabel}>
          {nav.languages.map((option, index) => (
            <Fragment key={option.code}>
              {index > 0 ? (
                <span className="lang__sep" aria-hidden="true">
                  /
                </span>
              ) : null}
              <button
                type="button"
                lang={option.code.toLowerCase()}
                aria-pressed={language === option.code}
                onClick={() => setLanguage(option.code)}
              >
                {option.code}
              </button>
            </Fragment>
          ))}
        </div>

        <a className="btn btn--ghost nav__cv" href={urls.cv} download>
          <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path d="M8 2v8m0 0L5 7m3 3l3-3M3 13h10" />
          </svg>
          {nav.cv}
        </a>

        <button
          className="menu-btn"
          type="button"
          aria-expanded={open}
          aria-controls={PANEL_ID}
          aria-label={open ? nav.menuClose : nav.menuOpen}
          onClick={toggleMenu}
        >
          <svg
            viewBox="0 0 18 18"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path d="M2 5h14M2 9h14M2 13h14" />
          </svg>
        </button>
      </div>

      <div
        className="menu-panel"
        id={PANEL_ID}
        hidden={!panelMounted}
        data-open={panelShown ? "true" : "false"}
        data-closing={panelClosing ? "true" : "false"}
      >
        <div className="container">
          <ul className="menu-panel__links">
            {nav.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={active === link.href ? "true" : undefined}
                  onClick={closeMenu}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a className="btn btn--ghost" href={urls.cv} download onClick={closeMenu}>
            {nav.cvDownload}
          </a>
        </div>
      </div>
    </header>
  );
}
