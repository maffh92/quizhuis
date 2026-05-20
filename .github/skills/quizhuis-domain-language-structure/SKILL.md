---
name: quizhuis-domain-language-structure
description: Provides the canonical QuizHuis domain vocabulary, language conventions, and repository structure mapping. Use when naming concepts, implementing quiz flow behavior, or aligning code/docs with project terminology.
---

# QuizHuis Domain, Language, and Structure

## Quick start

1. Use canonical domain terms from `apps/quizhuis/CONTEXT.md`.
2. Keep code language English and UI language Dutch.
3. Keep quiz flow language centered on phases.
4. Preserve scoring floor behavior (`0` minimum).
5. Keep quiz data in `apps/quizhuis/public/quizzes/`.

## Canonical domain terms

- `Quiz`, `Question`, `Phase`, `Player`, `Simulated Player`, `Player Preset`
- Question types: `Matching Question`, `Multiple Choice Question`, `Boolean Question`
- Matching entities: `Item` and `Target`
- Flow concepts: `Lobby`, `Result Reveal`, `Leaderboard`, `Host Mode`, `Player Mode`

Avoid introducing alternate terms that dilute the domain language.

## Repository structure map

- `apps/quizhuis/src`: product source code
- `apps/quizhuis/docs/adr`: architecture decisions
- `apps/quizhuis/CONTEXT.md`: domain glossary and conventions
- `.harness`: local harness runtime artifacts
- `.github/skills`: reusable skill guidance

## Usage rule

When unsure about naming, behavior intent, or relationships, defer to `apps/quizhuis/CONTEXT.md` before implementing.
