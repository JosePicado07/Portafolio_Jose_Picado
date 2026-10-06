"use client";

import { Fragment } from "react";
import type { Dictionary, Lang } from "@/content/en";

export default function LangToggle({
  lang,
  languages,
  groupLabel,
  className,
}: {
  lang: Lang;
  languages: Dictionary["nav"]["languages"];
  groupLabel: string;
  className?: string;
}) {
  const onClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const hash = window.location.hash;
    if (!hash) return;
    const href = event.currentTarget.getAttribute("href");
    if (href && !href.includes("#")) event.currentTarget.href = href + hash;
  };

  return (
    <div className={className ?? "lang"} role="group" aria-label={groupLabel}>
      {languages.map((option, index) => (
        <Fragment key={option.code}>
          {index > 0 ? (
            <span className="lang__sep" aria-hidden="true">
              /
            </span>
          ) : null}
          <a
            href={option.code === "EN" ? "/" : "/es"}
            hrefLang={option.code.toLowerCase()}
            lang={option.code.toLowerCase()}
            aria-current={option.code.toLowerCase() === lang ? "true" : undefined}
            onClick={onClick}
          >
            {option.code}
          </a>
        </Fragment>
      ))}
    </div>
  );
}
