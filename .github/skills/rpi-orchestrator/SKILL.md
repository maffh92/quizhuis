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
- `apps/quizhuis/demo/<FEATURE_FOLDER>/design-review.md` (latest design-review-cycle verdict must be `PASS`)
- `apps/quizhuis/demo/<FEATURE_FOLDER>/plan.md`
- `apps/quizhuis/demo/<FEATURE_FOLDER>/implementation.md`
- `apps/quizhuis/demo/<FEATURE_FOLDER>/review.md` (latest review-cycle verdict must be `PASS`)

## Loop rules

1. If the latest design-review-cycle verdict in `design-review.md` is `FAIL`, rerun `rpi.research` with required changes, then rerun `rpi.design-review`.
2. If implementation reports unmet must-have acceptance criteria, rerun `rpi.implement` with required fixes.
3. If the latest review-cycle verdict in `review.md` is `FAIL`, rerun `rpi.implement` with required fixes from that latest review cycle and explicit regression protection for already passing must-have criteria, then rerun `rpi.review`.
4. Start `rpi.compound` only after the latest review-cycle verdict in `review.md` is `PASS`.

## Runtime rules

1. Run one background phase agent at a time.
2. Confirm each spawned agent is visible in `/tasks`.
3. Wait for completion and read full result before next phase.
4. Stop and report blockers if a phase cannot proceed.
5. Return concise final status with phase outcomes, artifact paths, and blockers (if any).
6. Validate artifact completeness before advancing:
   - `research.md` contains feature request decomposition (`FR-id` coverage), explicit outcome contract, capability coverage contract (`FR-id` -> implementation direction -> verification intent), and rejected implementation options mapped to unmet `FR-id` values.
   - the latest appended design-review-cycle section in `design-review.md` contains explicit PASS/FAIL gate, request-coverage matrix, and required changes.
   - `plan.md` contains feature coverage matrix (`FR-id` -> planned tasks -> verification evidence).
   - `implementation.md` contains acceptance-criteria verification evidence with evidence types and traces.
   - the latest appended review-cycle section in `review.md` contains must-have verification evidence (criterion -> evidence type -> evidence trace -> result), request-fulfillment matrix (`FR-id` -> expected outcome -> evidence trace -> result), and explicit PASS/FAIL gate.
7. Reject/loop any phase output that claims success without required verification evidence.
8. Use the latest appended design-review-cycle section in `design-review.md` and latest appended review-cycle section in `review.md` as the active gate state.
9. Reject/loop review outputs with `FAIL` verdicts that do not map blockers to unmet must-have criteria or critical risks.
10. Reject/loop `PASS` review outputs when any interactive must-have criterion is supported only by code-inspection evidence.
11. Require primary user-flow evidence in `review.md` to reference executable proof (automated test artifact and/or deterministic manual run with observed result).
12. When implementation touches UI/controller/state/routing/network files, require at least one automated integration-style evidence reference for the primary flow in `review.md`; otherwise loop with required fixes.
13. Reject/loop review outputs that do not use append-only review-cycle formatting (`## Review Cycle: <ISO-8601 timestamp>`).
14. Reject/loop when any `FR-id` in `research.md` is missing from `plan.md` feature coverage matrix.
15. Reject/loop review outputs that mark `PASS` while any `FR-id` in the request-fulfillment matrix is missing or not `PASS`.
16. Reject/loop when research/design artifacts downscope explicit requested outcomes due effort/complexity or defer required capability to later phases without explicit user request.
