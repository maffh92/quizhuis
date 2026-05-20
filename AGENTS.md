# AGENTS.md

Agentic wiring only.

## Routing

- Product app workspace: `apps/quizhuis`
- Skill catalog: `.github/skills`
- Harness runtime: `.harness`

## Skill-first policy

Use dedicated skills for project behavior and conventions:

- `software-development-best-practices`
- `test-best-practices`
- `ux-ui-best-practices`
- `quizhuis-domain-language-structure`
- `harness-how-it-works`
- `documentation-writing-consistency`
- `rpi.research`
- `rpi.plan`
- `rpi.implement`
- `rpi.review`
- `rpi.compound`

## Feature delivery orchestration (RPI + Review + Compound)

- If the user asks to build/add/implement a feature, run the full RPI + Review + Compound flow.
- The main agent is an orchestrator and must not execute phase work itself.
- For each phase, spawn a separate background agent (one phase per agent) using the task tool (`mode: "background"`).
- Run phases in strict order:
  1. `rpi.research`
  2. `rpi.plan`
  3. `rpi.implement`
  4. `rpi.review`
  5. `rpi.compound`
- Each phase agent must invoke its corresponding skill first, then perform only that phase scope.
- Wait for each background phase agent to finish before launching the next phase.
- The orchestrator resolves required inputs and passes them to each RPI phase agent.
- RPI outputs per feature folder:
  - `apps/quizhuis/demo/<FEATURE_FOLDER>/research.md`
  - `apps/quizhuis/demo/<FEATURE_FOLDER>/plan.md`
  - `apps/quizhuis/demo/<FEATURE_FOLDER>/implementation.md`
- `rpi.review` writes feature-review findings to `.harness/memory/` (dated memory file).
- `rpi.compound` reads feature memory findings and decides whether docs should be updated; if yes, it updates docs consistently across the repo.
- Phase gates:
  - Do not start `rpi.plan` before `research.md` exists.
  - Do not start `rpi.implement` before `plan.md` exists.
  - Do not start `rpi.review` before `implementation.md` exists.
  - Do not start `rpi.compound` before review findings are present in `.harness/memory/`.
- Runtime behavior:
  - After launching a phase agent, report waiting and stop tool use until completion notification.
  - On completion, read the background agent result (`read_agent`) and only then proceed.
  - If a phase fails, stop the flow and report the blocker instead of skipping ahead.
- Do not collapse phases into one run.

## Harness execution mode

- Feature-flow compounding should use `rpi.compound`.
- General memory maintenance should use the `ce-compound` skill.
- Agents should run `ce-compound` after meaningful project changes and before final handoff.
