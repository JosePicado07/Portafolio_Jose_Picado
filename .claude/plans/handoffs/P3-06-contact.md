# P3-06 · Contact + footer + floating WhatsApp

**Status:** PARTIAL 2026-10-05. Build, budget, copy, secrets, signal and missing-env handling pass. The focus bug, corrupt WhatsApp SVG, missing footer toggle, invented placeholders and styling drift are re-handed off as `P3-06b-contact-fix.md`.
**Reference variant:** `.claude/design-variants/07-contact/index.html`. Written 2026-10-05 and handed off without a sandbox test pass, per José. The R-checks below cover that in the real build.
**Design contract change:** DESIGN.md gained an `error` token (oklch(0.72 0.14 25) ≈ #F07F77, 7.5:1 on field), for validation messages only.
**Open item, defaulted:** no reply-time promise. The legacy site said "within 24h"; it's left out until José confirms.

---

## Handoff (paste everything inside the fence)

```
TASK: P3-06 Build Contact (calendar + EmailJS form + channels), the footer, and the floating WhatsApp button

CONTEXT: About passed grading. Contact is the last content section. The
reference is .claude/design-variants/07-contact/index.html (plain HTML/CSS/JS).
Port its look, markup and validation behavior. DESIGN.md and PRODUCT.md are
the contract: read them first, and note the NEW `error` token in DESIGN.md.
COPY RULE: copy every string below character for character.

FILES:
- src/app/globals.css: add `--color-error: oklch(0.72 0.14 25);` to @theme,
  and port the .contact / .channels / .form / .field / .footer / .wa-float
  rules and their breakpoints. Reuse the existing .btn, .btn--primary,
  .btn--ghost, .label and .lang styles. Don't duplicate them.
- src/content/en.ts: add `contactSection`, `contactForm` and `footer` exports
  (EXACT COPY below). Add to `urls`: email, whatsapp, linkedin, github.
- src/components/Contact.tsx (server): the section shell, heading, lead, the
  calendar CTA and the channels list. It renders <ContactForm />.
- src/components/ContactForm.tsx ("use client"): the form, validation, and
  EmailJS send.
- src/components/Footer.tsx (server, except that the EN/ES group can reuse
  the Nav's client language control if one exists. Otherwise render the same
  markup, visual only, as in Nav).
- src/components/WhatsAppFloat.tsx ("use client"): a fixed button that hides
  while #contact is ≥20% on screen (IntersectionObserver).
- src/app/page.tsx: add <Contact /> after <About /> inside <main>, then
  <Footer /> after </main>, then <WhatsAppFloat />.
- .env.example (NEW, committed): the 4 vars below, with EMPTY values.
- .gitignore: add `!.env.example` under the existing `.env*` line, so the
  example is tracked.

EXACT COPY:
urls (add):
  email:    jpicado011@gmail.com
  whatsapp: https://wa.me/50684756191
  linkedin: https://www.linkedin.com/in/josé-andrés-picado-corrales-a10a28173
  github:   https://github.com/josepicado07
contactSection:
  label:   Contact
  heading: Let's talk about your data.
  lead:    The fastest way is a 30-minute call. If you'd rather write, send a message here or on WhatsApp.
  cta:     Book a 30-minute call            (→ urls.calendar, new tab)
  channels (label · link text · href):
    Email    · jpicado011@gmail.com · mailto:jpicado011@gmail.com
    WhatsApp · +506 8475 6191       · urls.whatsapp (new tab)
    CV       · Download CV (PDF)    · urls.cv (download attribute)
contactForm:
  title: Send a message
  labels: Your name · Your email · What are you working on?
  submit: Send message      sending: Sending…
  success: Message sent. You'll get a confirmation email shortly.
  sendError: Couldn't send the message. Try again, or reach me on WhatsApp.
  errors:
    nameRequired:    Please enter your name.
    nameShort:       Name must be at least 2 characters.
    nameLong:        Name must be 80 characters or fewer.
    emailRequired:   Please enter your email.
    emailInvalid:    That email doesn't look right. Check for typos.
    messageRequired: Please write a short message.
    messageShort:    Message must be at least 10 characters.
    messageLong:     Message must be 1000 characters or fewer.
  counter: "{n} / 1000"
footer:
  links: LinkedIn (urls.linkedin, new tab) · GitHub (urls.github, new tab) · Email (mailto)
  meta:  © 2026 José Picado · Costa Rica
whatsAppFloat:
  ariaLabel: Message José on WhatsApp

FORM BEHAVIOR (match the variant's script):
- The fields are name="from_name", "from_email" and "message", with
  type/autocomplete/inputmode as in the variant. Use noValidate on the
  <form>; validation is ours.
- Rules: name required, 2–80 characters (trimmed); email required, matching
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/; message required, 10–1000 characters
  (trimmed for min).
- Errors appear on blur, then update live on input for touched fields. On
  submit, validate everything and move focus to the first invalid field.
- Each input has aria-invalid and aria-describedby pointing at its error span.
  The message field also points at the counter. The status line is
  role="status" aria-live="polite".
- While sending, the button shows "Sending…", has aria-disabled="true", and
  ignores double submits. On success: show the success copy and reset the
  form and counter. On failure: show sendError in the error color and keep
  what the user typed.
- Send with @emailjs/browser (already installed):
    1) emailjs.send(SERVICE_ID, TEMPLATE_CONTACT,
         { from_name, from_email, message }, { publicKey: PUBLIC_KEY })
    2) then emailjs.send(SERVICE_ID, TEMPLATE_AUTOREPLY,
         { email: from_email, from_name, message }, { publicKey: PUBLIC_KEY })
    Success = call 1 resolved. If call 2 fails, still show success; log it to
    console.warn only.
- Config comes ONLY from env vars:
    NEXT_PUBLIC_EMAILJS_PUBLIC_KEY, NEXT_PUBLIC_EMAILJS_SERVICE_ID,
    NEXT_PUBLIC_EMAILJS_TEMPLATE_CONTACT, NEXT_PUBLIC_EMAILJS_TEMPLATE_AUTOREPLY
  Don't hard-code any key, ID or template, and don't copy anything from the
  archive or the old CLAUDE.md. If any var is missing at runtime, don't call
  EmailJS: show sendError and console.warn which var is missing.
- Load EmailJS on submit (dynamic import inside the submit handler), so it
  isn't in the initial bundle.

ACCEPTANCE:
1. `npm run build` passes with 0 type and lint errors. No new dependencies.
   "/" First Load JS grows by ≤ 4 kB over 105 kB (the form is the only new
   client code; EmailJS loads lazily).
2. Visual match with the variant at 1440, 768 and 390px, with no horizontal
   scroll:
   - ≥1024px: 2 columns, minmax(0,5fr) | minmax(0,6fr), gap 96px.
   - <1024px: 1 column, gap 64px.
   - <768px: section padding-block 64px; the calendar CTA and submit button
     are full width; the footer stacks.
3. Signal discipline: the calendar CTA is the ONLY cta-blue element in
   #contact. The submit button is the ghost style. The floating WhatsApp
   button is neutral (surface-raised, border, text-primary), never blue or
   green. The error color appears only on error text and invalid borders.
4. Validation works exactly as specified. Empty submit shows 3 errors and
   focuses Name. "ana@x" shows emailInvalid. "hi" shows messageShort. A
   valid submit with env vars missing shows sendError and doesn't throw.
5. Semantics: section#contact aria-labelledby="contact-title"; the h2 is
   contact-title; the form title is an h3; every input has a visible <label
   for>; <footer> is outside <main>; the nav "Contact" link scrolls to
   #contact.
6. Secrets: grep src/ for "service_", "template_" and the old public key
   string: 0 matches. .env.example is tracked by git, with empty values;
   .env.local stays ignored.
7. The floating WhatsApp button is hidden (visibility:hidden) while #contact
   is on screen and visible elsewhere. It's 52px, keyboard focusable, with
   the aria-label above.
8. No regressions in the other sections. Don't commit.

DEADLINE: 60 minutes. If you're blocked for more than 10 minutes, report STATUS: blocked with a specific question.

Reply as STATUS / FILES CHANGED / VERIFICATION / NOTES.
```

---

## Grading rubric (Claude)

| # | Check | Method | Pass |
|---|---|---|---|
| C1 | Build and budget | `npm run build`, `next lint` | 0 errors; `/` ≤ 109 kB; EmailJS not in the initial chunks |
| C2 | Layout | Playwright at 1440, 768 and 390 (2× DPR), compared with variant 07 | Matches; no h-scroll |
| C3 | Copy fidelity | Diff the #contact and footer innerText against the variant | Identical |
| C4 | Validation | Scripted: empty submit / bad email / short message / valid with no env | Errors, focus and sendError exactly as specified |
| C5 | Signal | Computed colors in #contact | 1 cta-blue element; error color only on errors |
| C6 | Secrets | Grep src/; `git check-ignore .env.local`; `git ls-files .env.example` | No IDs in code; example tracked, local ignored |
| C7 | Float button | Scroll to #contact and away | Hidden over Contact, visible elsewhere |
| C8 | Accessibility | Lighthouse a11y, plus labels / aria-invalid / aria-describedby | ≥ 95; wiring correct |
| C9 | Regressions | The Projects, Skills and About text checks | Unchanged |

**Before a real send test:** José sets `.env.local` with the **rotated** EmailJS keys (the plan lists rotation as blocking for launch). Claude never handles the key values.
