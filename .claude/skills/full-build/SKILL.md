---
name: full-build
description: "Orchestrate a complete agency-grade frontend build from discovery to launch."
---

# Full Build Orchestration

Orchestrate a complete agency-grade frontend build from brief to shipped.

## When to Run

Run when starting a greenfield frontend project or a major feature that requires full strategy, design, implementation, and review coverage.

## Workflow

Execute each phase in sequence. Complete each phase before starting the next.

### Phase 1: Discovery & Strategy
- Run `brand-discovery` to establish context.
- Run `landing-page-strategy` (for marketing surfaces) or review architecture needs (for application surfaces).

### Phase 2: Creative & Visual System
- Run `creative-direction` to define the visual strategy.
- Run `visual-language` to build the full visual system.
- Run `design-system` to architect the component library.

### Phase 3: Technical Planning
- Run `frontend-architecture` to define rendering, state, data, and performance strategy.

### Phase 4: Implementation
- Implement components, pages, and content following the design system and architecture plan.
- Apply motion per the design direction. Run `motion-design` if motion strategy has not been defined.

### Phase 5: Review & Ship
- Run `accessibility-review` — resolve all critical and required findings.
- Run `performance-seo-review` — resolve all high-impact findings.
- Run `visual-qa` — resolve all regressions and design system deviations.
- Run `design-review` — final gate. Ship only after pass or conditional pass with known resolution plan.

## Standards

- Do not skip phases to save time. Each phase produces artifacts the next phase depends on.
- Do not declare implementation complete before review gates pass.
- Document assumptions made in the absence of clear direction.
- Every visual decision must trace to the visual language token system.
