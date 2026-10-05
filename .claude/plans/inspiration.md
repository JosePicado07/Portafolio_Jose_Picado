# Inspiration: Portfolio v2

Phase 2, step 6. Every idea below was observed live on 2026-10-05 and is translated into the terms of `DESIGN.md`:
- **Palette:** Field Black `#0A0A0A`, Signal Blue `#0066FF`, neutrals at hue 250, under the Earned Signal Rule.
- **Type:** Geist, two weights. Display uses `clamp(2.5rem, 6vw + 1rem, 5.5rem)`; body is 1rem / 1.65 at 70ch.

Nothing here overrides DESIGN.md. Where a reference breaks one of its rules, the conflict is called out.

---

## 1. Palette: color only where something passed

**Source:** vgpu: https://vgpu.sh/ (found via https://www.landing.love/style/dark-mode/)

**Observed:**
- The page is fully achromatic: black field, white type, grey hairlines.
- In its "one source → four outputs" diagram, the only saturated color in view is the green of the CI panel's passing lines (`✓ compile eve.wgsl`, `1 test passed`).
- Color shows up where a check succeeded, and nowhere else.

**Translation to DESIGN.md:**
- This is the Earned Signal Rule working in production. Signal Blue replaces the green, and only:
  - verified metrics
  - the primary CTA
  - active states
- Everything else sits in the hue-250 neutrals: `text-primary` for content, `text-secondary` for supporting copy, `border` for hairlines.
- The test for a section: if it reads fine with Signal Blue removed, apart from losing its one signal, the palette is right.

**Supporting reference:** Byotōne: https://byotone.com/ (via https://www.landing.love/sites/byotone/)
- Near-black field, one desaturated mint accent, sparse type.
- **Conflict:** Byotōne sets its whole hero headline in the accent. DESIGN.md forbids that, because the headline stays `text-primary`. Take the restraint, not the headline treatment.

---

## 2. Interaction pattern: noise resolves into structure as you scroll

**Sources:**
- Phantom.land particle system (Codrops): https://tympanus.net/codrops/2025/06/30/invisible-forces-the-making-of-phantom-lands-interactive-grid-and-3d-face-particle-system/
- Trionn architecture (Codrops): https://tympanus.net/codrops/2026/07/15/the-architecture-behind-trionn-coordinating-gsap-three-js-lenis-and-web-audio/

**Observed:**
- **Phantom.land:**
  - Built with R3F `<points>` and a custom shader. Every particle has a random starting position on a sphere and a target position.
  - One `transition` uniform (0→1, tweened by GSAP) blends between the two states.
  - Extra noise peaks mid-transition (`abs(sin(speed * PI))`), so particles "disturb" and then settle.
  - A per-particle depth-of-field fades points away from a focus plane.
- **Trionn:**
  - Every hero state feeds one shared value, combined with `Math.max(scroll, hover, intro)`, so any input moves the same animation smoothly and in reverse.
  - Lenis is driven from `gsap.ticker`, so smooth scroll and ScrollTrigger never drift apart.
  - WebGL renders only while the section is within one viewport of the screen.
  - Shaders are pre-compiled (`renderer.compile`) to avoid a first-frame hitch.
  - Reduced-motion handling lives in one place.

**Translation to DESIGN.md (the hero's 3D data-point network):**
- **Concept:** a validation run you can see. At scroll 0, the points are unvalidated noise: scattered and dim (`text-muted`).
  - As the hero scrolls out, one `uResolve` uniform driven by ScrollTrigger pulls the points into an ordered network with hairline edges.
  - A small subset of "verified" nodes turns Signal Blue at the end of the transition. That's the North Star, "The Validated Signal", made literal.
- **Mechanics to adopt:**
  - one shared progress value
  - Lenis on `gsap.ticker`
  - render only near the viewport
  - pre-warmed shaders
  - the mid-transition noise peak
- **Rule conflicts to drop:**
  - Phantom's always-on curl-noise drift moves without scroll or interaction, which DESIGN.md prohibits as decorative animation. The idle state is static.
  - Trionn's "slower spin" under reduced motion isn't enough. DESIGN.md requires a static fallback.
  - Bloom stays subtle or disappears. Phantom's vignette/distortion pass is not needed.
- **Performance:** Phantom draws about 78k particles per face. A hero network needs far fewer (around 1–3k points plus edges) to stay inside the LCP and INP budgets on mid-range phones.

---

## 3. Layout structure: the pipeline diagram

**Source:** vgpu: https://vgpu.sh/ (section below the hero)

**Observed:**
- One source panel (`eve.ts`) connects to four output panels (WEB, IMAGE, VIDEO, CI) through a 1px connector line, with small node dots where it branches.
- Each output panel has a one-line header: the name on the left, a technical scope string on the right (`MP4 · 60 FPS`, `PNG · 8192 × 4608`, `HEADLESS · ARTIFACT`).
- The structure explains the product without any copy.

**Translation to DESIGN.md:**
- **Project compact rows (tiered layout):** each of the three compact projects gets vgpu's header pattern: title on the left, scope marker on the right, a Hairline (`border`) between rows. For example: `Oracle Parts Normalization ······ [scope marker]`. If a project has no confirmed scope marker, the right side stays empty, which matches the Gate 3 rule.
- **Skills (optional, needs your decision):** instead of an icon grid, lay the skills out as a pipeline of stages joined by a hairline connector: Ingest → Transform → Validate → Serve. Each stage lists its tools, and only the stage proven by a verified case study earns a Signal Blue node dot.
  - This turns "tools" into "how I build", which is exactly PRODUCT.md's first principle.
  - It replaces the plan's "icon grid", so it's your call.
- **Hero left column:** vgpu's hero is already a close match for DESIGN.md's composition: a large title, a one-line subhead, then a small row of options above a hairline. It's a calm, proven precedent for the 55/45 split.

**Typography note:**
- vgpu and Byotōne both set metadata in uppercase mono with wide tracking.
- DESIGN.md currently allows Geist only, at two weights. A label style in **Geist Mono** would be a second family.
- Decide this before Phase 3. The alternative is uppercase Geist body weight with letter-spacing, which stays within the current rules.

---

## 4. Bonus: headline comes into focus (needs approval; LCP risk)

**Sources:** Byotōne (https://byotone.com/), where the hero words resolve from blurred to sharp, and Trionn's `BlurTextReveal` (Codrops link above).

**Translation:** the hero headline sharpens once, as the page settles, echoing "noise → validated". It's one pass with no stagger theatrics, an expo ease-out, and it's skipped entirely under reduced motion.

**Risk:** the headline is the LCP element. Starting it at `opacity: 0` delays LCP. If this is used, animate **blur only**, starting from full opacity, so the text is painted immediately and LCP is unaffected. If that can't hold LCP under 2.5s, cut it.

---

## Sources browsed without a pick

- **godly.website:** now redirects to recent.design (a general design feed). Nothing on the first screen matched the brief.
- **awwwards.com/websites/portfolio/:** the current feed is mostly loud agency and illustration work (high-contrast color, collage, brutalist). It confirmed the anti-references but gave no positive reference.
