---
name: rpi.review
description: Reviews outputs and code from RPI feature phases, identifies improvements, and records durable findings in harness memory. Use when research, planning, and implementation are complete and a quality review step is needed before compounding.
---

# RPI Review (QuizHuis)

## Quick start

1. Receive orchestrator inputs (`FEATURE_REQUEST`, `FEATURE_FOLDER`, paths).
2. Read:
   - `apps/quizhuis/demo/<FEATURE_FOLDER>/research.md`
   - `apps/quizhuis/demo/<FEATURE_FOLDER>/plan.md`
   - `apps/quizhuis/demo/<FEATURE_FOLDER>/implementation.md`
3. Invoke `software-development-best-practices` and apply KISS, minimalistic code, and clean code principles as review lenses.
4. Review delivered work quality and improvement opportunities.
5. Write findings to `.harness/memory/YYYY-MM-DD.md`.

## Review focus

1. Scope alignment: request vs delivered behavior.
2. Plan adherence: what matched, what diverged, why.
3. Technical quality: architecture fit, code clarity, risk hotspots.
4. Testing quality: coverage relevance and confidence gaps.
5. UX/UI fit: consistency with expected user flow.
6. Improvement opportunities: quick wins vs deferred items.
7. Simplicity audit: where complexity can be reduced while preserving requested behavior.

## Output requirements

- Update/create a dated memory file under `.harness/memory/`.
- Add a section titled: `## Feature Review: <FEATURE_FOLDER>`.
- Include:
  1. summary verdict
  2. what is good
  3. what can be done better
  4. prioritized improvements
  5. carry-over risks/limitations

## Guardrails

- Do not modify files outside `.harness/memory/` in this phase.
- Keep findings concise and actionable.
- Do not rewrite research/plan/implementation artifacts here.
