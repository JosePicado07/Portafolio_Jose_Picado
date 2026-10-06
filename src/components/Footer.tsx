import LangToggle from "./LangToggle";
import type { Dictionary, Lang } from "@/content/en";

export default function Footer({ dict, lang }: { dict: Dictionary; lang: Lang }) {
  const { footer, nav, aria } = dict;
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__inner">
          <nav className="footer__links" aria-label={aria.footerLinks}>
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
          <LangToggle
            lang={lang}
            languages={nav.languages}
            groupLabel={nav.langGroupLabel}
          />
          <p className="footer__meta">{footer.meta}</p>
        </div>
      </div>
    </footer>
  );
}
