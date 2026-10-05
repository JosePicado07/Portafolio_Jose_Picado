---
name: visual-language
description: "Use to define typography, color, layout, spacing, imagery, iconography, depth, and visual hierarchy for premium frontend experiences."
---

# Visual Language

Use this skill to convert strategy and creative direction into implementation-ready visual rules.

## Workflow

1. Review brand discovery and creative direction if available.
2. Define visual principles that support the audience and conversion goal.
3. Specify typography, color, spacing, layout grid, imagery, iconography, and depth.
4. Identify what the design must avoid to stay distinct.
5. Provide tokens or token candidates when implementation will follow.

## Output

Return a compact visual language spec:

- Typography system
- Color system
- Layout and spacing principles
- Imagery and illustration direction
- Component surface rules
- Interaction and state notes
- Anti-patterns

## Standards

Avoid one-note palettes, unreadable contrast, oversized type in dense interfaces, decorative clutter, and generic stock-like imagery.

## References

- Read Reference: **agency-standards.md** (inlined at the bottom of this document) before broad design recommendations.
- Read Reference: **visual-language-playbook.md** (inlined at the bottom of this document) when defining typography, color, layout, spacing, and imagery.
- Read Reference: **review-gates.md** (inlined at the bottom of this document) when the output will guide implementation.

## Shared Reference Standards (Inlined)

### agency-standards.md

# Frontend Agency Standards

Use these standards whenever a Frontend Agency skill plans, designs, builds, or reviews frontend work.

## Operating Principles

- Start with business context, audience, differentiation, and constraints.
- Define strategy before visual decisions.
- Define visual language before writing production UI.
- Treat accessibility, performance, SEO, and responsive behavior as core quality requirements.
- Prefer durable design systems over isolated page styling.
- Avoid generic AI defaults, placeholder copy, vague gradients, and visually interchangeable layouts.
- Never present weak work as finished. Name the risk and improve it.

## Required Delivery Gates

1. Discovery: audience, offer, goal, constraints, and success metrics are understood.
2. Direction: the page or product has a clear concept, not just a layout.
3. System: typography, color, spacing, imagery, components, and motion are coherent.
4. Implementation: components, state, assets, metadata, accessibility, and performance are planned.
5. Review: visual, accessibility, SEO, performance, and code quality checks are complete.

## Quality Threshold

Production-ready work must be specific, testable, maintainable, responsive, accessible, and aligned with the brand. If any major area is uncertain, state the assumption and continue with the safest professional default.

### visual-language-playbook.md

# Visual Language Playbook

Use this when defining the concrete look and feel of a frontend experience.

## Typography

Define hierarchy, not just fonts:

- Display: hero and campaign-level moments
- Heading: section structure
- Body: sustained reading
- Label: controls, metadata, navigation
- Numeric or data text when relevant

## Color

Define color roles:

- Background
- Surface
- Text
- Muted text
- Primary action
- Secondary action
- Accent
- Border
- Success, warning, error, and info

Avoid palettes where every major element is a variation of one hue unless the brand explicitly requires it.

## Layout

Specify:

- Container widths
- Section rhythm
- Grid behavior
- Density
- Alignment rules
- Mobile reflow rules

## Imagery

Prefer assets that reveal the product, place, workflow, person, or result. Avoid atmospheric images that could fit any brand.

### review-gates.md

# Review Gates

## Before Coding

- The audience and conversion goal are clear.
- The brand personality is specific enough to reject generic choices.
- Typography, color, imagery, spacing, and motion have a coherent direction.
- Key sections and content hierarchy are defined.

## Before Delivery

- No obvious responsive overflow or overlap.
- Text fits its containers.
- Interactive controls have hover, focus, disabled, and loading states where relevant.
- Forms have labels, validation, and useful errors.
- Images are optimized and have meaningful alt text unless decorative.
- Metadata, headings, canonical links, and structured data are correct where applicable.
- Lighthouse, axe, lint, typecheck, or equivalent checks have been run when available.

## If A Gate Fails

Do not hide the issue. State the blocker, propose the smallest professional fix, and continue improving when possible.

