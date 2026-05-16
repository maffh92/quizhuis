# Agentic Workflow Demo Prompts

This document contains ready-to-run prompts for a 3-phase demo:

1. Research (Grounding and Context Gathering)
2. Plan (Task Decomposition and Prioritization)
3. Implement (Action and Execution)

Use FEATURE_NAME as a placeholder and replace it with your chosen feature.

## Research Phase Prompts

### Prompt 1
Act as a Research Agent for QuizHuis. Feature to investigate: FEATURE_NAME. Do not write code yet. Analyze user value, fit with the current frontend-only architecture, likely data model changes, UX impact, and top technical risks. Validate key claims with at least 2 online sources and clearly separate facts from assumptions. Deliver a complete feature design package: recommended implementation direction, high-level system fit, new user/system flow, and which existing parts likely need modification. Include a Mermaid workflow diagram of the new flow.

### Prompt 2
You are in discovery mode only. For FEATURE_NAME in QuizHuis, produce a decision brief with: problem statement, who benefits, constraints, options considered, and recommended approach. Include constraints from this project style: static quiz JSON, client-side flow, and minimal scope for demo purposes. No implementation steps yet, only what should be built and why. Also deliver a high-level design showing how the feature fits the current system, which components/modules are impacted, and what the new flow looks like. Include a Mermaid diagram and open questions that must be resolved before planning.

### Prompt 3
Run a rapid feasibility study for FEATURE_NAME in QuizHuis. Compare 2 to 3 implementation approaches, including trade-offs for complexity, demo impact, and testability. Use current app behavior and architecture as context, then validate uncertain points via online documentation. Return a concise recommendation with confidence level, a short risk register, and a high-level integration design that calls out what needs to change. Include a Mermaid diagram of the proposed end-to-end flow.

## Plan Phase Prompts

### Prompt 1
Act as a Planning Agent. Input is the approved research recommendation for FEATURE_NAME. Create an implementation plan only, no code changes yet. Provide: prioritized task decomposition, dependency notes, acceptance criteria, test strategy, and rollback plan. Focus on execution order and why each task is prioritized.

### Prompt 2
Create a delivery plan for FEATURE_NAME in QuizHuis with strict sequencing. Start with smallest vertical slice, then progressive enhancements. Include effort estimate per task, risk per task, explicit done criteria, and a clear prioritization rationale.

### Prompt 3
Turn this research outcome into a sprint-ready execution plan for FEATURE_NAME. Focus on task granularity, clear ownership steps for an AI coding agent, and checkpoints after each major change. Include: prerequisites, implementation phases, tests to run per phase, release note points, and a short list of scope cuts if time runs out. Prioritize work by impact, risk, and dependency order.

## Implement Phase Prompts

### Prompt 1
Act as an Implementation Agent for QuizHuis. Implement FEATURE_NAME exactly as defined in the approved plan. Keep changes minimal and aligned with existing architecture and coding style. Run relevant tests after changes and fix regressions you introduce. Return: files changed, what was implemented, test results, and any remaining risks.

### Prompt 2
Execute the FEATURE_NAME plan in small verified steps. After each step, validate behavior and continue only if checks pass. Avoid unrelated refactors and keep scope to MVP. At the end, provide a completion report with acceptance criteria status, test evidence, and known limitations.

### Prompt 3
Implement FEATURE_NAME for demo-readiness in QuizHuis. Prioritize visible user impact first, then correctness, then polish. Follow project constraints and do not add backend dependencies. Validate with tests and a manual demo path. Return a structured summary: implemented items, deferred items, verification results, and next safe iteration.

## Suggested Demo Sequence

1. Run Research Prompt 1
2. Run Plan Prompt 1
3. Run Implement Prompt 1

This gives the cleanest narrative for presentations: what to build, how to build it, then evidence it works.
