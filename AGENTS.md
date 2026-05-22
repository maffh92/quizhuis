# AGENTS.md

Agentic wiring only.

## Routing

- Product app workspace: `apps/quizhuis`
- Skill catalog: `.github/skills`
- Harness runtime: `.harness`

## Skill-first policy

Use dedicated skills for project behavior and conventions:

- `rpi.orchestrator`
- `software-development-best-practices`
- `test-best-practices`
- `ux-ui-best-practices`
- `quizhuis-domain-language-structure`
- `harness-how-it-works`
- `documentation-writing-consistency`
- `rpi.research`
- `rpi.design-review`
- `rpi.plan`
- `rpi.implement`
- `rpi.review`
- `rpi.compound`

## Feature delivery orchestration (RPI + Design Review + Review + Compound)

- If the user asks to build/add/implement a feature, invoke `rpi.orchestrator`.
- The main agent remains the orchestrator and must not execute phase work directly.
- Orchestration contract is defined in `.github/skills/rpi-orchestrator/SKILL.md`:
  - phase agent profiles (`.github/agents/rpi-*.agent.md`)
  - strict phase order
  - explicit user design-approval checkpoint after design-review PASS
  - required gate artifacts
  - loop rules on `FAIL`
  - runtime rules for `/tasks`

## Harness execution mode

- Feature-flow compounding should use `rpi.compound`.
- General memory maintenance should use the `ce-compound` skill.
- Agents should run `ce-compound` after meaningful project changes and before final handoff.
