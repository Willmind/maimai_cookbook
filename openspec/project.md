# Project: 麦麦手记

## Purpose

麦麦手记 helps one person keep a practical kitchen notebook: recipes they want to make, recipes they already know, and cooking logs that capture what happened each time they cooked.

## Documentation Language

后续所有 OpenSpec proposal、design、tasks、spec delta，以及 Superpowers plans/specs，默认使用中文撰写。除非用户明确要求英文，不要新增英文规划文档。

## Database Migration Policy

Supabase 数据库结构变更必须以仓库内 `supabase/migrations/` SQL 文件为准。已经执行过的 migration 不回头修改；后续字段、索引、约束或策略调整都新增 migration 文件。用户可以手动把 SQL 复制到 Supabase SQL Editor 执行，但执行前应先把 migration 写入仓库。若用户直接在 Supabase 后台改了表结构，需要补 migration 文件记录该变化，避免仓库和数据库分叉。

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
