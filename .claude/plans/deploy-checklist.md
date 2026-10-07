# Deploy checklist · rebuild-v2 → Vercel

**Written:** 2026-10-06 by Claude. **Target:** Vercel (plan §3). Phase 4: Vercel preview of `rebuild-v2`; Gate 4 = José approves the preview, then merge into `main`.
Legend: ✅ verified · ⬜ to do · ⚠️ blocker / decision.

---

## 0. Blockers and decisions (resolve first)

- ⚠️ **No git remote.** `git remote -v` is empty (stale `remotes/origin/*` refs exist). Re-add before pushing:
  `git remote add origin https://github.com/JosePicado07/Portaflio_Jose_Picado.git`, then `git fetch origin`.
- ⚠️ **GitHub Pages vs Vercel.** The live v1 site is GitHub Pages from `main`, and the course list in `.claude/CLAUDE.md` says "GitHub Pages deployment". The new site is a Next.js server app (`headers()`, CSP), and merging it into `main` breaks the Pages site. Decide:
  - (a) Vercel only: turn off Pages after Gate 4, and check the course accepts a Vercel URL; or
  - (b) Keep Pages too: needs `output: "export"` + `basePath`, which drops the `next.config.ts` headers (CSP would move to a `<meta>` tag, and `frame-ancestors` is lost).
  Recommendation: (a), if the course allows it.
- ⚠️ **Content decisions (José):** the calendar URL for "Book a call", plus a confirmed metric or scope marker for each of the 5 projects (Gate 3). Cards with neither show title + tech tag only.
- ⬜ **EmailJS key rotation** (plan §7, blocking for public launch): the public key was rotated 2026-10-06 10:03 (P3-14). Confirm in the EmailJS dashboard that the old key no longer works.

## 1. Code readiness

- ✅ `npm run lint`: 0 errors, 0 warnings (2026-10-06, after e4c2e08).
- ✅ `npm run build` passes (P3-15c, 17:03); `npm run start` serves `/` and `/es` with all static assets returning 200.
- ✅ Working tree clean; perf work committed (2063d70, e4c2e08).
- ⬜ **`metadataBase`** is missing in `src/app/(en)/layout.tsx` and `src/app/(es)/es/layout.tsx`. Without it, the `canonical` / `hreflang` URLs stay relative and Open Graph URLs resolve wrongly. Set it to the production URL once known (e.g. `new URL("https://<domain>")`).
- ⬜ Optional SEO: `src/app/robots.ts`, `src/app/sitemap.ts` (both `/` and `/es`), an Open Graph image (`opengraph-image.png`).
- ⬜ Remove `interest-cohort=()` from `Permissions-Policy` in `next.config.ts`; Chrome logs "Unrecognized feature".
- ⬜ Decide whether `lighthouse-report*.html` and `test_headless.mjs` should stay in the repo. They don't affect the build.

## 2. Gate 3 checks (Claude, on `npm run start`)

- ✅ Lighthouse accessibility 100 (mobile and desktop).
- ✅ Mobile: Performance 92, LCP 2.3s, CLS 0. Desktop: Performance 98, LCP 0.5s, CLS 0. (New target: mobile Performance ≥ 90 + Core Web Vitals green, median of 3 runs. Re-run 3× before Gate 3.)
- ⬜ 3D hero renders and reacts to scroll (desktop); the poster shows on touch / low-power devices.
- ⬜ All 5 project cards render.
- ⬜ ES/EN switches all text, on `/` and `/es`.
- ⬜ CV downloads (`/cv/CV_Jose_Picado_2026.pdf`).
- ⬜ Form validates, and one real send succeeds (contact + auto-reply).
- ⬜ Screenshots at 390 / 768 / 1024 / 1440px.
- ⬜ José approves section by section.

## 3. Vercel setup

- ⬜ Push `rebuild-v2` to GitHub.
- ⬜ Import the repo in Vercel (framework auto-detected, no `vercel.json`). Production branch = `main`.
- ⬜ Environment variables for **Preview and Production**: `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`, `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_CONTACT`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_AUTOREPLY`. Re-deploy after adding them, because `NEXT_PUBLIC_*` values are baked in at build time.
- ⬜ **EmailJS allowed origins:** add the Vercel preview domain and the production domain (keep `http://localhost:3000` for local testing).
- ⬜ Note: on preview deploys, the Vercel feedback toolbar (`vercel.live`) is blocked by our CSP. That's harmless; disable the toolbar in project settings if the console noise matters.

## 4. Preview verification (Gate 4)

- ⬜ Preview URL loads `/` and `/es` with no console errors (CSP, 404s, hydration).
- ⬜ Response headers present: CSP, `X-Frame-Options: DENY`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, COOP.
- ⬜ One real form send from the preview domain succeeds (this proves the env vars and allowed origins).
- ⬜ Lighthouse on the preview URL (mobile + desktop, median of 3).
- ⬜ WhatsApp button, CV link, LinkedIn / GitHub links work.
- ⬜ José approves the preview → **Gate 4**.

## 5. Launch

- ⬜ Merge `rebuild-v2` → `main` (PR), and confirm the production deploy succeeds.
- ⬜ Set `metadataBase` to the final domain if it changed; custom domain + HTTPS in Vercel (optional).
- ⬜ If option (a): disable GitHub Pages and update the README / CLAUDE.md links to the new URL.
- ⬜ Final real form send on production; update the EmailJS allowed origins to production only (+ localhost).
- ⬜ Update `.claude/CLAUDE.md` (it still describes the v1 static site).
