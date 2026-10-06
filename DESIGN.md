---
name: José Picado Portfolio
description: Data Engineer & Consultant who builds pipelines and validation systems.
colors:
  signal-blue: "#0066FF"
  signal-blue-text: "oklch(0.72 0.16 250)"
  cta-blue: "oklch(0.52 0.20 260)"
  field-black: "#0A0A0A"
  text-primary: "oklch(0.95 0.008 250)"
  text-secondary: "oklch(0.70 0.010 250)"
  text-muted: "oklch(0.62 0.010 250)"
  border: "oklch(0.25 0.008 250)"
  surface-raised: "oklch(0.18 0.008 250)"
  error: "oklch(0.72 0.14 25)"
typography:
  display:
    fontFamily: "Geist, Inter, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 6vw + 1rem, 5.5rem)"
    lineHeight: 1.05
  body:
    fontFamily: "Geist, Inter, system-ui, sans-serif"
    fontSize: "1rem"
    lineHeight: 1.65
  label:
    fontFamily: "Geist, Inter, system-ui, sans-serif"
    fontSize: "0.75rem"
    letterSpacing: "0.10em"
spacing:
  "1": "4px"
  "2": "8px"
  "3": "12px"
  "4": "16px"
  "6": "24px"
  "8": "32px"
  "12": "48px"
  "16": "64px"
  "24": "96px"
  "32": "128px"
  "48": "192px"
  section-desktop: "128px"
  section-mobile: "64px"
  container-max: "1200px"
components:
  button-primary:
    backgroundColor: "{colors.cta-blue}"
    textColor: "{colors.text-primary}"
  verified-metric:
    textColor: "{colors.signal-blue-text}"
---

<!-- SEED (tokens resolved): colors, type and spacing are decided. Re-run /impeccable document once Phase 3 code exists to capture the real components and generate the sidecar. -->

# Design System: José Picado Portfolio

## 1. Overview

**Creative North Star: "The Validated Signal"**

The site is a calm, near-black field where almost nothing competes for attention. Electric blue appears only where something has been verified or can be acted on: a confirmed metric, a primary CTA, the active state of a control. The visitor reads the page the way a validation system reads data. Everything is quiet until a signal passes the check, and then it lights up.

The density is low and the pacing deliberate. Large type carries the hierarchy, and generous negative space separates sections. Sections get 128px of vertical padding on desktop and 64px on mobile, inside a 1200px container. Motion is subtle and tied to scroll. The 3D data-point network in the hero responds to the visitor's scroll, so the page feels like a living system, not a decoration. Nothing animates on its own to attract attention.

This system explicitly rejects Bootstrap portfolios, AI-slop gradients, percentage skill bars, stock corporate photography, and Workday branding as identity.

**Spacing scale:** 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192px. Every margin, gap and padding comes from this scale. Vary it for rhythm: tight inside a group, wide between groups.

**Key Characteristics:**
- Restrained color: a dark field, cool tinted neutrals (hue 250), one electric-blue accent.
- Geist only, with two weights.
- Scroll-driven, physical motion. Nothing decorative.
- Proof-first content: tiered case studies with verified metrics, not tool inventories.

## 2. Colors

A restrained palette: a near-black field with cool neutrals tinted toward the accent, and one electric signal.

