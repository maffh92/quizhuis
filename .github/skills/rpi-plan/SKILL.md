---
name: rpi.plan
description: Executes the Plan phase of the QuizHuis RPI feature workflow and produces a single implementation plan document from research input. Use when research is complete and an execution plan is needed before coding.
---

# RPI Plan (QuizHuis)

## Quick start

1. Read feature input from `apps/quizhuis/demo/00-feature-input.md`.
2. Parse `FEATURE_REQUEST` and `FEATURE_FOLDER`.
3. Read:
   - `apps/quizhuis/demo/<FEATURE_FOLDER>/research.md`
   - `apps/quizhuis/demo/<FEATURE_FOLDER>/design-review.md` (use the latest appended design-review-cycle section)
4. Confirm the latest design-review-cycle verdict in `design-review.md` is `PASS`.
5. Invoke `software-development-best-practices` and apply KISS, minimalistic code, and clean code principles to the plan.
6. Produce exactly one file: `apps/quizhuis/demo/<FEATURE_FOLDER>/plan.md`.

## Workflow

Build an implementation plan only (no code changes):

1. prioritized task decomposition
2. dependency notes
3. acceptance criteria (mark must-have vs nice-to-have)
4. feature coverage matrix (`FR-id` -> planned tasks -> verification evidence)
5. test strategy
6. rollback plan

Focus on execution order and why each task is prioritized.
Prefer the smallest complete implementation path that meets the request.
Test strategy must map every must-have criterion to planned verification evidence (`unit-test`, `integration-test`, `manual-run`) and where that evidence will be produced (file path and/or command).
Treat criteria involving multi-step user interaction, cross-component/state transitions, navigation/deep-linking, or async/network behavior as interactive must-haves; default these to automated integration coverage.
Use manual-only verification for interactive must-haves only when automation is truly infeasible, and document why plus a deterministic manual script.

## Guardrails

- Treat `00-feature-input.md` as the source of truth for request metadata.
- Do not implement code in this phase.
- Do not write `implementation.md` in this phase.
- Plan must be actionable for the implementation phase agent.
- If two plans satisfy requirements, choose the simpler one.
- Remove tasks that add avoidable abstraction or scope creep.
- Do not leave must-have criteria without an executable verification path.
- If an interactive must-have cannot be automated, require explicit manual steps and expected outcomes in the plan.
- Every `FR-id` from `research.md` must be mapped in the feature coverage matrix before planning can pass.
- Do not introduce scope that is not traceable to request decomposition, required fixes, or explicit risk mitigation.
- If the latest design-review-cycle verdict in `design-review.md` is `FAIL`, stop and route back to `rpi.research` with required changes.
