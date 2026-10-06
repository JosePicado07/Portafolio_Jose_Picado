"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import type { Dictionary } from "@/content/en";

type FieldName = "name" | "email" | "message";

interface FormState {
  value: string;
  error: string;
  touched: boolean;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type FormErrors = Dictionary["contactForm"]["errors"];

function validateFieldValue(name: FieldName, value: string, errors: FormErrors): string {
  const trimmed = value.trim();
  switch (name) {
    case "name":
      if (!trimmed) return errors.nameRequired;
      if (trimmed.length < 2) return errors.nameShort;
      if (trimmed.length > 80) return errors.nameLong;
      return "";
    case "email":
      if (!trimmed) return errors.emailRequired;
      if (!EMAIL_REGEX.test(trimmed)) return errors.emailInvalid;
      return "";
    case "message":
      if (!trimmed) return errors.messageRequired;
      if (trimmed.length < 10) return errors.messageShort;
      if (trimmed.length > 1000) return errors.messageLong;
      return "";
  }
}

export default function ContactForm({ form }: { form: Dictionary["contactForm"] }) {
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

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name as FieldName;
    const error = validateFieldValue(name, e.target.value, form.errors);
    setFields((prev) => ({
      ...prev,
      [name]: { ...prev[name], touched: true, error },
    }));
  }, [form.errors]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name as FieldName;
    const value = e.target.value;
    setFields((prev) => ({
      ...prev,
      [name]: { ...prev[name], value },
    }));
    if (fields[name].touched) {
      const error = validateFieldValue(name, value, form.errors);
      setFields((prev) => ({
        ...prev,
        [name]: { ...prev[name], error },
      }));
    }
  }, [fields, form.errors]);

  const statusRef = useRef<HTMLDivElement>(null);
  const companyRef = useRef<HTMLInputElement>(null);
  const mountedAt = useRef(0);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submittingRef.current) return;

    const errors: Record<FieldName, string> = {
      name: validateFieldValue("name", fields.name.value, form.errors),
      email: validateFieldValue("email", fields.email.value, form.errors),
      message: validateFieldValue("message", fields.message.value, form.errors),
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

    if (
      (companyRef.current?.value ?? "") !== "" ||
      Date.now() - mountedAt.current < 3000
    ) {
      setFields({
        name: { value: "", error: "", touched: false },
        email: { value: "", error: "", touched: false },
        message: { value: "", error: "", touched: false },
      });
      setStatus("success");
      statusRef.current?.focus({ preventScroll: true });
      submittingRef.current = false;
      return;
    }

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
      statusRef.current?.focus({ preventScroll: true });
    } catch (err) {
      console.error("EmailJS send failed:", err);
      setStatus("error");
      statusRef.current?.focus({ preventScroll: true });
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
      <h3 className="form__title">{form.title}</h3>

      <div className="field">
        <label htmlFor="name" className="field__label">
          {form.labels.name}
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
          {form.labels.email}
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
          {form.labels.message}
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

      <div className="field field--hp" aria-hidden="true">
        <label htmlFor="company" className="field__label">
          {form.honeypotLabel}
        </label>
        <input
          ref={companyRef}
          id="company"
          name="company"
          type="text"
          autoComplete="off"
          tabIndex={-1}
          className="field__input"
        />
      </div>

      <div className="form__footer">
        <button
          type="submit"
          className="btn btn--ghost btn--submit"
          aria-disabled={status === "sending"}
          aria-busy={status === "sending"}
        >
          {status === "sending" ? form.submitting : form.submit}
        </button>
        <div
          className="form__status"
          role="status"
          aria-live="polite"
          aria-atomic="true"
          tabIndex={-1}
          ref={statusRef}
        >
          {status === "success" && <span className="form__status--success">{form.success}</span>}
          {status === "error" && <span className="form__status--error">{form.sendError}</span>}
          {status === "sending" && <span className="form__status--sending">{form.submitting}</span>}
        </div>
      </div>
    </form>
  );
}