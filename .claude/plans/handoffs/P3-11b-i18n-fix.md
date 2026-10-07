# P3-11b · Spanish: translate hard-coded aria-labels, shorten the ES headline

**Status:** ACCEPTED 2026-10-06. No literal aria-labels in src/components; all 11 labels Spanish on /es and unchanged on /; EN text identical (except the accepted toggle space); ES h1 "Pipelines comprobados." 2 lines at 1440/768/390; lint 0 warnings; both routes static 108 kB; form errors and focus OK in both languages.
**Passed and must be kept:**
- Both routes are static at 108 kB; `satisfies Dictionary`.
- EN text is unchanged (the only diff is "EN /ES" → "EN / ES" in the footer toggle, accepted).
- ES metadata, `lang="es"`, canonical and hreflang (en, es, x-default) are correct.
- The toggle keeps the hash (`/es#skills` → `/#skills`), uses aria-current, and works with no JS.
- ES form errors; motion, WebGL and poster parity; no overflow and no clipped buttons at 1440/768/390.

**Failed:**
- (a) Six aria-labels are hard-coded in English, so screen readers announce English on /es.
- (b) The ES h1 wraps to 3 lines at 1440. That's Claude's copy: "Pipelines de datos," is 19 characters, and the desktop column fits about 14 at display size. Claude changed the ES headline to "Pipelines comprobados." (breaks as Pipelines / comprobados.).

**Also:** clear the new lint warning (react-hooks/exhaustive-deps in ContactForm).

---

## Handoff (paste everything inside the fence)

```
TASK: P3-11b Spanish fixes: dictionary-driven aria-labels, new ES headline, lint warning

CONTEXT: P3-11 passes almost everything. Fix only these three items. Don't
change any other string, style or behavior.

FIX 1 · Hard-coded English aria-labels → dictionary
  Add an `aria` group to the Dictionary type, with values in en.ts and
  es.ts, and use it in place of the literals:
    key              EN (unchanged)        ES
    stack            Stack                 Tecnologías
    proof            Proof                 Resultados
    compactProjects  Compact projects      Otros proyectos
    skillsPipeline   Skills pipeline       Pipeline de habilidades
    contactChannels  Contact channels      Canales de contacto
    footerLinks      Footer links          Enlaces del pie de página
  Places: Projects.tsx (aria-label="Stack" in .case__stack; "Proof" in
  .case__proof AND .row__proof-group; "Compact projects" in .rows),
  Skills.tsx (.pipeline), Contact.tsx (.channels), Footer.tsx
  (.footer__links). EN output must stay identical.
  Afterwards: grep src/components for aria-label=" followed by a literal
  letter. There are 0 matches (every aria-label comes from the dictionary).

FIX 2 · ES hero headline
  es.ts hero.title: "Pipelines comprobados."   (exactly this. EN unchanged.)

FIX 3 · Lint warning
  ContactForm.tsx: react-hooks/exhaustive-deps on the validation useCallback.
  Include the form strings it reads in the dependency list (or move
  validation out to a pure function that takes the error strings).
  `npx next lint` must show no warnings.

ACCEPTANCE:
1. `npm run build` and `npx next lint` both pass with 0 errors and 0
   warnings. Both routes stay static, ≤ 110 kB.
2. /es: no English aria-label remains (the six above are Spanish). / (EN):
   all aria-labels identical to before.
3. /es h1 is exactly 2 lines at 1440, 768 and 390.
4. Validation still behaves the same in both languages (errors, focus on the
   first invalid field).
5. Nothing else changes. Don't commit.

DEADLINE: 20 minutes.

Reply as STATUS / FILES CHANGED / VERIFICATION / NOTES.
```
