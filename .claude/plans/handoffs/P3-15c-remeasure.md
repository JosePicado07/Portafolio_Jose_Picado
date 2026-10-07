# P3-15c · Restart the server on the current build and re-measure P3-15b

**Status:** OPEN 2026-10-06.
**Facts so far (Claude):**
- The P3-15b Lighthouse result (Performance 92, TBT 340ms, report 16:37) is **invalid**. It measured a broken page.
- The server on :3000 is `next start` pid 4243 (started 16:07), outside tmux, because the `portfolio:server` window is gone. `.next` was rebuilt at 16:38 while it was running.
- The server still sends HTML for the old build, so `/_next/static/css/cc2969a60a79dc20.css` and `/_next/static/chunks/504-5e3f67d7c8bcc600.js` return 400. The report shows the same two failed requests, which means it ran with no CSS and a missing client chunk.
- A rough profile against that broken page showed no page-wide JS loop: ~600ms of JS in the first second under 4× throttle (webpack module eval plus React hydration), then idle.
- `npm run lint` shows 0 errors and 1 warning: `test_headless.mjs:21` `'e' is defined but never used` (from Claude's chore commit c0b7f97).

---

## Handoff (OpenCode reads this file directly)

```
TASK: P3-15c Restart the server on the current build and re-measure P3-15b

CONTEXT: The last Lighthouse run (Performance 92, TBT 340ms) measured a
broken page. The server on :3000 (next start, pid 4243, started 16:07,
not in tmux) kept serving HTML for an old build after .next was rebuilt at
16:38. /_next/static/css/cc2969a60a79dc20.css and
/_next/static/chunks/504-5e3f67d7c8bcc600.js return 400, so the audit ran
without CSS and without a client chunk. We need real numbers for the
P3-15b HeroCanvas change before deciding anything else.

FILES: test_headless.mjs (lint fix), lighthouse-audit.mjs (desktop option)

RULES:
- Don't change anything in src/. This task only measures.
- Don't commit.
- From now on, run the ONE shared server in tmux window portfolio:server.
  Never start a second server, and never rebuild .next while the server
  is running without restarting it afterwards.

STEPS:
1. Stop the stale server: kill 4243 (and its parent sh, 4242). Confirm
   nothing is listening on :3000.
2. Recreate the server window and start the current build:
   tmux new-window -t portfolio -n server
   tmux send-keys -t portfolio:server 'npm run build && npm run start' Enter
3. Check the build is consistent: for every /_next/static/*.css and *.js
   URL in the HTML of http://localhost:3000 and http://localhost:3000/es,
   the HTTP status must be 200. List them.
4. Fix the lint warning in test_headless.mjs line 21:
   `catch (e) {}` → `catch {}`.
5. Add a desktop option to lighthouse-audit.mjs (e.g. a `--desktop`
   argument that uses Lighthouse's desktop preset: formFactor "desktop",
   screenEmulation desktop, desktop throttling). Keep the default as
   mobile. Keep the GPU enabled (no --disable-gpu).
6. Run Lighthouse on http://localhost:3000 twice:
   a) mobile (default): the poster path, because pointer:coarse skips WebGL
   b) desktop: the WebGL path
   For each run, check the report's network requests: none may be non-200.
   Save each run's report separately (e.g. lighthouse-report.html and
   lighthouse-report-desktop.html).

ACCEPTANCE:
- No process from before this task is serving :3000; the server runs in
  portfolio:server.
- Every static asset on / and /es returns 200 (list them).
- npm run lint: 0 errors, 0 warnings.
- For mobile and desktop, report: Performance, TBT, LCP, CLS, TTI, and
  the top 5 long tasks (start time, duration, script URL). Confirm that
  no request in either report failed.
- Mobile report shows no three.js chunks loaded; desktop report shows
  HeroScene / three.js loading (state their start time relative to TTI).
- Don't try to fix TBT. Just report the numbers.

Reply in this OpenCode session as STATUS / FILES CHANGED / VERIFICATION / NOTES.
```
