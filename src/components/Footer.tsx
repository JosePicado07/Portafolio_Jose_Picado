"use client";

import { footer, nav } from "@/content/en";
import { useState } from "react";

export default function Footer() {
  const [language, setLanguage] = useState("EN");

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__inner">
          <nav className="footer__links" aria-label="Footer links">
            {footer.links.map((link) => (
              <a
                key={link.label}
                className="footer__link"
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="footer__lang" role="group" aria-label={nav.langGroupLabel}>
            {nav.languages.map((option, index) => (
              <span key={option.code}>
                {index > 0 ? (
                  <span className="lang__sep" aria-hidden="true">/</span>
                ) : null}
                <button
                  type="button"
                  lang={option.code.toLowerCase()}
                  aria-pressed={language === option.code}
                  onClick={() => setLanguage(option.code)}
                  className="footer__lang-btn"
                >
                  {option.code}
                </button>
              </span>
            ))}
          </div>
          <p className="footer__meta">{footer.meta}</p>
        </div>
      </div>
    </footer>
  );
}