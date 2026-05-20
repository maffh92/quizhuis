---
name: harness-how-it-works
description: Explains and operates the local agentic harness layout, memory lifecycle, and compounding flow used in this repository. Use when changing harness behavior, troubleshooting memory updates, or documenting harness operations.
---

# Harness: How It Works

## Quick start

1. Harness runtime files live under `.harness/`.
2. Session scratch data is local-only: `.harness/session/` (gitignored).
3. Durable memory is versioned in `.harness/memory/`.
4. Agent memory compounding should use the `ce-compound` skill.
5. Manual utility script (fallback for local/manual operation):
   - `./.harness/scripts/roll-harness-memory.sh`
   - script prompt source: `.harness/prompt/compound.md`

## Memory lifecycle

1. Compound analyzes local session context for this repo.
2. It writes durable memory in dated files under `.harness/memory/` (`YYYY-MM-DD.md`).
3. If today's file exists, it updates that file; otherwise it creates it.
4. It enforces a rolling retention window of 30 days by deleting older files.
5. It only modifies files under `.harness/memory/`.

## Directory intent

- `.harness/prompt`: prompt definitions that drive harness behavior
- `.harness/scripts`: executable harness automation scripts
- `.harness/memory`: persistent project memory
- `.harness/session`: local temporary/session artifacts

## Guardrails

- No automatic git pre-commit wiring for compounding.
- Keep harness behavior explicit, observable, and manually triggered.
