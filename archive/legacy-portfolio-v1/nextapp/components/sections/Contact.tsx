"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { EMAILJS_CONFIG } from "@/lib/emailjs";
import { fadeUp, slideLeft, slideRight, staggerContainer } from "@/lib/animations";

type FormState = "idle" | "submitting" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const CONTACT_INFO = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M2 7l10 7 10-7" />
      </svg>
    ),
    label: "Email",
    value: "jpicado011@gmail.com",
    href: "mailto:jpicado011@gmail.com",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: "Location",
    value: "Costa Rica — Remote",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    label: "LinkedIn",
    value: "José Andrés Picado",
    href: "https://www.linkedin.com/in/josé-andrés-picado-corrales-a10a28173",
  },
];

const inputStyle = {
  width: "100%",
  padding: "0.875rem 1rem",
  backgroundColor: "var(--bg-base)",
  border: "1px solid var(--border-color)",
  borderRadius: "8px",
  fontFamily: "var(--font-body)",
  fontSize: "0.9375rem",
  color: "var(--ink)",
  outline: "none",
  transition: "border-color 0.15s ease, box-shadow 0.15s ease",
  boxSizing: "border-box" as const,
};

const inputFocusStyle = {
  borderColor: "var(--brand)",
  boxShadow: "0 0 0 3px oklch(44% 0.26 255 / 0.12)",
};

const errorStyle = {
  fontFamily: "var(--font-body)",
  fontSize: "0.8125rem",
  color: "oklch(52% 0.20 25)",
  marginTop: "0.375rem",
};

