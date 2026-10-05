"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { fadeUp, staggerContainer, expandDown } from "@/lib/animations";
import type { TranslationKey } from "@/lib/translations";

interface Project {
  id: number;
  image: string;
  titleKey: TranslationKey;
  descKey: TranslationKey;
  statusKey: TranslationKey;
  value1Key: TranslationKey;
  impact1Key: TranslationKey;
  value2Key: TranslationKey;
  impact2Key: TranslationKey;
  github?: string;
  typeKey: TranslationKey;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    image: "/Portaflio_Jose_Picado/images/audit.png",
    titleKey: "project1-title",
    descKey: "project1-desc",
    statusKey: "project1-status",
    value1Key: "project1-value1",
    impact1Key: "project1-impact1",
    value2Key: "project1-value2",
    impact2Key: "project1-impact2",
    typeKey: "project-confidential",
  },
  {
    id: 2,
    image: "/Portaflio_Jose_Picado/images/ETL_POWER_BI.png",
    titleKey: "project2-title",
    descKey: "project2-desc",
    statusKey: "project2-status",
    value1Key: "project2-value1",
    impact1Key: "project2-impact1",
    value2Key: "project2-value2",
    impact2Key: "project2-impact2",
    typeKey: "project-confidential",
  },
  {
    id: 3,
    image: "/Portaflio_Jose_Picado/images/truncation.png",
    titleKey: "project3-title",
    descKey: "project3-desc",
    statusKey: "project3-status",
    value1Key: "project3-value1",
    impact1Key: "project3-impact1",
    value2Key: "project3-value2",
    impact2Key: "project3-impact2",
    github: "https://github.com/josepicado07",
    typeKey: "project-confidential",
  },
  {
    id: 4,
    image: "/Portaflio_Jose_Picado/images/ETL_Databricks.png",
    titleKey: "project4-title",
    descKey: "project4-desc",
    statusKey: "project4-status",
    value1Key: "project4-value1",
    impact1Key: "project4-impact1",
    value2Key: "project4-value2",
    impact2Key: "project4-impact2",
    github: "https://github.com/josepicado07",
    typeKey: "project-academic",
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <motion.article
      variants={fadeUp}
      style={{
        border: "1px solid var(--border-subtle)",
        borderRadius: "12px",
        backgroundColor: "var(--bg-card)",
        overflow: "hidden",
        transition: "border-color 0.2s ease, box-shadow 0.2s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border-color)";
        (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-md)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border-subtle)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {/* Header row — always visible */}
      <div
        onClick={() => setOpen((v) => !v)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          padding: "1.25rem 1.5rem",
        }}
      >
        {/* Index */}
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "var(--ink-muted)",
            minWidth: "28px",
            letterSpacing: "0.05em",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Title */}
        <h3
          style={{
            flex: 1,
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            letterSpacing: "-0.025em",
            color: "var(--ink)",
            margin: 0,
          }}
        >
          {t(project.titleKey)}
        </h3>

        {/* Metrics (hide on very small) */}
        <div
          className="hidden sm:flex"
          style={{ gap: "1.5rem", alignItems: "center", flexShrink: 0 }}
        >
          <div style={{ textAlign: "right" }}>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontWeight: 700,
                fontSize: "1.125rem",
                color: "var(--ink)",
                letterSpacing: "-0.03em",
                fontVariantNumeric: "tabular-nums",
                lineHeight: 1,
              }}
            >
              {t(project.value1Key)}
            </p>
            <p style={{ fontSize: "0.6875rem", color: "var(--ink-muted)", fontWeight: 500 }}>
              {t(project.impact1Key)}
            </p>
          </div>
          <div style={{ width: "1px", height: "32px", backgroundColor: "var(--border-subtle)" }} />
          <div style={{ textAlign: "right" }}>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontWeight: 700,
                fontSize: "1.125rem",
                color: "var(--ink)",
                letterSpacing: "-0.03em",
                fontVariantNumeric: "tabular-nums",
                lineHeight: 1,
              }}
            >
              {t(project.value2Key)}
            </p>
            <p style={{ fontSize: "0.6875rem", color: "var(--ink-muted)", fontWeight: 500 }}>
              {t(project.impact2Key)}
            </p>
          </div>
        </div>

        {/* Expand chevron */}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          style={{
            display: "flex",
            flexShrink: 0,
            color: "var(--ink-muted)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M4 6l4 4 4-4" />
          </svg>
        </motion.span>
      </div>

      {/* Expandable content */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            variants={expandDown}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ overflow: "hidden" }}
          >
            <div
              style={{
                borderTop: "1px solid var(--border-subtle)",
                padding: "1.5rem",
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "1.5rem",
              }}
              className="md:grid-cols-[1fr_260px]"
            >
              {/* Description + meta */}
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.9375rem",
                    lineHeight: 1.65,
                    color: "var(--ink-dim)",
                    marginBottom: "1.25rem",
                  }}
                >
                  {t(project.descKey)}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.625rem", alignItems: "center" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6875rem",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      color: "var(--brand)",
                      padding: "0.25rem 0.625rem",
                      border: "1px solid var(--brand)",
                      borderRadius: "4px",
                      opacity: 0.8,
                    }}
                  >
                    {t(project.statusKey)}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6875rem",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      color: "var(--ink-muted)",
                      padding: "0.25rem 0.625rem",
                      border: "1px solid var(--border-color)",
                      borderRadius: "4px",
                    }}
                  >
                    {t(project.typeKey)}
                  </span>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.375rem",
                        fontFamily: "var(--font-body)",
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: "var(--brand)",
                        textDecoration: "none",
                        transition: "color 0.15s ease",
                      }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--brand-hover)")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--brand)")}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                      </svg>
                      {t("project-view-code")}
                    </a>
                  )}
                </div>
              </div>

              {/* Image */}
              <div
                style={{
                  borderRadius: "8px",
                  overflow: "hidden",
                  aspectRatio: "16/9",
                  position: "relative",
                  backgroundColor: "var(--bg-elevated)",
                }}
              >
                <Image
                  src={project.image}
                  alt={t(project.titleKey)}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 260px"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

export function Projects() {
  const { t } = useLanguage();

  return (
    <section
      id="projects"
      style={{ padding: "6rem 1.5rem", backgroundColor: "var(--bg-base)" }}
    >
      <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
        {/* Section header */}
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
            02
          </span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              letterSpacing: "-0.04em",
              color: "var(--ink)",
              lineHeight: 1,
              marginBottom: "0.75rem",
            }}
          >
            {t("projects-title")}
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1rem",
              color: "var(--ink-muted)",
              fontWeight: 500,
            }}
          >
            {t("projects-subtitle")}
          </p>
        </motion.div>

        {/* Project list */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
        >
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
