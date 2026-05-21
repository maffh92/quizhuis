---
name: rpi.design-review
description: Reviews the RPI research artifact and produces a pass/fail design gate with required simplifications before planning. Use when research is complete and the flow needs explicit design approval before rpi.plan.
---

# RPI Design Review (QuizHuis)

## Quick start

1. Read feature input from `apps/quizhuis/demo/00-feature-input.md`.
2. Parse `FEATURE_REQUEST` and `FEATURE_FOLDER`.
3. Read `apps/quizhuis/demo/<FEATURE_FOLDER>/research.md`.
4. Invoke `software-development-best-practices` and apply KISS, minimalistic code, and clean code principles as review criteria.
5. Invoke `ux-ui-best-practices` and apply UX/UI quality and accessibility criteria in the review.
6. Produce exactly one file: `apps/quizhuis/demo/<FEATURE_FOLDER>/design-review.md`.

## Workflow

1. Evaluate request/design alignment:
   - user request coverage
   - architecture fit (frontend-only constraints)
   - data/state/flow clarity
   - UX flow clarity and accessibility fit
   - risk realism and mitigation
2. Evaluate simplicity:
   - avoidable complexity
   - unnecessary abstractions/scope
   - simplest viable direction
3. Decide verdict:
   - `PASS`: design is acceptable for planning
   - `FAIL`: design must be revised before planning

## Output requirements

`design-review.md` must include:

1. verdict (`PASS` or `FAIL`)
2. concise design summary
3. approved elements
4. blocking issues (if any)
5. required changes before planning
6. complexity reduction recommendations
7. next-step instruction:
   - `PASS` -> proceed to `rpi.plan`
   - `FAIL` -> return to `rpi.research` with listed required changes

## Guardrails

- Do not implement code in this phase.
- Do not modify `research.md` directly; review it and issue guidance in `design-review.md`.
- Keep findings concrete and actionable.
