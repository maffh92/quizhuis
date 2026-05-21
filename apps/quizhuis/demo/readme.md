# Agentic Workflow Demo (RPI + Design Review + Review + Compound)

This folder contains reusable input/templates for a 6-step feature flow:

1. Research
2. Design Review
3. Plan
4. Implement
5. Review
6. Compound

## One-time setup per feature

1. Open `demo/00-feature-input.md`
2. Replace values once:
   - `FEATURE_REQUEST`
   - `FEATURE_FOLDER`

## Input + phase references

1. `demo/00-feature-input.md` (set once)
2. `demo/01-research-prompt.md`
3. `demo/02-plan-prompt.md`
4. `demo/03-implement-prompt.md`
5. Design Review / Review / Compound behavior is defined in:
   - `.github/skills/rpi-design-review/SKILL.md`
   - `.github/skills/rpi-review/SKILL.md`
   - `.github/skills/rpi-compound/SKILL.md`

The canonical execution path is now via skills:

- `rpi.research`
- `rpi.design-review`
- `rpi.plan`
- `rpi.implement`
- `rpi.review`
- `rpi.compound`

Prompt references map to all phases and are useful for manual demo runs. The skill-driven flow is still the canonical path.

## Output convention (repeatable per feature)

Each phase writes exactly one document in the same feature folder:

- `demo/<FEATURE_FOLDER>/research.md`
- `demo/<FEATURE_FOLDER>/design-review.md`
- `demo/<FEATURE_FOLDER>/plan.md`
- `demo/<FEATURE_FOLDER>/implementation.md`
- `demo/<FEATURE_FOLDER>/review.md`

The implementation report must describe in detail what was added, where (file-level), and why.
The review gate must independently verify must-have acceptance criteria from the plan/request (not just implementation report claims) before `PASS`.
`design-review.md` is append-only across research/design retry loops: each design-review run appends a new "Design Review Cycle" section, and the latest section is the active planning gate verdict.
`review.md` is append-only across retry loops: each review run appends a new "Review Cycle" section, and the latest section is the active gate verdict.

Post-implementation artifacts:

- Review findings are written to:
  - `demo/<FEATURE_FOLDER>/review.md` (phase gate artifact)
  - `.harness/memory/YYYY-MM-DD.md` (durable memory)
- Compound runs only after the latest review-cycle verdict is `PASS` and records doc-update decisions in memory.

## Suggested demo sequence

1. Fill `00-feature-input.md` once
2. Run `rpi.research`
3. Run `rpi.design-review`
4. If the latest design-review-cycle verdict is `FAIL`, return to `rpi.research` with required changes
5. Run `rpi.plan`
6. Run `rpi.implement`
7. Run `rpi.review` (independent must-have verification + primary flow validation)
8. If the latest review-cycle verdict is `FAIL`, return to `rpi.implement` with required fixes
9. Run `rpi.compound`
