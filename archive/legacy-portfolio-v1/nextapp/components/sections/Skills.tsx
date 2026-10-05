"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { fadeUp, staggerContainer } from "@/lib/animations";
import type { TranslationKey } from "@/lib/translations";

interface SkillRow {
  number: string;
  categoryKey: TranslationKey;
  descEs: string;
  descEn: string;
  pills: { label: string; core: boolean; title?: string }[];
}

const SKILLS: SkillRow[] = [
  {
    number: "01",
    categoryKey: "skills-cat1",
    descEs: "Stored procedures · Validation · Automation",
    descEn: "Stored procedures · Validation · Automation",
    pills: [
      { label: "Python 3.8+", core: true },
      { label: "SQL / PL-SQL", core: true },
      { label: "Java", core: false },
    ],
  },
  {
    number: "02",
    categoryKey: "skills-cat2",
    descEs: "Pipelines de producción · 500K+ registros procesados",
    descEn: "Production pipelines · 500K+ records processed",
    pills: [
      { label: "ETL Pipelines", core: true },
      { label: "Apache Spark", core: true },
      { label: "Pandas / Polars / DuckDB", core: false },
      { label: "Data Quality", core: false },
    ],
  },
  {
    number: "03",
    categoryKey: "skills-cat3",
    descEs: "Sistemas escalables para datos empresariales",
    descEn: "Scalable systems built for enterprise data",
    pills: [
      { label: "System Design", core: true, title: "Designing scalable, reliable systems" },
      { label: "API Integration", core: true, title: "Building REST and custom APIs" },
      { label: "DDD Patterns", core: false, title: "Domain-Driven Design" },
      { label: "Scalability", core: false },
    ],
  },
  {
    number: "04",
    categoryKey: "skills-cat4",
    descEs: "HCM · Benefits · Payroll · Learning · DTS",
    descEn: "HCM · Benefits · Payroll · Learning · DTS",
    pills: [
      { label: "Data Conversion", core: true, title: "Moving enterprise data into Workday" },
      { label: "EIB / iLoad", core: true, title: "Enterprise Interface Builder & batch loading" },
      { label: "Workday Studio", core: false },
      { label: "Core Connectors", core: false },
    ],
  },
];

export function Skills() {
  const { t, lang } = useLanguage();

  return (
    <section
      id="skills"
      style={{
        padding: "6rem 1.5rem",
        backgroundColor: "var(--bg-elevated)",
        borderTop: "1px solid var(--border-subtle)",
      }}
    >
      <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          style={{ marginBottom: "3rem" }}
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
            03
          </span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              letterSpacing: "-0.04em",
              color: "var(--ink)",
              lineHeight: 1,
            }}
          >
            {t("skills-title")}
          </h2>
        </motion.div>

        {/* Skill rows */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {SKILLS.map((skill) => (
            <motion.div
              key={skill.number}
              variants={fadeUp}
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                gap: "1.5rem 2rem",
                padding: "1.75rem 0",
                borderBottom: "1px solid var(--border-subtle)",
                alignItems: "start",
              }}
            >
              {/* Left: meta */}
              <div style={{ minWidth: "200px", maxWidth: "240px" }}>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6875rem",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    color: "var(--ink-muted)",
                    display: "block",
                    marginBottom: "0.375rem",
                  }}
                >
                  {skill.number}
                </span>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "1.125rem",
                    letterSpacing: "-0.02em",
                    color: "var(--ink)",
                    marginBottom: "0.375rem",
                    lineHeight: 1.2,
                  }}
                >
                  {t(skill.categoryKey)}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.8125rem",
                    color: "var(--ink-muted)",
                    fontWeight: 400,
                    lineHeight: 1.5,
                  }}
                >
                  {lang === "es" ? skill.descEs : skill.descEn}
                </p>
              </div>

              {/* Right: pills */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                  alignContent: "flex-start",
                }}
              >
                {skill.pills.map(({ label, core, title }) => (
                  <span
                    key={label}
                    title={title}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.8125rem",
                      fontWeight: core ? 600 : 400,
                      padding: "0.375rem 0.875rem",
                      borderRadius: "100px",
                      border: `1px solid ${core ? "var(--border-color)" : "var(--border-subtle)"}`,
                      backgroundColor: core ? "var(--bg-base)" : "transparent",
                      color: core ? "var(--ink)" : "var(--ink-dim)",
                      cursor: title ? "help" : "default",
                      transition: "border-color 0.15s ease, color 0.15s ease",
                    }}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
