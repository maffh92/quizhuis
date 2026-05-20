# AGENTS.md

Global agent guidance for this repository.

## Repository structure

- `.github/skills/`: Copilot skills and skill assets.
- `.harness/`: harness runtime files (memory, session scratchpad, prompts, scripts).
- `apps/quizhuis/`: the QuizHuis application (code, docs, plans, tests, build config).
- Root is for repo-level conventions and future monorepo/harness infrastructure.

## Working defaults

- Treat `apps/quizhuis` as the current app workspace.
- Run app commands from `apps/quizhuis`:
  - `npm run lint`
  - `npm run test`
  - `npm run build`
- Keep app-specific changes inside `apps/quizhuis` unless a change is explicitly repo-wide.

## QuizHuis domain and language conventions

- Code language: English.
- UI language: Dutch.
- Domain terms: `Quiz`, `Question`, `Phase`, `Player`, `Simulated Player`, `Player Preset`.
- Scoring floor is always `0`.
- Quiz data lives in `apps/quizhuis/public/quizzes/`.

## Harness/monorepo direction

- Keep Copilot skill discovery in `.github/skills`.
- Keep harness runtime concerns in `.harness/`, separate from product code in `apps/`.
- `session/` is local scratch space and ignored by git.
- `memory/` is durable and versioned; `.harness/scripts/roll-harness-memory.sh` runs the Copilot CLI prompt in `.harness/prompt/compound.md`.
- Run compounding manually for now (no git pre-commit hook).
