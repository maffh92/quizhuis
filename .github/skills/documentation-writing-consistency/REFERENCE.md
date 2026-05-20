# Documentation Update Matrix

Use this matrix to decide which docs to update together.

| Change type | Primary docs | Usually also update |
|---|---|---|
| Product behavior, modes, UX flow | `apps/quizhuis/README.md` | `apps/quizhuis/CONTEXT.md`, ADRs in `apps/quizhuis/docs/adr/` |
| Domain vocabulary or semantics | `apps/quizhuis/CONTEXT.md` | `apps/quizhuis/README.md`, related skill docs |
| Architecture decisions or tradeoffs | ADR in `apps/quizhuis/docs/adr/` | `apps/quizhuis/README.md`, relevant skill docs |
| Repo/app structure move or path changes | `AGENTS.md` | `.github/skills/*`, `.harness/README.md`, app README commands/paths |
| Harness process/rules changes | `.harness/README.md` | `AGENTS.md`, `harness-how-it-works`, `ce-compound` |
| Skill behavior changes | that skill's `SKILL.md` | `.github/skills/README.md`, `AGENTS.md` if routing changed |

## Consistency rules

1. **Single source for domain terms**: `apps/quizhuis/CONTEXT.md`.
2. **Single source for agent routing/wiring**: `AGENTS.md`.
3. **Skill discovery index**: `.github/skills/README.md` must include new/renamed skills.
4. **Harness operation details**: `.harness/README.md` and harness-related skills must agree.

## Cross-file consistency checklist

- No stale paths (for example, old root paths after monorepo moves).
- No contradictory workflow instructions between docs.
- Commands are shown in the correct working directory.
- Naming is consistent with the domain glossary.
- References to scripts/skills match actual file names.
