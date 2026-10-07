# P3-12 · Contact form: the page jumps after sending

**Status:** ACCEPTED 2026-10-06 (headless). Scroll movement 0px at 1440/768/390 for success and failure; focus ends on the status element; no disabled attribute; double-click sends once (2 calls = notification + auto-reply). CORRECTION: the earlier "764px at 390" reproduction was a harness artifact (Playwright auto-scrolls an off-screen button into view before clicking), so José's jump to the top was never reproduced headless. José confirms in his browser.

Reported by José on 2026-10-06: after a send, "the animation … takes up to the top of the page".
**Reproduction (Claude, headless; EmailJS faked with a 200 response, nothing sent):**
- 1440px: no scroll movement.
- **390px: an unrequested smooth scroll of 764px** right after submit (7355 → 8119).
- No site code calls scrollTo or scrollIntoView (instrumented). After the send, `document.activeElement` is BODY.
- The exact "to the top" jump wasn't reproduced headless; José's browser shows it.

**Diagnosis:** the submit button is focused, then gets `disabled` while sending. A disabled focused element loses focus, focus falls back to `<body>`, and the browser re-scrolls (animated, because `html { scroll-behavior: smooth }`). Where it lands is browser-dependent, which matches "to the top" for José and a drift down headless.

**Also on record:**
- EmailJS config is wired correctly. A blocked-network test showed a send call with service/template/public key present and params `from_email, from_name, message`.
- The dashboard test email José received confirms the Gmail service only. A real form send (notification + auto-reply) still needs José's confirmation.

---

## Handoff (paste everything inside the fence)

```
TASK: P3-12 Contact form: stop the scroll jump after submit (focus handling)

CONTEXT: After a successful send, the page scrolls on its own (to the top in
José's browser; 764px down at 390px in a headless test). Cause: the submit
button is focused and then gets the `disabled` attribute while sending. A
disabled focused element loses focus to <body>, and the browser re-scrolls
(smoothly, because html has scroll-behavior: smooth). No code calls scroll.

FILES: src/components/ContactForm.tsx (and globals.css only if the status
needs an outline style).

FIX:
1. Never put the `disabled` attribute on the submit button. While sending,
   set aria-disabled="true" and aria-busy="true", keep the button focusable,
   and ignore extra submits with the existing submittingRef guard (check it
   at the TOP of handleSubmit: if submitting, return). Keep the visual
   sending style through [aria-disabled="true"] (opacity 0.6,
   cursor: progress).
2. Status message focus (a11y + no jump): give the status element
   tabIndex={-1}. After success OR sendError, call
   statusRef.current?.focus({ preventScroll: true }). The status keeps
   role="status" and aria-live="polite". No visible focus ring on the
   status (outline: none on that element only, since it's not interactive).
3. Invalid-submit focus stays as it is (focusing the first invalid field may
   scroll to it; that's intended).
4. form.reset / state reset after success must not change the form's height
   by more than the status line (no collapsing elements).

ACCEPTANCE:
1. `npm run build` and lint pass with 0 errors and 0 warnings.
2. With EmailJS stubbed to succeed (route-fulfill 200; don't send real
   mail), at 1440, 768 and 390: window.scrollY after submit equals
   scrollY before submit (±2px) for 2s after the click. Same with the
   EmailJS stub failing (sendError).
3. After success, document.activeElement is the status element. After
   sendError, the same. The button is never `disabled` (attribute absent);
   double-clicking sends once.
4. Validation errors and focus-first-invalid behave exactly as before, in EN
   and ES.
5. Don't commit.

DEADLINE: 20 minutes.

Reply as STATUS / FILES CHANGED / VERIFICATION / NOTES.
```

---

## Grading (Claude)

Re-run `jump.cjs` (scroll trace at 1440/768/390, success and failure stubs), check `activeElement`, the absence of the disabled attribute, and a single EmailJS call on double-click. Then ask José to repeat one real send in his own browser, since his browser showed the jump to the top.
