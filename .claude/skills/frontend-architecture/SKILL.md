---
name: frontend-architecture
description: "Use to plan scalable frontend implementation, component architecture, routing, styling, state, data, assets, accessibility, SEO, and performance."
---

# Frontend Architecture

Use this skill before implementing or refactoring production frontend code.

## Workflow

1. Inspect the existing project structure before recommending changes.
2. Identify framework, routing, rendering mode, styling system, testing setup, and deployment assumptions.
3. Define page, component, data, asset, and token boundaries.
4. Plan accessibility, SEO, performance, and responsive behavior as implementation requirements.
5. Keep changes scoped to the requested work and existing architecture unless a larger change is justified.

## Output

Return:

- Architecture summary
- File and component plan
- Data and state plan
- Styling and token plan
- Accessibility, SEO, and performance requirements
- Test and validation plan
- Rollout risks

## References

- Read Reference: **frontend-architecture-playbook.md** (inlined at the bottom of this document) when planning project structure, components, routing, rendering, or validation.
- Read Reference: **frontend-standards.md** (inlined at the bottom of this document) for engineering standards.
- Read Reference: **review-gates.md** (inlined at the bottom of this document) before finalizing implementation plans.

## Shared Reference Standards (Inlined)

### frontend-architecture-playbook.md

# Frontend Architecture Playbook

Use this when planning implementation inside an existing or new frontend project.

## Inspection Checklist

- Framework and router
- Rendering mode
- Styling approach
- Component organization
- Token source
- Data fetching
- Asset pipeline
- Test setup
- Accessibility tooling
- Performance tooling

## Planning Checklist

- Files to create or change
- Components and ownership boundaries
- Data contracts
- Content model
- Responsive behavior
- Metadata and structured data
- Image and font strategy
- Validation commands

## Engineering Standard

Prefer the host project's established patterns. Avoid broad rewrites unless the current structure prevents a production-quality result.

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

