---
name: ce.compound
description: Maintains durable project memory for this repository by analyzing local session context and updating dated memory files with retention rules. Use when finishing meaningful work, preparing handoff, or when asked to update project memory.
---

# CE Compound: Project Memory Management

Manage durable memory in `.harness/memory/` so future sessions can recover important context quickly.

## Quick start

1. Analyze local session files and current repo context for durable knowledge.
2. Update today's memory file in `.harness/memory/YYYY-MM-DD.md` (create if missing).
3. Remove dated memory files older than 30 days.
4. Only modify files under `.harness/memory/`.

## What to store

Keep only durable project memory:

- decisions and tradeoffs
- architecture and structural conventions
- domain language conventions
- unresolved action items and known constraints

Remove transient details:

- one-off command output
- temporary debugging notes
- duplicate or stale entries

## Workflow

1. **Collect context**
   - Read local session artifacts and recent repo changes.
   - Identify what matters for future work on this repo.
2. **Write today's file**
   - Target file: `.harness/memory/YYYY-MM-DD.md`
   - If it exists, update it.
   - If it does not exist, create it.
3. **Enforce retention**
   - Scan `.harness/memory/` for dated files.
   - Delete files older than a rolling 30-day window.
4. **Keep memory concise**
   - Prefer short, scan-friendly sections and bullets.
   - Keep content actionable for the next session.

## Guardrails

- Do not modify files outside `.harness/memory/`.
- Do not invent facts that are not present in session/repo context.
- Prefer updating existing relevant entries over duplicating notes.