export function Contact() {
  const { t, lang } = useLanguage();
  const [formState, setFormState] = useState<FormState>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setFormState("submitting");
    try {
      emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

      await emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_CONTACT, {
        from_name: data.name,
        from_email: data.email,
        message: data.message,
      });

      try {
        await emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_AUTOREPLY, {
          email: data.email,
          from_name: data.name,
          message: data.message,
        });
      } catch {
        // autoreply failing is non-critical
      }

      setFormState("success");
      reset();
    } catch {
      setFormState("error");
    }
  };

  const isSubmitting = formState === "submitting";

  return (
    <section
      id="contact"
      style={{
        padding: "6rem 1.5rem",
        backgroundColor: "var(--bg-base)",
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
          className="lg:grid-cols-[1fr_1.2fr]"
        >
          {/* Left: info */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={fadeUp}>
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
                04
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  letterSpacing: "-0.04em",
                  color: "var(--ink)",
                  lineHeight: 1,
                  marginBottom: "1.5rem",
                }}
              >
                {t("contact-title")}
              </h2>
            </motion.div>

            <motion.p
              variants={fadeUp}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1.0625rem",
                fontWeight: 600,
                color: "var(--ink)",
                lineHeight: 1.5,
                marginBottom: "1rem",
              }}
            >
              {t("contact-heading")}
            </motion.p>

            <motion.p
              variants={fadeUp}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.875rem",
                color: "var(--ink-muted)",
                lineHeight: 1.6,
                marginBottom: "2rem",
              }}
            >
              {t("contact-available-text")}
            </motion.p>

            {/* Contact info items */}
            <motion.div variants={staggerContainer} style={{ marginBottom: "2rem" }}>
              {CONTACT_INFO.map(({ icon, label, value, href }) => (
                <motion.div
                  key={label}
                  variants={fadeUp}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.875rem",
                    padding: "0.875rem 0",
                    borderBottom: "1px solid var(--border-subtle)",
                  }}
                >
                  <span style={{ color: "var(--brand)", flexShrink: 0 }}>{icon}</span>
                  <div>
                    <p
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.6875rem",
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                        color: "var(--ink-muted)",
                        marginBottom: "0.1875rem",
                      }}
                    >
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "0.9375rem",
                          fontWeight: 500,
                          color: "var(--brand)",
                          textDecoration: "none",
                          transition: "color 0.15s ease",
                        }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--brand-hover)")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--brand)")}
                      >
                        {value}
                      </a>
                    ) : (
                      <p
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "0.9375rem",
                          fontWeight: 500,
                          color: "var(--ink)",
                        }}
                      >
                        {value}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CV download */}
            <motion.div variants={fadeUp}>
              <a
                href="/Portaflio_Jose_Picado/assets/CV_Jose_Picado_2026.pdf"
                download
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.75rem 1.375rem",
                  border: "1px solid var(--border-color)",
                  borderRadius: "8px",
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: "0.9375rem",
                  color: "var(--ink)",
                  textDecoration: "none",
                  transition: "border-color 0.2s ease, color 0.2s ease, background-color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--brand)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "var(--brand)";
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "var(--bg-card)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border-color)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "var(--ink)";
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M8 2v9M4 8l4 4 4-4M2 14h12" />
                </svg>
                {t("contact-cv")}
              </a>
            </motion.div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <div
              style={{
                backgroundColor: "var(--bg-elevated)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "16px",
                padding: "2rem",
              }}
            >
              {formState === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: "center", padding: "2rem 0" }}
                >
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "50%",
                      backgroundColor: "oklch(46% 0.19 162 / 0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 1.25rem",
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ color: "var(--accent)" }}>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "1.125rem",
                      color: "var(--ink)",
                      letterSpacing: "-0.02em",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {t("form-success")}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    {/* Name */}
                    <div>
                      <input
                        {...register("name", {
                          required: lang === "es" ? "El nombre es requerido" : "Name is required",
                          minLength: { value: 2, message: lang === "es" ? "Mínimo 2 caracteres" : "Minimum 2 characters" },
                          maxLength: { value: 100, message: lang === "es" ? "Máximo 100 caracteres" : "Maximum 100 characters" },
                        })}
                        placeholder={t("form-name")}
                        disabled={isSubmitting}
                        style={inputStyle}
                        onFocus={(e) => Object.assign(e.currentTarget.style, inputFocusStyle)}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = errors.name ? "oklch(52% 0.20 25)" : "var(--border-color)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      />
                      {errors.name && <p style={errorStyle}>{errors.name.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <input
                        {...register("email", {
                          required: lang === "es" ? "El email es requerido" : "Email is required",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: lang === "es" ? "Email inválido" : "Invalid email",
                          },
                        })}
                        type="email"
                        placeholder={t("form-email")}
                        disabled={isSubmitting}
                        style={inputStyle}
                        onFocus={(e) => Object.assign(e.currentTarget.style, inputFocusStyle)}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = errors.email ? "oklch(52% 0.20 25)" : "var(--border-color)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      />
                      {errors.email && <p style={errorStyle}>{errors.email.message}</p>}
                    </div>

                    {/* Message */}
                    <div>
                      <textarea
                        {...register("message", {
                          required: lang === "es" ? "El mensaje es requerido" : "Message is required",
                          minLength: { value: 10, message: lang === "es" ? "Mínimo 10 caracteres" : "Minimum 10 characters" },
                          maxLength: { value: 1000, message: lang === "es" ? "Máximo 1000 caracteres" : "Maximum 1000 characters" },
                        })}
                        placeholder={t("form-message")}
                        disabled={isSubmitting}
                        rows={5}
                        style={{ ...inputStyle, resize: "vertical", minHeight: "120px" }}
                        onFocus={(e) => Object.assign(e.currentTarget.style, inputFocusStyle)}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = errors.message ? "oklch(52% 0.20 25)" : "var(--border-color)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      />
                      {errors.message && <p style={errorStyle}>{errors.message.message}</p>}
                    </div>

                    {/* Error message */}
                    {formState === "error" && (
                      <p
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "0.875rem",
                          color: "oklch(52% 0.20 25)",
                          padding: "0.75rem 1rem",
                          backgroundColor: "oklch(52% 0.20 25 / 0.08)",
                          borderRadius: "8px",
                          border: "1px solid oklch(52% 0.20 25 / 0.2)",
                        }}
                      >
                        {t("form-error")}
                      </p>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      style={{
                        padding: "0.875rem 1.5rem",
                        backgroundColor: isSubmitting ? "var(--ink-muted)" : "var(--brand)",
                        color: "#fff",
                        fontFamily: "var(--font-body)",
                        fontWeight: 600,
                        fontSize: "0.9375rem",
                        borderRadius: "8px",
                        border: "none",
                        cursor: isSubmitting ? "not-allowed" : "pointer",
                        transition: "background-color 0.2s ease, transform 0.15s ease",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.5rem",
                      }}
                      onMouseEnter={(e) => {
                        if (!isSubmitting)
                          (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--brand-hover)";
                      }}
                      onMouseLeave={(e) => {
                        if (!isSubmitting)
                          (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--brand)";
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            style={{ animation: "spin 0.8s linear infinite" }}
                          >
                            <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity="0.3" />
                            <path d="M12 3a9 9 0 019 9" />
                          </svg>
                          {t("form-sending")}
                        </>
                      ) : formState === "error" ? (
                        t("form-retry")
                      ) : (
                        t("form-submit")
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
}
