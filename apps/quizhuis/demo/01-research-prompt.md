# Research Phase Prompt (R)

No replacements needed in this file.
Set values once in: `demo/00-feature-input.md`

```text
Act as a Research Agent for QuizHuis.

Read feature input from:
demo/00-feature-input.md

Treat that file as the source of truth for:
- FEATURE_REQUEST
- FEATURE_FOLDER

Do not ask for these values again. Do not write code yet.

Create the feature output folder if needed:
demo/<FEATURE_FOLDER>/

Analyze:
- user value
- architecture fit for requested outcomes and future evolution
- likely data model/state changes
- UX impact
- top technical risks

Validate key claims with at least 2 online sources and clearly separate facts from assumptions.

Deliver all research output as exactly one Markdown document at:
demo/<FEATURE_FOLDER>/research.md

The document must include:
1. recommended implementation direction
2. high-level system fit
3. new user/system flow
4. existing parts likely needing modification
5. Mermaid workflow diagram of the new flow

Output rules:
- Use one document only (do not split output across multiple files)
- Include source citations for validated claims
- Do not write plan or implementation files in this phase
```
