# P3-14 · Contact form: real sends fail ("Couldn't send the message")

**Status:** RESOLVED 2026-10-06 by OpenCode (via tmux). Real send through http://localhost:3000: contact HTTP 200 "OK" and auto-reply HTTP 200 "OK", "Message sent" shown. No code change needed. José's failures came from a stale server/build (old keys) or a cached page. Full report: P3-14-status.md.
**Facts so far (Claude):**
- `.env.local` has all 4 `NEXT_PUBLIC_EMAILJS_*` vars set (checked for presence only).
- José rotated the public key at 10:03. The site in tmux `portfolio:server` was rebuilt after that and serves on :3000.
- A blocked-network test showed the form calls `api.emailjs.com/api/v1.0/email/send` with service, template and public key present, and params `from_name, from_email, message`.
- José's real send in his browser still shows **"Couldn't send the message"**, so EmailJS rejects the request. The dashboard test email works, so the Gmail service itself is fine.

---

## Handoff (OpenCode reads this file directly)

```
TASK: P3-14 Find out why EmailJS rejects real sends, and fix it

CONTEXT: The contact form shows "Couldn't send the message" on a real send.
The config is present and the request reaches api.emailjs.com, so EmailJS is
rejecting it. Find the exact rejection reason and fix whatever is on OUR side.
Report anything on José's side (the EmailJS dashboard) clearly.

RULES:
- NEVER print, echo or paste the values of NEXT_PUBLIC_EMAILJS_* (in your
  reply, logs or commits). Refer to them by name only. You may compare them
  programmatically.
- Send AT MOST 2 real test emails, and only to jpicado011@gmail.com (use
  it as from_email too, so the auto-reply also goes to José).
- The site runs in tmux window portfolio:server on :3000. To rebuild:
  tmux send-keys -t portfolio:server C-c ; then
  tmux send-keys -t portfolio:server 'npm run build && npm run start' Enter
- Don't commit.

STEPS:
1. Reproduce through the real site (a headless browser against
   http://localhost:3000, wait >3s before submitting (anti-spam), honeypot
   empty). Capture the EmailJS HTTP status and RESPONSE BODY text for each
   call (contact, then auto-reply).
2. Interpret the body. Typical ones:
   - "The Public Key is invalid" → the key in .env.local ≠ the dashboard
     (or a stale build).
   - "The service ID is invalid" / "not found" → wrong SERVICE_ID.
   - "The template ID not found" → wrong TEMPLATE_CONTACT or AUTOREPLY.
   - 403 / origin-related → allowed origins in EmailJS doesn't include
     http://localhost:3000.
   - 422 / "variables" → the template expects different variable names than
     the params we send (contact: from_name, from_email, message;
     auto-reply: email, from_name, message).
   - 412 / Gmail auth → the Gmail service needs reconnecting in the
     dashboard.
3. Check our side too: the CSP connect-src allows https://api.emailjs.com
   (no CSP errors in the console); the env var NAMES in src/lib/email-config.ts
   exactly match .env.local; values have no quotes, spaces or trailing
   whitespace (check programmatically, don't print them).
4. Fix anything on our side and verify with ONE real send. If the cause is
   on José's side, change nothing and tell him the exact dashboard setting
   to change.

ACCEPTANCE:
- You report the exact EmailJS status and response body for each call
  (no secret values).
- Either a real send succeeds (contact 200 + auto-reply 200, "Message sent"
  shown) or you name the specific dashboard fix José must make.
- `npm run build` and lint still pass with 0 errors and 0 warnings.

Reply in this OpenCode session as STATUS / FILES CHANGED / VERIFICATION / NOTES.
```
