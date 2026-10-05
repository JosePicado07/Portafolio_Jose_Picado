"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { fadeUp, slideLeft, slideRight, staggerContainer } from "@/lib/animations";

const DOSSIER_ROWS = [
  { labelKey: "dossier-role-label" as const, valueKey: "dossier-role" as const },
  { labelKey: "dossier-exp-label" as const, valueKey: "dossier-exp" as const },
  { labelKey: "dossier-company-label" as const, value: "Workday" },
  { labelKey: "dossier-location-label" as const, valueKey: "dossier-location" as const },
  { labelKey: "dossier-background-label" as const, valueKey: "dossier-background" as const },
  { labelKey: "dossier-approach-label" as const, valueKey: "dossier-approach" as const },
] as const;

const HIGHLIGHT_ROW = {
  labelKey: "dossier-achievement-label" as const,
  valueKey: "dossier-achievement" as const,
};

export function About() {
  const { t } = useLanguage();

  return (
    <section
      id="about"
      style={{
        backgroundColor: "var(--bg-elevated)",
        padding: "6rem 1.5rem",
        borderTop: "1px solid var(--border-subtle)",
      }}
    >
      <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "4rem",
          }}
          className="lg:grid-cols-[280px_1fr]"
        >
          {/* Left: section label */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6875rem",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--brand)",
                display: "block",
                marginBottom: "0.75rem",
              }}
            >
              01
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(2rem, 4vw, 3rem)",
                letterSpacing: "-0.04em",
                color: "var(--ink)",
                lineHeight: 1,
                marginBottom: "1rem",
              }}
            >
              {t("about-title")}
            </h2>
            <div
              style={{
                width: "2rem",
                height: "2px",
                backgroundColor: "var(--accent)",
                marginBottom: "1.25rem",
              }}
            />
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "var(--ink-muted)",
                letterSpacing: "0.01em",
              }}
            >
              {t("about-sub")}
            </p>
          </motion.div>

          {/* Right: content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {/* Manifesto */}
            <motion.p
              variants={fadeUp}
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(1.125rem, 2.5vw, 1.5rem)",
                letterSpacing: "-0.025em",
                color: "var(--ink)",
                lineHeight: 1.45,
                marginBottom: "2.5rem",
                paddingLeft: "1.25rem",
                borderLeft: "3px solid var(--accent)",
              }}
            >
              {t("about-manifesto")}
            </motion.p>

            {/* Dossier table */}
            <motion.dl variants={fadeUp}>
              {DOSSIER_ROWS.map(({ labelKey, ...row }) => (
                <div
                  key={labelKey}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "140px 1fr",
                    gap: "1rem",
                    padding: "1rem 0",
                    borderBottom: "1px solid var(--border-subtle)",
                    alignItems: "start",
                  }}
                >
                  <dt
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6875rem",
                      fontWeight: 600,
                      letterSpacing: "0.10em",
                      textTransform: "uppercase",
                      color: "var(--ink-muted)",
                      paddingTop: "0.125rem",
                    }}
                  >
                    {t(labelKey)}
                  </dt>
                  <dd
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.9375rem",
                      fontWeight: 500,
                      color: "var(--ink)",
                      margin: 0,
                    }}
                  >
                    {"value" in row ? row.value : t(row.valueKey)}
                  </dd>
                </div>
              ))}

              {/* Achievement highlight */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "140px 1fr",
                  gap: "1rem",
                  padding: "1rem 0.75rem",
                  backgroundColor: "var(--bg-card)",
                  borderRadius: "8px",
                  marginTop: "0.5rem",
                  border: "1px solid var(--border-subtle)",
                  alignItems: "start",
                }}
              >
                <dt
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6875rem",
                    fontWeight: 600,
                    letterSpacing: "0.10em",
                    textTransform: "uppercase",
                    color: "var(--accent)",
                    paddingTop: "0.125rem",
                  }}
                >
                  {t(HIGHLIGHT_ROW.labelKey)}
                </dt>
                <dd
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.9375rem",
                    fontWeight: 600,
                    color: "var(--ink)",
                    margin: 0,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {t(HIGHLIGHT_ROW.valueKey)}
                </dd>
              </div>
            </motion.dl>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
