# Design: Build Vue Mock MVP

## Architecture

The MVP should use a clean frontend boundary:

- Views render pages and route-level layout.
- Components render reusable UI pieces.
- Stores coordinate user interactions and app state.
- Repositories provide data access.
- Mock repositories are used first.
- Supabase repositories are introduced later without changing view logic.

## Data Boundary

Create domain types that mirror the future Supabase tables:

- `Recipe`
- `CookingLog`
- `RecipeFamiliarity`
- `CookingResult`

All mock data should use these types. Components should not know whether data came from mock arrays or Supabase.

## Suggested Folders

```text
src/
  app/
  assets/
  components/
  features/
    recipes/
    cooking-logs/
    search/
  router/
  stores/
  data/
    mock/
    repositories/
  types/
```

## First Implementation Strategy

Build the app in this order:

1. Scaffold Vue3 + TypeScript + Vite.
2. Add domain types and mock data.
3. Add repository interfaces and mock repositories.
4. Add routing and shell layout.
5. Build home, all recipes, recipe detail, new recipe, and new cooking log pages.
6. Add search/filter behavior.
7. Add image upload UI states as local-only states.
8. Add tests for domain behavior and repository/search logic.

## Supabase Later

When the mock MVP feels right, add:

- Supabase client configuration.
- SQL migrations for `recipes` and `cooking_logs`.
- Storage buckets for recipe covers and cooking log photos.
- Supabase repository implementations.

