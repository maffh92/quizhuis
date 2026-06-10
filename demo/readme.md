# Agentic Workflow Demo — Research, Plan, Implement (RPI)

A 3-phase demo showing how an AI agent can research, plan, and implement a feature:

1. **Research** — Analyze the feature, validate claims, recommend an approach
2. **Plan** — Break the work into tasks, define acceptance criteria, test strategy
3. **Implement** — Build the feature, verify it works, write a report

## Get started

A sample feature is already filled in at `demo/00-feature-input.md` (Live Rooms). No setup needed — just run the skills.

To try your own feature, edit `FEATURE_REQUEST` and `FEATURE_FOLDER` in that file.

## How to run

Each phase is a skill. Run them in sequence:

1. **Research**: Use the `rpi-research` skill — produces `demo/<FEATURE_FOLDER>/research.md`
2. **Plan**: Use the `rpi-plan` skill — produces `demo/<FEATURE_FOLDER>/plan.md`
3. **Implement**: Use the `rpi-implement` skill — produces `demo/<FEATURE_FOLDER>/implementation.md`

## Output convention (repeatable per feature)

Each phase writes exactly one document in the same feature folder:

- `demo/<FEATURE_FOLDER>/research.md`
- `demo/<FEATURE_FOLDER>/plan.md`
- `demo/<FEATURE_FOLDER>/implementation.md`

The implementation report must describe in detail what was added, where (file-level), and why.

