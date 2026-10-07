# P3-06b · Contact fixes

**Status:** ACCEPTED 2026-10-05. Focus moves to the first invalid field (name, then email); no console errors; footer EN/ES present; 0 placeholders; every aria-describedby resolves; labels and title match; channels are a <ul>; float hides over Contact and returns; no h-scroll at 1440/768/390; Lighthouse a11y 100, LCP 1.6–1.7s (one 3.9s outlier under load, not reproduced), CLS 0; build 108 kB. Polish noted for Gate 3: submit is full width at exactly 768px (spec said auto at ≥768).
**Passed and must be kept:**
- C1: build OK, `/` = 108 kB (≤ 109), EmailJS loaded lazily.
- C3: all error and status strings are exact.
- C5: exactly 1 cta-blue element in #contact.
- C6: no IDs in src/, `.env.example` tracked with empty values, `.env.local` ignored.
- C7 (partly): the float button hides over Contact.
- Validation messages are correct. The missing-env path shows sendError and keeps the typed values.

**Failed:**
- The first-invalid focus.
- The WhatsApp SVG is corrupt.
- The footer has no language toggle.
- Invented placeholders.
- The channels markup and spacing.
- The label and form-title styling.

**Not yet tested:** mobile 390 (the grading script stopped on the float-button check). That's re-checked after this fix.

---

## Handoff (paste everything inside the fence)

```
TASK: P3-06b Contact: fix focus bug, WhatsApp icon, footer toggle, and match variant 07 styling

CONTEXT: P3-06 is mostly right. Validation copy, the EmailJS env handling,
secrets and signal discipline all pass, so keep them. Fix ONLY the items
below. The reference is still .claude/design-variants/07-contact/index.html.

FIX 1 · Focus doesn't move to the first invalid field on submit (BUG)
  Measured: an empty submit leaves focus on the BUTTON. handleSubmit calls
  setFields and then immediately queries "[aria-invalid='true']", but React
  hasn't re-rendered yet, so nothing matches. Use refs instead: keep a ref
  per field, compute `errors` locally, and focus the ref of the first field
  with an error (order: name, email, message). Expected: an empty submit
  focuses #name; with only a bad email, focus goes to #email.

FIX 2 · The WhatsApp icon SVG is corrupt (BUG)
  The path's d attribute degrades into a counting sequence ("…10 10.1.1.2.2.11
  11…"), and the browser logs "Unexpected end of attribute". Replace the whole
  <svg> with the variant's stroke icon, exactly:
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth={1.5} strokeLinejoin="round" aria-hidden="true">
      <path d="M4 20l1.3-3.9A8 8 0 1 1 8 18.8L4 20z"/>
      <path d="M9 9.5c.3 2.2 2.3 4.2 4.5 4.5l1.2-1.2 1.8.8v1.4c-3.8.4-8.4-4.2-8-8h1.4l.8 1.8L9.5 9z" strokeWidth={1.2}/>
    </svg>
  Also remove the unused `contactRef`.

FIX 3 · The footer is missing the EN/ES toggle
  Add the language group between the links and the meta text, with the same
  markup and behavior as the Nav's EN/ES group (role="group",
  aria-label="Language", buttons with aria-pressed; the active one in
  signal-blue-text). Reuse the Nav's component or extract a shared
  <LangToggle/>. Don't duplicate logic.

FIX 4 · Remove the invented placeholders
  Delete the placeholder attributes "Your name", "your@email.com" and
  "Describe what you're building...". They aren't in the approved copy, and
  the labels already say this.

FIX 5 · Match the variant's styling
  - Field labels: text-secondary, 0.9375rem, normal case, no letter-spacing
    (NOT the uppercase label style).
  - Form title "Send a message": an h3 at 1.25rem, weight 400, text-primary
    (not the label style). Remove the inline style={{...}}.
  - Each field: label, 8px gap, input, then a meta row (min-height 1.4em)
    holding the error on the left and, for message only, the counter on the
    right. Fields are 24px apart.
  - The counter shows the RAW length (value.length, not trimmed) as
    "{n} / 1000".
  - message aria-describedby is ALWAYS "message-error message-counter"
    (keep the error span in the DOM, empty when valid, so the id resolves).
    Same pattern for name and email: the error spans always exist, and their
    text is empty when valid.
  - Button and status sit in one row (flex, gap 16px, wrap), with the button
    first and the status after it. Submit width is auto on ≥768px and 100%
    on <768px.
  - Channels: a <ul class="channels"> of <li class="channel"> rows, not a
    <nav>. Margin-top 64px from the CTA, border-top 1px, and each row has
    padding-block 16px, a border-bottom 1px, and is a flex row with
    space-between: the label (label style) on the left and the link on the
    right. Only the link text is the <a>, with a 1px border-bottom in border
    color that turns text-muted on hover. This also removes the wrong
    aria-label="Email" landmark.
  - Section header placement: put the label, h2 and lead INSIDE the left
    column (as in the variant), not above the grid.

ACCEPTANCE:
1. `npm run build` passes with 0 errors; "/" ≤ 109 kB.
2. An empty submit focuses #name. "Ana" / "ana@x" / "hi" focuses #email. No
   console errors on load (including no SVG path error).
3. The footer has an EN/ES group with EN aria-pressed="true".
4. No placeholder attributes in #contact.
5. Every aria-describedby id resolves to an element in the DOM at all times.
6. Visual match with variant 07 at 1440, 768 and 390px, with no horizontal
   scroll.
7. The float button is hidden over #contact AND visible again after
   scrolling back to the top.
8. Nothing else changes. Don't commit.

DEADLINE: 30 minutes.

Reply as STATUS / FILES CHANGED / VERIFICATION / NOTES.
```
