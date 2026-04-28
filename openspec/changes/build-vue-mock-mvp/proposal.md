# Change Proposal: Build Vue Mock MVP

## Why

The prototype and product document are ready enough to start development, but connecting Supabase immediately would slow iteration while product interactions are still being validated.

## What Changes

- Create a Vue3 + TypeScript + Vite app.
- Implement the MVP pages with local mock data first.
- Keep data access behind repository interfaces so Supabase can replace mock repositories later.
- Preserve the current MVP product constraints from `docs/product-mvp.md`.

## Impact

- Adds the frontend application structure.
- Adds domain types for recipes and cooking logs.
- Adds mock repositories aligned with the future Supabase schema.
- Adds tests for core data rules and search/filter behavior.

