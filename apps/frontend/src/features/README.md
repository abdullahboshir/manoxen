# Features Directory

This directory contains feature-based modules following the "Feature-Sliced Design" pattern.

## Structure

Each feature should have:

```
features/
├── catalog/
│   ├── api/        # RTK Query endpoints
│   ├── components/ # Feature-specific components
│   ├── hooks/      # Feature-specific hooks
│   ├── types/      # Feature-specific types
│   └── index.ts    # Public exports
├── sales/
├── iam/
└── inventory/
```

## Guidelines

1. **Self-contained**: Each feature should be as independent as possible
2. **Public API**: Export only what's needed via `index.ts`
3. **No cross-feature imports**: Features should not import from each other directly
4. **Shared code**: Use `@manoxen/*` packages or `src/components` for shared code
