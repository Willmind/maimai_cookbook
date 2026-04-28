# Tasks: Build Vue Mock MVP

## 1. Project Setup

- [ ] Scaffold Vue3 + TypeScript + Vite.
- [ ] Add Vue Router.
- [ ] Add Pinia.
- [ ] Add Vitest and Vue Test Utils.
- [ ] Add base app shell and route page shells.

## 2. Domain And Data Layer

- [ ] Define recipe and cooking log TypeScript types.
- [ ] Create mock recipe data.
- [ ] Create mock cooking log data.
- [ ] Create repository interfaces.
- [ ] Implement mock recipe repository.
- [ ] Implement mock cooking log repository.

## 3. Core Pages

- [ ] Build home page with search, recent cooking logs, and want-to-make recipes.
- [ ] Build all recipes page with search and lightweight filters.
- [ ] Build new recipe page with only recipe name required.
- [ ] Build recipe detail page with recipe fields and cooking log timeline.
- [ ] Build new cooking log page entered from recipe detail only.

## 4. Behavior

- [ ] Implement search grouping: recipes first, cooking logs second.
- [ ] Implement recipe filters: all, want-to-make, new, done, frequent.
- [ ] Implement create recipe with default `want_to_make = true`.
- [ ] Implement create cooking log with required `recipe_id`.
- [ ] Implement one-image UI state for recipe cover and cooking log photo.

## 5. Verification

- [ ] Test recipe creation defaults.
- [ ] Test cooking log cannot be created without recipe id.
- [ ] Test home recent list uses cooking logs.
- [ ] Test home want list uses recipes.
- [ ] Test search result ordering.
- [ ] Test all recipes filters.
