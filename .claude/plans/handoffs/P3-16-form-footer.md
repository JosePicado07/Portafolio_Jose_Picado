# P3-16 · Contact form footer: primary submit button, aligned status text

**Status:** OPEN 2026-10-06. Reported by José from a screenshot of the success state.
**Facts so far (Claude):**
- `src/components/ContactForm.tsx:278`: the submit button is `btn btn--ghost btn--submit`, a dark button with a border.
- That was deliberate in P3-06 (rule 3): "the calendar CTA is the ONLY cta-blue element in #contact. The submit button is the ghost style." **José is overriding that rule:** the submit becomes a primary (CTA Blue) button. With two blue buttons in #contact, the Earned Signal Rule still holds, because both are primary actions.
- `src/app/globals.css:527`: `.form__footer { display:flex; flex-wrap:wrap; gap:16px; align-items:flex-start; }`. The status text (0.875rem) sits at the top of the row instead of centred on the button, so it looks raised next to "Send message".

---

## Handoff (OpenCode reads this file directly)

```
TASK: P3-16 Contact form footer: make Send message a primary button and
centre the status text on it

CONTEXT: In the success state, "Send message" is a ghost (dark, bordered)
button, and "Message sent. You'll get a confirmation email shortly." sits
higher than the button's centre. José wants the submit to be the blue
primary button, with the status text vertically centred beside it. This
overrides P3-06's "calendar CTA is the only cta-blue element in #contact"
rule.

FILES: src/components/ContactForm.tsx, src/app/globals.css

RULES:
- Reuse the existing .btn--primary. Don't add new colours or tokens.
- Keep .btn--submit's widths: full width < 768px, auto at >= 768px.
- Keep aria-disabled / aria-busy and the [aria-disabled="true"] dimmed
  state. The sending state must still look disabled on the blue button.
- Don't change the form's logic, copy, focus handling or anti-spam.
- Don't commit. The server runs in tmux window portfolio:server. After
  building, restart it there (C-c, then `npm run start`); never leave it
  serving an old build.

STEPS:
1. ContactForm.tsx: submit button `btn--ghost` → `btn--primary`.
2. globals.css .form__footer: centre the status text on the button when
   they share a row (align-items:center). When the footer wraps (< 768px,
   full-width button), the status sits under the button, left-aligned,
   with no extra gap.
3. Make sure the status text's min-height doesn't push the button down
   when the status is empty, so the button stays put and nothing shifts
   when the message appears (CLS stays 0).

ACCEPTANCE:
- Submit uses btn--primary (CTA Blue fill, primary text label) at all
  widths, in idle, hover, sending (dimmed) and after success/error.
- At 1440 and 1024px: the status text's vertical centre is within 2px of
  the button's centre in the success and error states (measure with
  getBoundingClientRect and report the numbers).
- At 390px: the button is full width and the status text sits below it.
- Nothing shifts when the status appears (no layout shift).
- Screenshots of the success state at 1440 and 390px, in EN and ES.
- npm run build and lint pass with 0 errors and 0 warnings.
- Don't send real emails: test the success/error states with the EmailJS
  request blocked or mocked.

Reply in this OpenCode session as STATUS / FILES CHANGED / VERIFICATION / NOTES.
```
