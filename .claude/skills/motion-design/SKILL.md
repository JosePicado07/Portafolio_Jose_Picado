---
name: motion-design
description: "Use to define animation, transitions, scroll behavior, microinteractions, reduced-motion handling, and motion implementation rules for frontend work."
---

# Motion Design

Use this skill when motion should improve orientation, feedback, hierarchy, or brand feel.

## Workflow

1. Identify where motion helps comprehension or interaction.
2. Define timing, easing, choreography, triggers, and exit behavior.
3. Specify reduced-motion alternatives.
4. Keep motion performant by favoring transform and opacity.
5. Avoid decorative movement that distracts from content or conversion.

## Output

Return:

- Motion principles
- Interaction inventory
- Timing and easing rules
- Scroll and viewport behavior
- Reduced-motion plan
- Implementation notes
- Performance risks

## References

- Read Reference: **frontend-standards.md** (inlined at the bottom of this document) for performance and reduced-motion rules.
- Read Reference: **motion-playbook.md** (inlined at the bottom of this document) when defining timing, choreography, scroll behavior, or interaction feedback.
- Read Reference: **review-gates.md** (inlined at the bottom of this document) when motion affects delivery readiness.

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

### motion-playbook.md

# Motion Playbook

Use this when motion needs to be designed rather than sprinkled in.

## Motion Roles

- Feedback: confirm user action
- Orientation: explain where content came from or where it goes
- Hierarchy: reveal important content first
- Continuity: connect related states
- Brand feel: express pace and personality

## Timing Defaults

- Micro feedback: 100-180ms
- UI transitions: 180-280ms
- Section reveals: 280-500ms
- Large choreographed sequences: only when the page concept justifies them

## Constraints

- Respect reduced motion.
- Prefer transform and opacity.
- Avoid layout-affecting animation.
- Avoid scroll effects that fight reading or input.

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

