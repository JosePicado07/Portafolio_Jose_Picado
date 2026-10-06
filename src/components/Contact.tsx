import type { CSSProperties } from "react";
import type { Dictionary } from "@/content/en";
import ContactForm from "./ContactForm";

export default function Contact({ dict }: { dict: Dictionary }) {
  const { contactSection, urls, aria } = dict;
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <div className="contact__grid">
          <div className="contact__copy">
            <header className="contact__header">
              <p className="label contact__label" data-reveal style={{ "--i": 0 } as CSSProperties}>
                {contactSection.label}
              </p>
              <h2 className="contact__heading" id="contact-title" data-reveal style={{ "--i": 1 } as CSSProperties}>
                {contactSection.heading}
              </h2>
              <p className="contact__lead">{contactSection.lead}</p>
            </header>

            <div className="contact__cta-row">
              <a
                className="btn btn--primary btn--lg"
                href={urls.calendar}
                target="_blank"
                rel="noopener noreferrer"
              >
                {contactSection.cta}
              </a>
            </div>

            <ul className="channels" aria-label={aria.contactChannels}>
              {contactSection.channels.map((channel) => (
                <li key={channel.label} className="channel">
                  <span className="channel__label">{channel.label}</span>
                  <a
                    className="channel__link"
                    href={channel.href}
                    target={channel.href.startsWith("http") ? "_blank" : undefined}
                    rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    download={("download" in channel && channel.download) ? true : undefined}
                  >
                    {channel.link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <ContactForm form={dict.contactForm} />
        </div>
      </div>
    </section>
  );
}