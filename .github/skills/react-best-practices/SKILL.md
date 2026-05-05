---
name: react-best-practices
description: Scaffold production-ready React components with TypeScript, Tailwind CSS, and modern patterns. Use when user wants to create a new React component, mentions "component", "scaffold", or wants React code following best practices.
---

# React Best Practices

Scaffold a single React component from a user description. Output follows modern React conventions: functional components, hooks, TypeScript, and Tailwind CSS.

## Workflow

1. **Clarify** — ask user for:
   - Component name and purpose
   - Key props it should accept
   - Any state or side effects needed

2. **Generate** — create the component at `src/components/<Name>/`:
   - `<Name>.tsx` — functional component with typed props interface
   - `index.ts` — barrel export

3. **Extract hooks** — if the component has reusable logic (data fetching, form handling, subscriptions), extract into `hooks/use<Logic>.ts` within the component folder.

4. **Verify** — run TypeScript compiler to confirm no type errors.

5. **Suggest testing** — recommend user invokes the `tdd` skill to add tests for the component's behavior.

## Component Structure

```
src/components/<Name>/
├── <Name>.tsx       # Component implementation
├── index.ts         # Barrel export
└── hooks/           # Only if logic warrants extraction
    └── use<Logic>.ts
```

## Rules

See [REFERENCE.md](REFERENCE.md) for detailed patterns and examples.

- Functional components only (no class components)
- TypeScript with strict props interfaces
- Tailwind CSS for styling (no CSS files)
- Extract custom hooks when logic is reusable
- Props interface with descriptive names, JSDoc on complex props, sensible defaults
- No educational comments — clean production-ready code
- Prefer composition over prop drilling
- Use `React.memo` only when profiling shows a need
- Prefer named exports over default exports
