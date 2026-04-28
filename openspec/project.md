# Project: 麦麦手记

## Purpose

麦麦手记 helps one person keep a practical kitchen notebook: recipes they want to make, recipes they already know, and cooking logs that capture what happened each time they cooked.

## Current Phase

Build the first Vue3 MVP with local mock data. Supabase integration comes after core interactions are proven.

## Product Principles

- Keep the app personal and lightweight.
- Prefer useful kitchen memory over complete recipe management.
- Avoid workflow dead ends: a cooking log must always belong to an existing recipe.
- Keep MVP scope intentionally small so the first version can ship.

## Technical Direction

- Vue 3, TypeScript, Vite.
- Vue Router for pages.
- Pinia for app state when shared state becomes useful.
- Repository interfaces for data access.
- Local mock repositories first.
- Supabase repositories later, using the same domain types.
- Supabase Storage later for recipe covers and cooking log photos.

## Non-Goals For MVP

- Random recipe picker.
- Dynamic tag management.
- Multiple photos per recipe or cooking log.
- Global cooking log creation.
- Public sharing.
- Multi-user collaboration.
- Meal planning and shopping list.

