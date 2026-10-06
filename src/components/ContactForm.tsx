"use client";

import { useState, useRef, useCallback } from "react";
import { contactForm } from "@/content/en";

type FieldName = "name" | "email" | "message";

interface FormState {
  value: string;
  error: string;
  touched: boolean;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function ContactForm() {
  const [fields, setFields] = useState<Record<FieldName, FormState>>({
    name: { value: "", error: "", touched: false },
    email: { value: "", error: "", touched: false },
    message: { value: "", error: "", touched: false },
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const submittingRef = useRef(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const validateField = useCallback((name: FieldName, value: string): string => {
    const trimmed = value.trim();
    switch (name) {
      case "name":
        if (!trimmed) return contactForm.errors.nameRequired;
        if (trimmed.length < 2) return contactForm.errors.nameShort;
        if (trimmed.length > 80) return contactForm.errors.nameLong;
        return "";
      case "email":
        if (!trimmed) return contactForm.errors.emailRequired;
        if (!EMAIL_REGEX.test(trimmed)) return contactForm.errors.emailInvalid;
        return "";
      case "message":
        if (!trimmed) return contactForm.errors.messageRequired;
        if (trimmed.length < 10) return contactForm.errors.messageShort;
        if (trimmed.length > 1000) return contactForm.errors.messageLong;
        return "";
    }
  }, []);

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name as FieldName;
    const error = validateField(name, e.target.value);
    setFields((prev) => ({
      ...prev,
      [name]: { ...prev[name], touched: true, error },
    }));
  }, [validateField]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name as FieldName;
    const value = e.target.value;
    setFields((prev) => ({
      ...prev,
      [name]: { ...prev[name], value },
    }));
    if (fields[name].touched) {
      const error = validateField(name, value);
      setFields((prev) => ({
        ...prev,
        [name]: { ...prev[name], error },
      }));
    }
  }, [fields, validateField]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors: Record<FieldName, string> = {
      name: validateField("name", fields.name.value),
      email: validateField("email", fields.email.value),
      message: validateField("message", fields.message.value),
    };

    const hasErrors = Object.values(errors).some((e) => e);
    setFields((prev) => ({
      name: { ...prev.name, touched: true, error: errors.name },
      email: { ...prev.email, touched: true, error: errors.email },
      message: { ...prev.message, touched: true, error: errors.message },
    }));

    if (hasErrors) {
      if (errors.name) nameRef.current?.focus();
      else if (errors.email) emailRef.current?.focus();
      else if (errors.message) messageRef.current?.focus();
      return;
    }

    submittingRef.current = true;
    setStatus("sending");

    try {
      const [emailjs, config] = await Promise.all([
        import("@emailjs/browser"),
        import("@/lib/email-config"),
      ]);

      const { PUBLIC_KEY, SERVICE_ID, TEMPLATE_CONTACT, TEMPLATE_AUTOREPLY } = config;

      if (!PUBLIC_KEY || !SERVICE_ID || !TEMPLATE_CONTACT || !TEMPLATE_AUTOREPLY) {
        console.warn("EmailJS config missing:", { PUBLIC_KEY: !!PUBLIC_KEY, SERVICE_ID: !!SERVICE_ID, TEMPLATE_CONTACT: !!TEMPLATE_CONTACT, TEMPLATE_AUTOREPLY: !!TEMPLATE_AUTOREPLY });
        throw new Error("Missing EmailJS configuration");
      }

      const templateParams = {
        from_name: fields.name.value.trim(),
        from_email: fields.email.value.trim(),
        message: fields.message.value.trim(),
      };

      await emailjs.send(SERVICE_ID, TEMPLATE_CONTACT, templateParams, { publicKey: PUBLIC_KEY });

      try {
        await emailjs.send(SERVICE_ID, TEMPLATE_AUTOREPLY, {
          email: fields.email.value.trim(),
          from_name: fields.name.value.trim(),
          message: fields.message.value.trim(),
        }, { publicKey: PUBLIC_KEY });
      } catch (autoreplyErr) {
        console.warn("Auto-reply failed:", autoreplyErr);
      }

      setFields({
        name: { value: "", error: "", touched: false },
        email: { value: "", error: "", touched: false },
        message: { value: "", error: "", touched: false },
      });
      setStatus("success");
    } catch (err) {
      console.error("EmailJS send failed:", err);
      setStatus("error");
    } finally {
      submittingRef.current = false;
    }
  };

  const getFieldProps = (name: FieldName) => ({
    name,
    value: fields[name].value,
    onChange: handleChange,
    onBlur: handleBlur,
    "aria-invalid": fields[name].touched && !!fields[name].error,
    "aria-describedby": `${name}-error ${name === "message" ? "message-counter" : ""}`.trim(),
  });

  return (
    <form id="contact-form" className="form" noValidate onSubmit={handleSubmit}>
      <h3 className="form__title">{contactForm.title}</h3>

      <div className="field">
        <label htmlFor="name" className="field__label">
          {contactForm.labels.name}
        </label>
        <input
          ref={nameRef}
          id="name"
          type="text"
          autoComplete="name"
          className="field__input"
          {...getFieldProps("name")}
        />
        <span
          id="name-error"
          className="field__error"
          role="alert"
          aria-live="polite"
          data-empty={!(fields.name.touched && fields.name.error)}
        >
          {fields.name.touched && fields.name.error ? fields.name.error : "\u00A0"}
        </span>
      </div>

      <div className="field">
        <label htmlFor="email" className="field__label">
          {contactForm.labels.email}
        </label>
        <input
          ref={emailRef}
          id="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          className="field__input"
          {...getFieldProps("email")}
        />
        <span
          id="email-error"
          className="field__error"
          role="alert"
          aria-live="polite"
          data-empty={!(fields.email.touched && fields.email.error)}
        >
          {fields.email.touched && fields.email.error ? fields.email.error : "\u00A0"}
        </span>
      </div>

      <div className="field">
        <label htmlFor="message" className="field__label">
          {contactForm.labels.message}
        </label>
        <textarea
          ref={messageRef}
          id="message"
          rows={5}
          className="field__input"
          {...getFieldProps("message")}
        />
        <div className="field__meta">
          <span
            id="message-error"
            className="field__error"
            role="alert"
            aria-live="polite"
            data-empty={!(fields.message.touched && fields.message.error)}
          >
            {fields.message.touched && fields.message.error ? fields.message.error : "\u00A0"}
          </span>
          <span id="message-counter" className="counter">
            {fields.message.value.length} / 1000
          </span>
        </div>
      </div>

      <div className="form__footer">
        <button
          type="submit"
          className="btn btn--ghost btn--submit"
          disabled={status === "sending"}
          aria-disabled={status === "sending"}
          aria-busy={status === "sending"}
        >
          {status === "sending" ? contactForm.submitting : contactForm.submit}
        </button>
        <div className="form__status" role="status" aria-live="polite" aria-atomic="true">
          {status === "success" && <span className="form__status--success">{contactForm.success}</span>}
          {status === "error" && <span className="form__status--error">{contactForm.sendError}</span>}
          {status === "sending" && <span className="form__status--sending">{contactForm.submitting}</span>}
        </div>
      </div>
    </form>
  );
}