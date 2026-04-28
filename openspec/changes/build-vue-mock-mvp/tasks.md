# Tasks: Build Vue Mock MVP

## 1. Project Setup

- [x] Scaffold Vue3 + TypeScript + Vite.
- [x] Add Vue Router.
- [x] Add Pinia.
- [x] Add Vitest and Vue Test Utils.
- [x] Add base app shell and route page shells.

## 2. Domain And Data Layer

- [x] Define recipe and cooking log TypeScript types.
- [x] Create mock recipe data.
- [x] Create mock cooking log data.
- [x] Create repository interfaces.
- [x] Implement mock recipe repository.
- [x] Implement mock cooking log repository.

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

- [x] Test recipe creation defaults.
- [x] Test cooking log cannot be created without recipe id.
- [ ] Test home recent list uses cooking logs.
- [ ] Test home want list uses recipes.
- [ ] Test search result ordering.
- [ ] Test all recipes filters.
