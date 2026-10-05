---
name: design-system
description: "Use to translate brand and visual direction into scalable design tokens, component rules, states, patterns, and frontend implementation guidance."
---

# Design System

Use this skill when a project needs durable tokens and component rules rather than isolated styling.

## Workflow

1. Identify the host framework and styling approach when a codebase exists.
2. Convert visual language into tokens for color, typography, spacing, radius, shadow, motion, and breakpoints.
3. Define component anatomy, states, variants, and accessibility expectations.
4. Specify how tokens should be represented in the target stack.
5. Flag one-off styling choices that should become tokens or be removed.

## Output

Return:

- Token map
- Component inventory
- State model
- Responsive rules
- Accessibility requirements
- Implementation notes
- Migration or adoption risks

## References

- Read Reference: **design-system-playbook.md** (inlined at the bottom of this document) when defining tokens, components, states, or variants.
- Read Reference: **frontend-standards.md** (inlined at the bottom of this document) for implementation constraints.
- Read Reference: **review-gates.md** (inlined at the bottom of this document) before declaring a system production-ready.

## Shared Reference Standards (Inlined)

### design-system-playbook.md

# Design System Playbook

Use this when converting design direction into reusable implementation rules.

## Token Families

- Color
- Typography
- Spacing
- Radius
- Shadow
- Border
- Motion
- Breakpoints
- Z-index

## Component Contract

Each reusable component should define:

- Purpose
- Anatomy
- Variants
- States
- Responsive behavior
- Accessibility requirements
- Content constraints

## State Coverage

Include default, hover, focus, active, disabled, loading, selected, error, and empty states when relevant.

## Implementation Discipline

Use existing project conventions. Introduce a new token or component only when it reduces repeated decisions or protects consistency.

### frontend-standards.md

# Frontend Implementation Standards

## Architecture

- Prefer the host project's existing framework, routing, styling, component, and data patterns.
- Keep components small enough to test and review, but avoid needless abstraction.
- Use typed contracts for reusable data structures when the codebase supports them.
- Keep design tokens centralized and avoid one-off raw values in repeated UI.
- Use semantic HTML first, ARIA only when native semantics are insufficient.

## Accessibility

- Preserve heading order and landmarks.
- Provide visible labels for form fields.
- Ensure icon-only controls have accessible names.
- Preserve keyboard navigation, focus order, and visible focus states.
- Check contrast for text, icons, controls, and focus indicators.
- Respect reduced-motion preferences.

## Performance

- Optimize images with correct dimensions, modern formats, lazy loading where appropriate, and meaningful alt text.
- Avoid unnecessary client-side JavaScript.
- Prefer server-rendered or statically generated marketing surfaces when feasible.
- Keep animation work on transform and opacity where possible.
- Avoid layout shifts from late-loading media, fonts, or dynamic content.

## SEO

- Use unique titles and meta descriptions.
- Use canonical URLs where appropriate.
- Keep crawlable links for key navigation.
- Use structured data only when accurate.
- Ensure the primary content exists in the delivered HTML for public marketing pages.

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

