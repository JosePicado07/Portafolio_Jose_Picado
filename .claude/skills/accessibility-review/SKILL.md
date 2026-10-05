---
name: accessibility-review
description: "Use to audit frontend accessibility, including semantics, labels, keyboard navigation, focus management, contrast, ARIA, forms, media, and motion."
---

# Accessibility Review

Use this skill before delivery or whenever a user asks for accessibility, WCAG, keyboard, screen reader, semantic HTML, or form review.

## Workflow

1. Inspect available code, screenshots, rendered pages, or descriptions.
2. Prioritize user-impacting issues over stylistic preferences.
3. Check landmarks, headings, labels, names, roles, states, keyboard flow, focus, contrast, media, and motion.
4. Recommend native HTML before ARIA.
5. Provide concrete fixes and verification steps.

## Output

Lead with findings ordered by severity:

- Critical blockers
- Major issues
- Minor issues
- Verification commands or manual checks
- Residual risk

## References

- Read Reference: **frontend-standards.md** (inlined at the bottom of this document) for accessibility standards.
- Read Reference: **review-playbook.md** (inlined at the bottom of this document) when writing findings and verification steps.
- Read Reference: **review-gates.md** (inlined at the bottom of this document) before marking work ready.

## Shared Reference Standards (Inlined)

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

### review-playbook.md

# Review Playbook

Use this for final critique, visual QA, accessibility review, and performance or SEO review.

## Finding Format

Each actionable finding should include:

- Severity
- Evidence
- User or business impact
- Specific fix
- Verification step

## Severity

- Critical: blocks release, access, conversion, crawling, or core interaction
- Major: materially weakens quality, trust, usability, performance, or maintainability
- Minor: polish issue with limited user impact

## Review Discipline

Lead with risks and defects. Keep praise brief. Do not approve a page because it is functional if it is generic, inaccessible, slow, unstable, or visually unpolished.

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

