# Vue Mock MVP Design

## Goal

Build the first usable version of 麦麦手记 with Vue3 and local mock data, while keeping the data layer shaped for a later Supabase switch.

## Recommended Approach

Use a mock-first architecture:

- Vue pages and components render the product experience.
- Domain types match future Supabase tables.
- Repository interfaces hide the current data source.
- Mock repositories power the first version.
- Supabase repositories replace mock repositories later.

This is better than connecting Supabase immediately because the product is still young and interaction details may continue to shift. It is also better than loose component-local mock data because that would make the backend switch painful.

## Technical Stack

- Vue 3
- TypeScript
- Vite
- Vue Router
- Pinia
- Vitest
- Vue Test Utils
- Supabase later

## Key Boundaries

- Recipes and cooking logs are separate domain objects.
- Cooking logs require `recipe_id`.
- Mock data must not be imported directly by components.
- Images are local UI states in the mock MVP.
- Supabase Storage is introduced after the mock MVP is accepted.

