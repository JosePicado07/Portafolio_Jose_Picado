"use client";

import { Fragment, useEffect, useState } from "react";
import { nav, urls } from "@/content/en";

const HAIRLINE_AFTER_PX = 8;
const PANEL_ID = "nav-disclosure";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState("EN");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > HAIRLINE_AFTER_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closePanel = () => setOpen(false);

  return (
    <header className="nav" data-scrolled={scrolled ? "" : undefined}>
      <div className="container nav__inner">
        <a className="wordmark" href={nav.wordmarkHref}>
          {nav.wordmark}
        </a>

        <nav aria-label={nav.navLabel} className="nav__primary">
          <ul className="nav__links">
            {nav.links.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
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
          onClick={() => setOpen((value) => !value)}
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

      <div className="menu-panel" id={PANEL_ID} hidden={!open}>
        <div className="container">
          <ul className="menu-panel__links">
            {nav.links.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={closePanel}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a className="btn btn--ghost" href={urls.cv} download onClick={closePanel}>
            {nav.cvDownload}
          </a>
        </div>
      </div>
    </header>
  );
}