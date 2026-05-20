# Agentic Workflow Demo Prompts

This folder contains reusable templates for a 3-phase demo flow:

1. Research
2. Plan
3. Implement

## One-time setup per feature

1. Open `demo/00-feature-input.md`
2. Replace values once:
   - `FEATURE_REQUEST`
   - `FEATURE_FOLDER`

## Prompt files

1. `demo/00-feature-input.md` (set once)
2. `demo/01-research-prompt.md`
3. `demo/02-plan-prompt.md`
4. `demo/03-implement-prompt.md`

The 3 phase prompts read their inputs from `00-feature-input.md`, so you do not need to replace placeholders in each phase file.

## Output convention (repeatable per feature)

Each phase writes exactly one document in the same feature folder:

- `demo/<FEATURE_FOLDER>/research.md`
- `demo/<FEATURE_FOLDER>/plan.md`
- `demo/<FEATURE_FOLDER>/implementation.md`

The implementation report must describe in detail what was added, where (file-level), and why.

## Suggested demo sequence

1. Fill `00-feature-input.md` once
2. Run the Research prompt
3. Run the Plan prompt
4. Run the Implement prompt
