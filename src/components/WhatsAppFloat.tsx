"use client";

import { useEffect, useState } from "react";

export default function WhatsAppFloat({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const contactSection = document.getElementById("contact");
    if (!contactSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHidden(entry.isIntersecting && entry.intersectionRatio >= 0.2);
      },
      { root: null, threshold: [0, 0.2, 1] },
    );

    observer.observe(contactSection);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      className={`wa-float${hidden ? " wa-float--hidden" : ""}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" aria-hidden="true">
        <path d="M4 20l1.3-3.9A8 8 0 1 1 8 18.8L4 20z"/>
        <path d="M9 9.5c.3 2.2 2.3 4.2 4.5 4.5l1.2-1.2 1.8.8v1.4c-3.8.4-8.4-4.2-8-8h1.4l.8 1.8L9.5 9z" strokeWidth={1.2}/>
      </svg>
    </a>
  );
}
