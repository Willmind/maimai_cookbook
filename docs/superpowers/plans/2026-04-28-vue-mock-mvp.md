# Vue Mock MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the first Vue3 MVP of 麦麦手记 using local mock data and a repository boundary ready for Supabase.

**Architecture:** The app uses Vue Router pages, focused feature components, typed domain models, and repositories for all data access. The first repository implementation uses local mock data; a later Supabase implementation can replace it without rewriting page components.

**Tech Stack:** Vue 3, TypeScript, Vite, Vue Router, Pinia, Vitest, Vue Test Utils, Supabase later.

---

## File Structure Target

```text
src/
  main.ts
  App.vue
  router/
    index.ts
  types/
    recipe.ts
    cooking-log.ts
  data/
    mock/
      recipes.ts
      cooking-logs.ts
    repositories/
      recipeRepository.ts
      cookingLogRepository.ts
      mockRecipeRepository.ts
      mockCookingLogRepository.ts
  features/
    recipes/
    cooking-logs/
    search/
  stores/
  styles/
```

## Phase 1: Scaffold

- [ ] Create Vue3 + TypeScript + Vite project in the repository.
- [ ] Add Vue Router, Pinia, Vitest, and Vue Test Utils.
- [ ] Add routes for home, all recipes, new recipe, recipe detail, and new cooking log.
- [ ] Port the visual direction from `personal-recipe-notebook.html` into the Vue app shell.

## Phase 2: Domain Types

- [ ] Create `Recipe` type with fields from `docs/product-mvp.md`.
- [ ] Create `CookingLog` type with fields from `docs/product-mvp.md`.
- [ ] Create `RecipeFamiliarity = 'new' | 'done' | 'frequent'`.
- [ ] Create `CookingResult = 'good' | 'ok' | 'failed'`.
- [ ] Add fixed frontend tags as a constant list.

## Phase 3: Mock Repositories

- [ ] Add mock recipes with realistic MVP data.
- [ ] Add mock cooking logs linked by `recipe_id`.
- [ ] Add `RecipeRepository` interface.
- [ ] Add `CookingLogRepository` interface.
- [ ] Implement mock repositories.
- [ ] Add tests for recipe defaults and cooking log relationship rules.

## Phase 4: Pages

- [ ] Build home page showing search, recent cooking logs, and want-to-make recipes.
- [ ] Build all recipes page with search and five lightweight filters.
- [ ] Build new recipe page where only name is required.
- [ ] Build recipe detail page with source, description, tags, want state, familiarity, ingredients, method, next note, and cooking logs.
- [ ] Build new cooking log page where recipe name is read-only.

## Phase 5: Search And Filtering

- [ ] Implement recipe-first search grouping.
- [ ] Prioritize recipe name matches.
- [ ] Search ingredients, method, tags, and cooking log notes.
- [ ] Sort cooking log results by recent date first.
- [ ] Add tests for search ordering.

## Phase 6: Image UI States

- [ ] Add single-image UI component state for empty, uploading, uploaded, and failed.
- [ ] Support replace and delete actions in local state.
- [ ] Do not connect Supabase Storage in this phase.

## Phase 7: MVP Verification

- [ ] Run unit tests.
- [ ] Run the dev server.
- [ ] Check desktop and mobile responsive layouts.
- [ ] Verify the MVP acceptance criteria in `docs/product-mvp.md`.
- [ ] Record any gaps before adding Supabase.

## Later: Supabase Integration

- [ ] Create Supabase schema for `recipes`.
- [ ] Create Supabase schema for `cooking_logs`.
- [ ] Create Storage buckets for recipe covers and cooking log photos.
- [ ] Implement Supabase repositories behind the same interfaces.
- [ ] Add environment variables for Supabase URL and anon key.

