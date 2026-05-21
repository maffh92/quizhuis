---
name: rpi.plan
description: Executes the Plan phase of the QuizHuis RPI feature workflow and produces a single implementation plan document from research input. Use when research is complete and an execution plan is needed before coding.
---

# RPI Plan (QuizHuis)

## Quick start

1. Read feature input from `apps/quizhuis/demo/00-feature-input.md`.
2. Parse `FEATURE_REQUEST` and `FEATURE_FOLDER`.
3. Read `apps/quizhuis/demo/<FEATURE_FOLDER>/research.md`.
4. Invoke `software-development-best-practices` and apply KISS, minimalistic code, and clean code principles to the plan.
5. Produce exactly one file: `apps/quizhuis/demo/<FEATURE_FOLDER>/plan.md`.

## Workflow

Build an implementation plan only (no code changes):

1. prioritized task decomposition
2. dependency notes
3. acceptance criteria
4. test strategy
5. rollback plan

Focus on execution order and why each task is prioritized.
Prefer the smallest complete implementation path that meets the request.

## Guardrails

- Treat `00-feature-input.md` as the source of truth for request metadata.
- Do not implement code in this phase.
- Do not write `implementation.md` in this phase.
- Plan must be actionable for the implementation phase agent.
- If two plans satisfy requirements, choose the simpler one.
- Remove tasks that add avoidable abstraction or scope creep.
