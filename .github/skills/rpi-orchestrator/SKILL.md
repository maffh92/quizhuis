---
name: rpi.orchestrator
description: Orchestrates the full QuizHuis RPI flow by spawning phase agents, enforcing artifact gates, inserting explicit user design approval before planning, and looping on FAIL verdicts until a working PASS outcome is reached. Use when the user asks to build/add/implement a feature end-to-end.
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
3. user design approval checkpoint (explicit user approval required)
4. `rpi.plan`
5. `rpi.implement`
6. `rpi.review`
7. `rpi.compound`

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

Required conversational gate before planning:

- explicit user approval of the latest `PASS` design-review cycle

## Loop rules

1. If the latest design-review-cycle verdict in `design-review.md` is `FAIL`, rerun `rpi.research` with required changes, then rerun `rpi.design-review`.
2. If the latest design-review-cycle verdict is `PASS` but the user requests design changes, rerun `rpi.research` with that user feedback, then rerun `rpi.design-review`.
3. Do not start `rpi.plan` until the user explicitly approves the latest `PASS` design-review cycle.
4. If implementation reports unmet must-have acceptance criteria, rerun `rpi.implement` with required fixes.
5. If the latest review-cycle verdict in `review.md` is `FAIL`, rerun `rpi.implement` with required fixes from that latest review cycle and explicit regression protection for already passing must-have criteria, then rerun `rpi.review`.
6. Start `rpi.compound` only after the latest review-cycle verdict in `review.md` is `PASS`.

## Design approval checkpoint protocol

After the latest design-review cycle is `PASS`, pause orchestration and request one explicit user decision:

- `approve-design` -> continue to `rpi.plan`
- `request-design-changes` -> rerun `rpi.research` + `rpi.design-review` with the user feedback

If no explicit decision is provided, remain in `awaiting-user-design-approval`.

## Runtime rules

1. Run one background phase agent at a time.
2. Confirm each spawned agent is visible in `/tasks`.
3. Wait for completion and read full result before next phase.
4. Stop and report blockers if a phase cannot proceed.
5. After design-review `PASS`, return a concise design-approval packet and stop with status `awaiting-user-design-approval` unless explicit user approval is already provided in the current turn context.
6. Return concise final status with phase outcomes, artifact paths, and blockers (if any).
7. Validate artifact completeness before advancing:
   - `research.md` contains feature request decomposition (`FR-id` coverage), explicit outcome contract, capability coverage contract (`FR-id` -> implementation direction -> verification intent), and rejected implementation options mapped to unmet `FR-id` values.
   - the latest appended design-review-cycle section in `design-review.md` contains explicit PASS/FAIL gate, request-coverage matrix, and required changes.
   - `plan.md` contains feature coverage matrix (`FR-id` -> planned tasks -> verification evidence).
   - `implementation.md` contains acceptance-criteria verification evidence with evidence types and traces.
   - the latest appended review-cycle section in `review.md` contains must-have verification evidence (criterion -> evidence type -> evidence trace -> result), request-fulfillment matrix (`FR-id` -> expected outcome -> evidence trace -> result), and explicit PASS/FAIL gate.
8. Reject/loop any phase output that claims success without required verification evidence.
9. Use the latest appended design-review-cycle section in `design-review.md` and latest appended review-cycle section in `review.md` as the active gate state.
10. Reject/loop review outputs with `FAIL` verdicts that do not map blockers to unmet must-have criteria or critical risks.
11. Reject/loop `PASS` review outputs when any interactive must-have criterion is supported only by code-inspection evidence.
12. Require primary user-flow evidence in `review.md` to reference executable proof (automated test artifact and/or deterministic manual run with observed result).
13. When implementation touches UI/controller/state/routing/network files, require at least one automated integration-style evidence reference for the primary flow in `review.md`; otherwise loop with required fixes.
14. Reject/loop review outputs that do not use append-only review-cycle formatting (`## Review Cycle: <ISO-8601 timestamp>`).
15. Reject/loop when any `FR-id` in `research.md` is missing from `plan.md` feature coverage matrix.
16. Reject/loop review outputs that mark `PASS` while any `FR-id` in the request-fulfillment matrix is missing or not `PASS`.
17. Reject/loop when research/design artifacts downscope explicit requested outcomes due effort/complexity or defer required capability to later phases without explicit user request.
18. Reject/stop when planning starts without explicit user approval of the latest `PASS` design-review cycle.
