# P3-13 · Security hardening (headers + form anti-spam)

**Status:** ACCEPTED 2026-10-06. All 6 headers on / and /es (CSP production-only). 0 CSP violations with WebGL, fonts and motion working on both routes. Honeypot and <3s submits: fake success, 0 EmailJS calls; human submit: 2 calls. Honeypot unreachable by Tab. a11y 100 on both routes; LCP 2.1–2.2s, CLS 0 (re-measure in the Gate 3 final pass).
**Source:** Claude's security review, 2026-10-06 (read-only: npm audit, config, raw-HTML sinks, links, git history).

## Findings (full list)
| # | Finding | Severity | Where it's handled |
|---|---|---|---|
| 1 | No security headers (empty `next.config.ts`): no CSP, X-Frame-Options/frame-ancestors, Referrer-Policy, Permissions-Policy, nosniff | Medium | This handoff |
| 2 | Contact form has no bot protection. The EmailJS public key is client-side by design, so bots can spam or burn the quota. | Medium | This handoff (honeypot + timing) + José (EmailJS dashboard) |
| 3 | The legacy EmailJS public key appears 14× in git history (main and rebuild-v2) | Low if revoked | José confirms the old key was regenerated (rotation) |
| 4 | npm audit: 2 PostCSS advisories via next@15.5.27 (build-time CSS processing) | Low, accepted | The site only processes its own CSS. The fix requires Next 16 (rejected stack decision). Don't run `npm audit fix --force`. Re-check when Next 15.x ships a patched postcss. |
| 5 | `dangerouslySetInnerHTML` ×4 (head script constant; poster SVG from seeded numbers) | None | No user input reaches them |
| 6 | `target="_blank"` links | None | All carry `rel="noopener noreferrer"` |

**José's side (EmailJS dashboard, not code):**
- Account → Security → **allowed origins**: the production domain(s), plus `http://localhost:3000` for testing.
- Enable the **rate limit** (for example 1 request per 10s per user).
- In both templates, use **double braces** `{{message}}` (HTML-escaped), never triple braces `{{{ }}}`.

---

## Handoff (paste everything inside the fence)

```
TASK: P3-13 Security hardening: response headers + contact-form anti-spam

CONTEXT: A security review of the site found no security headers and no bot
protection on the contact form. The EmailJS public key is client-side by
design, so a bot can post to it directly from our page. Add both without
changing any visible design or copy. (Don't touch dependencies, and don't
run npm audit fix.)

FILES: next.config.ts, src/components/ContactForm.tsx, src/app/globals.css
(only for hiding the honeypot), and the dictionaries ONLY for the
honeypot's label (below).

1 · SECURITY HEADERS (next.config.ts → async headers(), source "/:path*")
  Content-Security-Policy (production only, i.e. when NODE_ENV ===
  "production", because `next dev` needs eval):
    default-src 'self';
    script-src 'self' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: blob:;
    font-src 'self';
    connect-src 'self' https://api.emailjs.com;
    frame-ancestors 'none';
    base-uri 'self';
    form-action 'self';
    object-src 'none';
    upgrade-insecure-requests
  ('unsafe-inline' for scripts is required: static Next pages inline their
  payload and our head script, and nonces need dynamic rendering. Keep the
  rest strict.)
  All environments:
    X-Content-Type-Options: nosniff
    Referrer-Policy: strict-origin-when-cross-origin
    X-Frame-Options: DENY
    Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()
    Cross-Origin-Opener-Policy: same-origin
  (Don't add HSTS here; Vercel sets it on the production domain.)

2 · FORM ANTI-SPAM (ContactForm.tsx)
  a) Honeypot: an extra text input name="company", outside the visual
     layout (class .field--hp: position:absolute; left:-10000px; width:1px;
     height:1px; overflow:hidden). It has tabIndex={-1},
     autoComplete="off", aria-hidden="true" on its wrapper, and a <label>
     (dictionary key contactForm.honeypotLabel; EN "Company (leave
     empty)", ES "Empresa (dejar vacío)"). If it has ANY value on submit:
     show the normal SUCCESS state, but do NOT call EmailJS.
  b) Minimum time: record the time the form first renders (useRef on
     mount). If submit happens less than 3 seconds after render, treat it
     like the honeypot (fake success, no EmailJS call).
  c) Don't send `company` to EmailJS (template params stay exactly
     from_name / from_email / message, and email / from_name / message for
     the auto-reply).
  d) Everything from P3-12 stays (no disabled attribute, status focus,
     no scroll jump).

ACCEPTANCE:
1. `npm run build` and lint pass with 0 errors and 0 warnings. "/" and "/es"
   stay static and ≤ 110 kB. No new dependencies.
2. `curl -sI` on "/" and "/es" (next start) shows the CSP and all five other
   headers with exactly the values above.
3. Under the CSP, in a real browser on "/" and "/es": zero CSP violations in
   the console, with the 3D hero rendering, motion working, fonts loading,
   and the form reaching api.emailjs.com (verify with a stubbed/blocked
   request; don't send real mail).
4. Honeypot filled → success message shown, NO request to api.emailjs.com.
   Submit within 3s of load → same. A normal human submit (more than 3s,
   honeypot empty) → the EmailJS request is made.
5. The honeypot is invisible, unreachable by Tab, and not announced
   (aria-hidden wrapper). Lighthouse a11y stays ≥ 95.
6. Visible design and copy unchanged on both routes. Don't commit.

DEADLINE: 45 minutes. If you're blocked for more than 10 minutes, report STATUS: blocked with a specific question.

Reply as STATUS / FILES CHANGED / VERIFICATION / NOTES.
```

---

## Grading (Claude)

- `curl -sI` header check on both routes.
- Playwright: console CSP-violation listener on both routes (with WebGL, the motion probe and fonts).
- The EmailJS request is intercepted (route abort/fulfill) for: honeypot, under 3s, and a normal submit.
- Tab order (the honeypot is never focused).
- Lighthouse a11y on both routes.
