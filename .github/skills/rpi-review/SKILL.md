---
name: rpi.review
description: Reviews RPI outputs and implementation quality, produces a PASS/FAIL review gate artifact, and records durable findings in harness memory. Use when implementation is complete and progression to compounding must be explicitly approved.
---

# RPI Review (QuizHuis)

## Quick start

1. Receive orchestrator inputs (`FEATURE_REQUEST`, `FEATURE_FOLDER`, paths).
2. Read:
   - `apps/quizhuis/demo/<FEATURE_FOLDER>/research.md`
   - `apps/quizhuis/demo/<FEATURE_FOLDER>/design-review.md`
   - `apps/quizhuis/demo/<FEATURE_FOLDER>/plan.md`
   - `apps/quizhuis/demo/<FEATURE_FOLDER>/implementation.md`
3. Invoke `software-development-best-practices` and apply KISS, minimalistic code, and clean code principles as review lenses.
4. Review delivered work quality and improvement opportunities.
5. Write gate result to `apps/quizhuis/demo/<FEATURE_FOLDER>/review.md`.
6. Write findings to `.harness/memory/YYYY-MM-DD.md`.

## Review focus

1. Scope alignment: request vs delivered behavior.
2. Plan adherence: what matched, what diverged, why.
3. Technical quality: architecture fit, code clarity, risk hotspots.
4. Testing quality: coverage relevance and confidence gaps.
5. UX/UI fit: consistency with expected user flow.
6. Improvement opportunities: quick wins vs deferred items.
7. Simplicity audit: where complexity can be reduced while preserving requested behavior.

## Output requirements

1. Produce exactly one gate file:
   - `apps/quizhuis/demo/<FEATURE_FOLDER>/review.md`
2. `review.md` must include:
   1. verdict (`PASS` or `FAIL`)
   2. blocking issues (required for `FAIL`)
   3. required fixes before progression
   4. quality observations
   5. next-step instruction:
      - `PASS` -> proceed to `rpi.compound`
      - `FAIL` -> return to `rpi.implement` with required fixes
3. Update/create a dated memory file under `.harness/memory/`.
4. Add a section titled: `## Feature Review: <FEATURE_FOLDER>`.
5. Include:
   1. summary verdict
   2. what is good
   3. what can be done better
   4. prioritized improvements
   5. carry-over risks/limitations

## Guardrails

- Do not modify app source code in this phase.
- Limit writes to:
  - `apps/quizhuis/demo/<FEATURE_FOLDER>/review.md`
  - `.harness/memory/YYYY-MM-DD.md`
- Keep findings concise and actionable.
- Do not rewrite research/plan/implementation artifacts here.
