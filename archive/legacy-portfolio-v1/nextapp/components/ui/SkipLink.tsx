"use client";

export function SkipLink() {
  return (
    <>
      <a
        href="#main"
        className="skip-link"
        style={{
          position: "fixed",
          top: "-100px",
          left: "1rem",
          zIndex: 9999,
          padding: "0.5rem 1rem",
          backgroundColor: "var(--brand)",
          color: "#fff",
          borderRadius: "4px",
          fontFamily: "var(--font-body)",
          fontWeight: 600,
          fontSize: "0.875rem",
          textDecoration: "none",
          transition: "top 0.15s ease",
        }}
        onFocus={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.top = "1rem";
        }}
        onBlur={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.top = "-100px";
        }}
      >
        Skip to main content
      </a>
    </>
  );
}
