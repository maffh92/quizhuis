# Research Phase Prompt (R)

Replace `{{FEATURE_REQUEST}}` with the user request you want to demo.

```text
Act as a Research Agent for QuizHuis. Feature request to investigate: {{FEATURE_REQUEST}}.
Do not write code yet.

Analyze:
- user value
- fit with the current frontend-only architecture
- likely data model/state changes
- UX impact
- top technical risks

Validate key claims with at least 2 online sources and clearly separate facts from assumptions.

Deliver a complete feature design package:
1. recommended implementation direction
2. high-level system fit
3. new user/system flow
4. existing parts likely needing modification
5. Mermaid workflow diagram of the new flow
```
