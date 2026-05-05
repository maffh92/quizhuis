# React Best Practices Reference

## Props Interface Pattern

```tsx
interface ButtonProps {
  /** Button label text */
  label: string;
  /** Visual variant */
  variant?: "primary" | "secondary" | "danger";
  /** Size of the button */
  size?: "sm" | "md" | "lg";
  /** Whether the button is disabled */
  isDisabled?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Optional icon to render before label */
  icon?: React.ReactNode;
}
```

Key principles:
- Use descriptive names (`isDisabled` not `disabled`, `onSubmit` not `handler`)
- Provide defaults via destructuring
- Use union types for constrained values
- Add JSDoc for non-obvious props

## Component Template

```tsx
import { useState } from "react";

interface ComponentNameProps {
  title: string;
  variant?: "default" | "compact";
  onAction?: (id: string) => void;
}

export function ComponentName({
  title,
  variant = "default",
  onAction,
}: ComponentNameProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-gray-200 p-4">
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      {variant === "default" && (
        <button
          type="button"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          onClick={handleToggle}
        >
          {isOpen ? "Close" : "Open"}
        </button>
      )}
    </div>
  );
}
```

## Barrel Export Pattern

```ts
// index.ts
export { ComponentName } from "./ComponentName";
export type { ComponentNameProps } from "./ComponentName";
```

## Custom Hook Pattern

Extract when:
- Logic is reused across components
- Component has complex state management
- Side effects (fetching, subscriptions) clutter the component

```tsx
// hooks/useToggle.ts
import { useCallback, useState } from "react";

interface UseToggleReturn {
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
}

export function useToggle(initialState = false): UseToggleReturn {
  const [isOpen, setIsOpen] = useState(initialState);

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return { isOpen, toggle, open, close };
}
```

## Data Fetching Hook Pattern

```tsx
// hooks/useFetchData.ts
import { useEffect, useState } from "react";

interface UseFetchDataReturn<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

export function useFetchData<T>(url: string): UseFetchDataReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const json = await response.json();
        setData(json);
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
    return () => controller.abort();
  }, [url]);

  return { data, isLoading, error };
}
```

## Composition Pattern

Prefer composition over deeply nested props:

```tsx
// Good — composable
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
  <Card.Footer>
    <Button>Save</Button>
  </Card.Footer>
</Card>

// Avoid — prop drilling
<Card
  title="Title"
  body="Content"
  footerButtonLabel="Save"
  onFooterButtonClick={handleSave}
/>
```

## Tailwind CSS Conventions

- Use semantic class grouping: layout → spacing → typography → colors → effects
- Extract repeated class strings to variables when used 3+ times
- Use `cn()` utility (clsx + tailwind-merge) for conditional classes:

```tsx
import { cn } from "@/lib/utils";

interface BadgeProps {
  variant: "success" | "warning" | "error";
  children: React.ReactNode;
}

export function Badge({ variant, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        {
          "bg-green-100 text-green-800": variant === "success",
          "bg-yellow-100 text-yellow-800": variant === "warning",
          "bg-red-100 text-red-800": variant === "error",
        }
      )}
    >
      {children}
    </span>
  );
}
```

## Common Anti-Patterns to Avoid

| Anti-Pattern | Instead Do |
|---|---|
| `useEffect` for derived state | Compute during render |
| State for values derivable from props | Calculate inline |
| `any` type | Proper generics or union types |
| Inline object/array literals in JSX | Memoize or hoist outside component |
| Index as key in dynamic lists | Use stable unique IDs |
| `useEffect` to sync props to state | Use props directly or key reset |
| Prop drilling > 2 levels deep | Context or composition |
