---
name: rpi-plan
description: Executes the Plan phase of the QuizHuis RPI flow. Use when research is complete and an execution plan is needed before coding.
---

# RPI Plan (QuizHuis)

## Quick start

1. Read feature input from: `demo/00-feature-input.md`
2. Treat that file as the source of truth for `FEATURE_REQUEST` and `FEATURE_FOLDER`
3. Use this research document as input: `demo/<FEATURE_FOLDER>/research.md`
4. Create an implementation plan only — no code changes yet
5. Produce exactly one file: `demo/<FEATURE_FOLDER>/plan.md`

## Workflow

Build an implementation plan:

1. **Prioritized task decomposition** — break the work into ordered tasks
2. **Dependency notes** — which tasks depend on others?
3. **Acceptance criteria** — what must be true for this to be done?
4. **Test strategy** — how will this be verified?
5. **Rollback plan** — what if something goes wrong?

Focus on execution order and explain why each task is prioritized.
Do not write implementation details as code changes in this phase.

## Output

`plan.md` must include:

1. Prioritized task list with reasoning
2. Dependencies between tasks
3. Acceptance criteria for each task
4. Test strategy (unit tests, integration tests, manual checks)
5. Rollback plan

## Guardrails

- Treat `00-feature-input.md` as the source of truth for request metadata
- Do not write code in this phase
- Do not write implementation files in this phase
- Plan must be actionable for the implementation phase
