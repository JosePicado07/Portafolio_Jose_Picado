# P3-01 · Scaffold + tokens

**Sent:** 2026-10-05, as message `5cc34447…`, plus the amendment `c5e36f55…` with the user's verbatim acceptance lines.
**Status:** waiting for OpenCode's STATUS reply.

## Grading rubric (Claude, verification commands only)

| # | Check | Command / method | Pass |
|---|---|---|---|
| S1 | Protected paths untouched | `git status --porcelain .claude archive CLAUDE.md DESIGN.md PRODUCT.md .mcp.json opencode.json`, plus `git diff --stat .gitignore` | Nothing new, except `archive/legacy-portfolio-v1/.impeccable.md`, which was already modified before the task. `.gitignore` diff is empty. |
| S2 | .claude/ still ignored | `git check-ignore -v .claude/collab/protocol.md` | Prints a `.gitignore` match |
| S3 | Build | `npm run build` | 0 type and lint errors |
| S4 | Stack versions | `npm ls next react three @react-three/fiber @react-three/drei @react-three/postprocessing gsap @gsap/react lenis @emailjs/browser tailwindcss` | next 15.x, tailwind 4.x, all present, no `UNMET` |
| S5 | Tokens exact | Read `src/app/globals.css` | All 9 token values match DESIGN.md character for character; no other color literals; no create-next-app gradient or dark-mode block |
| S6 | Font | Read `src/app/layout.tsx` | Geist via `next/font/google`, weights exactly `["400","600"]`; `<html lang="en">`; title and description as specified |
| S7 | No pure values | Grep `src/` for `#000`, `#fff`, `white`, `black` (case-insensitive, word-bounded) | No matches |
| S8 | Assets | `ls public/cv src/app/favicon.ico`, plus a check that no starter SVGs are left in `public/` | CV and favicon present, starter SVGs gone |
| S9 | Runs | `npm run start`, then load `/` in the browser | Field-black page, empty `main`, no console errors |
| S10 | Not committed | `git log -1 --format=%s` | Still `chore: archive legacy portfolio v1 to start fresh` |

A pass unlocks sending P3-02 (`handoffs/P3-02-nav-hero.md`).