### Primary: the Signal family
One hue, three roles. Each role is tuned so it passes AA where it's used.
- **Signal Blue** (`signal-blue`): Non-text accents: focus rings, the active nav indicator, verified node dots in the 3D network and the Skills pipeline.
- **CTA Blue** (`cta-blue`, ≈ #105FD9): Primary button fill only. The label is Primary Text.
- **Signal Text** (`signal-blue-text`, renders as #49A9FF): Signal Blue used as text, meaning verified metrics and the active language label. It passes AA at normal size.

### Neutral
- **Field Black** (`field-black`): The page background.
- **Raised Surface** (`surface-raised`): Large project cards and form fields. This is a tonal step up from the field, not a shadow.
- **Hairline** (`border`): 1px dividers, input strokes, compact project row separators.
- **Primary Text** (`text-primary`): Headlines and body copy.
- **Secondary Text** (`text-secondary`): Subheads, project descriptions, supporting copy.
- **Muted Text** (`text-muted`): Tech tags, metadata, captions. Passes AA at every size.

### Feedback
- **Error** (`error`, renders as #F07F77): form validation messages and the invalid-field border only. It is never decorative and never on a button. Each error is also stated in text, so color is not the only signal. Added 2026-10-05 for the Contact form.

### Contrast check (recomputed 2026-10-05, WCAG 2.x)
| Pair | Ratio | Result |
|---|---|---|
| Primary Text on Field | 17.1:1 | AA |
| Secondary Text on Field / Raised | 7.4 / 7.0:1 | AA |
| Muted Text on Field / Raised | 5.4 / 5.2:1 | AA |
| Signal Text on Field / Raised | 8.0 / 7.6:1 | AA |
| Primary Text label on CTA Blue | 4.9:1 | AA (pure #fff would be 5.7:1, but it's banned by the No Pure Values Rule) |
| CTA Blue against Field (non-text) | 3.5:1 | Meets the 3:1 rule for UI components |
| Error text on Field / Raised | 7.5 / 7.1:1 | AA |
| Raised Surface (#0F1215) against Field | 1.05:1 | A deliberate subtle tonal step. It's a surface, not text. |

### Named Rules
**The Earned Signal Rule.** The Signal family appears only on primary CTAs, verified metrics, and active states. Anywhere else is a bug.

**The No Pure Values Rule.** Never use `#000` or `#fff`. Every neutral is tinted to hue 250.

## 3. Typography

**Display Font:** Geist (fallback: Inter, then system-ui)
**Body Font:** Geist (same stack)

**Character:** A single precise sans, technical without being cold. The hierarchy comes from scale and weight contrast, not from mixing typefaces.

### Hierarchy
- **Display** (display weight, `clamp(2.5rem, 6vw + 1rem, 5.5rem)`, ~1.05 line-height): The hero headline only, 2 lines at most.
- **Body** (body weight, 1rem / 1.65, max-width 70ch): Everything else. Section and project headings step up from body by scale (≥1.25 ratio) at body weight. Contrast comes from size, not added weights.
- **Label** (body weight, 0.75rem, uppercase, letter-spacing 0.10em, Muted Text): Tech tags, scope markers, pipeline stage names, metadata. It's still Geist, so there's no second typeface.

### Named Rules
**The Two Weights Rule.** Exactly two weights: one display, one body (exact values picked at implementation). A third weight is prohibited.

**The 70ch Rule.** No paragraph is wider than 70ch, even inside the 1200px container.

## 4. Elevation

The system is flat. Depth comes from tonal layering (Field Black → Raised Surface) and from the 3D hero itself, never from drop shadows.

### Named Rules
**The Flat Field Rule.** Surfaces don't cast shadows. Separate things with space, a tonal step, or a 1px Hairline.

## 5. Components

`[Concrete buttons, inputs and nav get documented once Phase 3 code exists.]` These compositions are decided now.

### Hero composition (signature)
- **Desktop (1440px):**
  - A two-column split, 55/45.
  - The hero fills `100vh` minus the nav height.
  - **Left column:**
    - display headline (2 lines max)
    - one-line subhead in Secondary Text
    - CTA row: primary "Book a call" (CTA Blue), plus a secondary ghost button
  - **Right column:** the 3D data-point network, centered vertically and bleeding past the container's right edge to the viewport.
- **Tablet (< 1024px):** single column. Headline above, 3D canvas at 50vh below. CTA row stays horizontal.
- **Mobile (390px):**
  - A single column, with the headline above.
  - The 3D canvas sits below it at `40vh`.
  - The CTA row wraps, and the primary button goes full-width.
- **No load animation on text:** the headline, subhead and CTAs render sharp and fully visible on first paint, with no blur or fade-in. Only the 3D network animates.
- **Canvas box:** reserved at its final size before the canvas loads (CLS < 0.1). Under `prefers-reduced-motion` and on low-power devices, it shows a static fallback of the same size.

### Project layout (signature)
- **Tiered, not a grid.**
- **Two hero projects** get large cards on Raised Surface, with room for the full narrative (problem, what was built, verified metric or scope marker, stack):
  - Personal Data Platform
  - Multi-Client Validation System
- **Three compact rows** separated by Hairlines: title, tech tag, one scope marker.
  - ETL Reporting Pipeline
  - Oracle Parts Normalization
  - Workday Conversions
- **Missing proof:** if a project has no verified metric or scope marker, it shows its title and tech tag only. Empty slots never render.
- **Metric color:** verified metrics render in Signal Text (`signal-blue-text`). Scope markers (row counts, client tier) stay in Primary Text, because they describe size, not verification.

### Skills pipeline (signature)
- **A pipeline, not an icon grid.** Four stages, left to right on desktop and top to bottom on mobile: **Ingest → Transform → Validate → Serve**. They're joined by a 1px Hairline connector with small node dots where it branches (see `inspiration.md` §3).
- Each stage has a Label-style stage name, then its tools in Secondary Text.
- A stage's node dot turns Signal Blue only when a verified case study proves that stage. All other dots stay `border`.
- No percentages, ratings or logos with no context.

## 6. Do's and Don'ts

### Do:
- **Do** keep the Signal family on primary CTAs (CTA Blue), verified metrics (Signal Text) and active states (Signal Blue) only. Anywhere else is a bug.
- **Do** render hero text sharp on first paint. Only the 3D network animates.
- **Do** set labels in Geist at 0.10em letter-spacing, uppercase. Never add a second typeface.
- **Do** tint every neutral to hue 250, using the five tokens above.
- **Do** use Geist with two weights: display for the hero, body for everything else.
- **Do** take every spacing value from the scale. Sections get 128px of vertical padding on desktop and 64px on mobile, inside a 1200px container.
- **Do** drive motion from scroll. The 3D hero reacts to scroll position. Ease out with exponential curves (quart, quint or expo).
- **Do** replace the 3D hero and scroll motion with a static fallback under `prefers-reduced-motion` and on low-power devices.

### Don't:
- **Don't** look like a **Bootstrap portfolio**: no template grids, default navbars, or "Hi, I'm X" heroes.
- **Don't** use **AI-slop gradients**: no purple-to-blue washes, gradient text (`background-clip: text`) or glowing blobs.
- **Don't** use **percentage skill bars**, self-rating rings or star ratings.
- **Don't** use **stock corporate photography**.
- **Don't** use **Workday branding as identity**: no Workday logos or colors, and no "Workday Consultant" framing.
- **Don't** add decorative animation, or anything that moves without the user scrolling or interacting.
- **Don't** use bounce or elastic easing on CTAs, or anywhere else.
- **Don't** use a third font weight, `#000`, `#fff`, drop shadows, glassmorphism, or side-stripe accent borders.
- **Don't** render five identical project cards, or an empty metric slot.
- **Don't** blur or fade in text on load, and don't present skills as an icon grid.
