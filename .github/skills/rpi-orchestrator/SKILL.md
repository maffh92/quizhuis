---
name: rpi.orchestrator
description: Orchestrates the full QuizHuis RPI flow by spawning phase agents, enforcing artifact gates, and looping on FAIL verdicts until a working PASS outcome is reached. Use when the user asks to build/add/implement a feature end-to-end.
---

# RPI Orchestrator (QuizHuis)

## Quick start

1. Stay in orchestrator role; do not execute phase work directly.
2. Resolve `FEATURE_REQUEST` and `FEATURE_FOLDER` from:
   - user input, and/or
   - `apps/quizhuis/demo/00-feature-input.md` when available.
3. Spawn phase agents via Copilot CLI `/tasks` in background mode.
4. Enforce phase gates and loop rules before advancing.

## Phase execution order

1. `rpi.research`
2. `rpi.design-review`
3. `rpi.plan`
4. `rpi.implement`
5. `rpi.review`
6. `rpi.compound`

Use these dedicated phase agent profiles:

- `.github/agents/rpi-research.agent.md`
- `.github/agents/rpi-design-review.agent.md`
- `.github/agents/rpi-plan.agent.md`
- `.github/agents/rpi-implement.agent.md`
- `.github/agents/rpi-review.agent.md`
- `.github/agents/rpi-compound.agent.md`

## Gate artifacts

Required outputs per feature:

- `apps/quizhuis/demo/<FEATURE_FOLDER>/research.md`
- `apps/quizhuis/demo/<FEATURE_FOLDER>/design-review.md` (must be `PASS`)
- `apps/quizhuis/demo/<FEATURE_FOLDER>/plan.md`
- `apps/quizhuis/demo/<FEATURE_FOLDER>/implementation.md`
- `apps/quizhuis/demo/<FEATURE_FOLDER>/review.md` (must be `PASS`)

## Loop rules

1. If design review verdict is `FAIL`, rerun `rpi.research` with required changes, then rerun `rpi.design-review`.
2. If implementation reports unmet must-have acceptance criteria, rerun `rpi.implement` with required fixes.
3. If review verdict is `FAIL`, rerun `rpi.implement` with required fixes from `review.md`, then rerun `rpi.review`.
4. Start `rpi.compound` only after review verdict is `PASS`.

## Runtime rules

1. Run one background phase agent at a time.
2. Confirm each spawned agent is visible in `/tasks`.
3. Wait for completion and read full result before next phase.
4. Stop and report blockers if a phase cannot proceed.
5. Return concise final status with phase outcomes, artifact paths, and blockers (if any).
