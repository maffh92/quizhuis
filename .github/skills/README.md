# Skills Index

## Project-specific engineering

- **[software-development-best-practices](./software-development-best-practices/SKILL.md)** — Implementation quality guardrails with KISS, minimalistic code, and clean code principles.
- **[test-best-practices](./test-best-practices/SKILL.md)** — Behavior-first testing guidelines for strategy, design, and reliability.
- **[ux-ui-best-practices](./ux-ui-best-practices/SKILL.md)** — UX/UI heuristics for clarity, accessibility, and responsive interaction design.
- **[quizhuis-domain-language-structure](./quizhuis-domain-language-structure/SKILL.md)** — Canonical QuizHuis domain language and repository structure conventions.
- **[harness-how-it-works](./harness-how-it-works/SKILL.md)** — How the local harness directories, memory lifecycle, and compounding flow work.
- **[documentation-writing-consistency](./documentation-writing-consistency/SKILL.md)** — Update relevant docs across the repo and keep terminology, paths, and behavior descriptions consistent.

## Feature delivery flow (RPI + Design Review + Review + Compound)

- **[rpi-orchestrator](./rpi-orchestrator/SKILL.md)** — Main-orchestrator skill that spawns phase agents, enforces gates, and loops on FAIL verdicts until the flow is complete.
- **[rpi-research](./rpi-research/SKILL.md)** — Research phase for feature requests, producing `research.md` with validated claims and system fit.
- **[rpi-design-review](./rpi-design-review/SKILL.md)** — Design gate after research, producing `design-review.md` with PASS/FAIL and required simplifications before planning.
- **[rpi-plan](./rpi-plan/SKILL.md)** — Planning phase for feature requests, producing `plan.md` from research artifacts.
- **[rpi-implement](./rpi-implement/SKILL.md)** — Implementation phase for feature requests, producing code changes and an `implementation.md` verification report.
- **[rpi-review](./rpi-review/SKILL.md)** — Review gate that produces `review.md` (`PASS`/`FAIL`) and records findings in harness memory.
- **[rpi-compound](./rpi-compound/SKILL.md)** — Runs only after review `PASS`, then decides/executes repository documentation updates from review findings.

## Existing workflow skills

- **[caveman](./caveman/SKILL.md)** — Ultra-compressed communication mode. Cuts token usage ~75% by dropping filler while keeping full technical accuracy.
- **[ce-compound](./ce-compound/SKILL.md)** — Maintain durable harness memory with daily files and a 30-day rolling retention window.
- **[grill-me](./grill-me/SKILL.md)** — Get relentlessly interviewed about a plan or design until every branch of the decision tree is resolved.
- **[grill-with-docs](./grill-with-docs/SKILL.md)** — Stress-test a plan against project docs and update context/ADRs.
- **[improve-codebase-architecture](./improve-codebase-architecture/SKILL.md)** — Deepen architecture and improve modularity/testability.
- **[react-best-practices](./react-best-practices/SKILL.md)** — Scaffold production-ready React components.
- **[tdd](./tdd/SKILL.md)** — Test-driven development workflow (red-green-refactor).
- **[to-prd](./to-prd/SKILL.md)** — Turn current context into a PRD and publish it.
- **[write-a-skill](./write-a-skill/SKILL.md)** — Create new skills with proper structure and progressive disclosure.
