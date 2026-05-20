# Agentic Workflow Demo (RPI + Review + Compound)

This folder contains reusable input/templates for a 5-step feature flow:

1. Research
2. Plan
3. Implement
4. Review
5. Compound

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

The canonical execution path is now via skills:

- `rpi.research`
- `rpi.plan`
- `rpi.implement`
- `rpi.review`
- `rpi.compound`

The 3 prompt references still map to the first 3 phases. Review/Compound are skill-driven post-implementation steps.

## Output convention (repeatable per feature)

Each phase writes exactly one document in the same feature folder:

- `demo/<FEATURE_FOLDER>/research.md`
- `demo/<FEATURE_FOLDER>/plan.md`
- `demo/<FEATURE_FOLDER>/implementation.md`

The implementation report must describe in detail what was added, where (file-level), and why.

Post-implementation artifacts:

- Review findings are written to `.harness/memory/YYYY-MM-DD.md`
- Compound decides whether docs must be updated and records that decision in memory

## Suggested demo sequence

1. Fill `00-feature-input.md` once
2. Run `rpi.research`
3. Run `rpi.plan`
4. Run `rpi.implement`
5. Run `rpi.review`
6. Run `rpi.compound`
