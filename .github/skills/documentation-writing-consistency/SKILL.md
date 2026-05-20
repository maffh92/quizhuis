---
name: documentation-writing-consistency
description: Writes and updates repository documentation with cross-file consistency checks so docs stay aligned after changes. Use when behavior, architecture, structure, terminology, or harness flow changes, or when the user asks to update docs across files.
---

# Documentation Writing & Consistency

Keep documentation accurate, synchronized, and aligned with code changes across this repository.

## Quick start

1. Identify what changed and which docs are impacted.
2. Update all relevant docs in the same change.
3. Reconcile terminology and paths across files.
4. Run a consistency sweep before handoff.

## Workflow

1. **Map impact to docs**
   - Use the update matrix in [REFERENCE.md](REFERENCE.md).
   - Include both primary docs and derived docs that may now be stale.
2. **Apply updates together**
   - Update related docs in one pass, not one-by-one over multiple sessions.
   - Prefer small, precise edits that preserve existing style and structure.
3. **Enforce consistency**
   - Terms must match canonical domain language in `apps/quizhuis/CONTEXT.md`.
   - Paths, commands, and behavior descriptions must match current repo reality.
   - Remove contradictions between README, ADRs, skills, and harness docs.
4. **Consistency sweep**
   - Search for stale terms/paths after edits.
   - Ensure no doc still references replaced workflows.

## Required checks

- All affected documentation surfaces were considered.
- No conflicting definitions across files.
- Examples/commands still run from the documented location.
- New behavior is documented where users and contributors expect it.

## Example trigger

If harness memory flow changes, update:

- `.harness/README.md`
- relevant skill docs in `.github/skills/`
- `AGENTS.md` wiring references (if routing or execution policy changed)
