---
name: rpi.compound
description: Reads feature review memory and determines whether repository documentation needs updates, then applies consistent doc changes when required. Use when the review phase is done and the feature workflow needs documentation compounding.
---

# RPI Compound (QuizHuis)

## Quick start

1. Receive orchestrator inputs (`FEATURE_FOLDER`, memory file path/date).
2. Read the feature review entry in `.harness/memory/YYYY-MM-DD.md`.
3. Invoke `software-development-best-practices` and keep documentation guidance aligned with KISS, minimalistic code, and clean code principles.
4. Decide whether docs must be updated.
5. If yes, update all relevant docs consistently.
6. Record the compound decision back into `.harness/memory/YYYY-MM-DD.md`.

## Decision logic

Update documentation when review findings include:

- behavior changes not reflected in docs
- architecture/flow changes missing from docs
- terminology/path mismatches
- outdated instructions caused by the feature

## Documentation surfaces to check

- `apps/quizhuis/README.md`
- `apps/quizhuis/CONTEXT.md`
- `apps/quizhuis/docs/adr/`
- `apps/quizhuis/demo/readme.md`
- `.harness/README.md`
- `AGENTS.md`
- `.github/skills/README.md`
- any touched skill docs

## Output requirements

1. Append a `## Compound: <FEATURE_FOLDER>` section in the same dated memory file with:
   - decision (`docs-update-required` or `no-doc-update-needed`)
   - rationale
   - list of updated docs (if any)
2. Keep documentation terminology and paths consistent across files.

## Guardrails

- If docs are updated, keep edits scoped and precise.
- Do not make unrelated code changes.
- Preserve alignment with `documentation-writing-consistency` conventions.
