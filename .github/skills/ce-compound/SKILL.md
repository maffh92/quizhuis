---
name: ce.compound
description: Document a solved problem to compound your team's knowledge for future reference
---

# Compound: Document Solutions for Future Reference

Capture problem solutions while context is fresh, creating structured documentation that compounds your team's knowledge over time.

## Purpose

**Why "compound"?** Each documented solution compounds your team's knowledge:
- First time solving a problem → Research (30+ min)
- Document the solution → 5 min
- Next occurrence → Quick lookup (2 min)

**The feedback loop:**
```
Problem → Research → Solve → Document → Future Reference
    ↑                                           ↓
    └───────────────────────────────────────────┘
```

## When to Use

Use after:
- "That worked!"
- "It's fixed!"
- "Problem solved!"

For non-trivial problems that:
- Required investigation
- Had a non-obvious solution
- Could happen again

## Workflow

### 1. Context Analysis

Identify from the recent conversation:
- Problem type/category
- Error messages or symptoms
- Components involved
- What was tried (successes and failures)

### 2. Solution Extraction

Document:
- Root cause analysis
- Working solution with code examples
- Why the solution works
- What didn't work and why

### 3. Related Documentation

Search for:
- Related issues in the codebase
- Similar past solutions in `docs/solutions/`
- External documentation references

### 4. Prevention Strategy

Develop:
- How to prevent this in the future
- Test cases to catch it
- Patterns to avoid

### 5. Create Documentation

Create file in `docs/solutions/[category]/[slug].md`:

```markdown
---
title: [Descriptive Title]
category: [performance|security|database|ui|integration|build|test|runtime|logic]
date: YYYY-MM-DD
tags: [relevant, tags, here]
related:
  - docs/solutions/category/related-solution.md
  - https://github.com/org/repo/issues/123
---

# [Title]

## Problem

**Symptoms:**
- [What you observed]
- [Error messages]

**When it occurs:**
- [Conditions that trigger the issue]

## Investigation

**What was tried:**
1. [Approach 1] - Result: [outcome]
2. [Approach 2] - Result: [outcome]

**Root cause:**
[Technical explanation of why this happened]

## Solution

[Step-by-step fix with code examples]

```language
// Code example
```

**Why it works:**
[Explanation of the fix]

## Prevention

**To avoid this in the future:**
- [Practice or pattern to follow]
- [Test to add]
- [Config or setup to maintain]

## Related

- [Link to related issue]
- [Link to documentation]
- [Link to similar solution]
```

### 6. Organize by Category

Use these categories:
- `build-errors/` - Build and compilation issues
- `test-failures/` - Test-related problems
- `runtime-errors/` - Execution errors
- `performance-issues/` - Speed and resource problems
- `database-issues/` - Data and migration problems
- `security-issues/` - Vulnerabilities and auth problems
- `ui-bugs/` - Frontend and display issues
- `integration-issues/` - API and third-party problems
- `logic-errors/` - Business logic bugs

## Output

```
✓ Solution documented

File created:
  docs/solutions/[category]/[slug].md

This solution will be searchable for future reference when similar
issues occur in [component/module].

Summary:
- Problem: [brief description]
- Root cause: [brief explanation]
- Solution: [brief summary]

Next steps:
1. Review the documentation
2. Continue with your workflow
3. Share with team if relevant
```

## Key Principles

- **Capture while fresh** - Document immediately after solving
- **Be specific** - Include exact error messages and code
- **Explain the why** - Root cause matters as much as the fix
- **Link related content** - Connect to existing knowledge
- **Keep it searchable** - Use clear titles and tags

## The Compounding Philosophy

> Each unit of engineering work should make subsequent units of work easier—not harder.

By documenting solutions:
1. You solve it thoroughly once
2. Future occurrences become quick lookups
3. Team knowledge grows over time
4. Patterns emerge from documented solutions
