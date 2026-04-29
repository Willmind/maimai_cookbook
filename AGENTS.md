# 麦麦手记 Agent 指引

## 项目背景

麦麦手记是一个个人菜谱与做饭记录应用。第一版目标是先用 Vue3 做出可用的本地 mock MVP，再切换到 Supabase 表和 Storage。

产品文档入口：

- `docs/product-mvp.md`

OpenSpec 入口：

- `openspec/project.md`
- `openspec/specs/maimai-cookbook/spec.md`
- `openspec/changes/build-vue-mock-mvp/`

Superpowers 入口：

- `docs/superpowers/plans/2026-04-28-vue-mock-mvp.md`

## 工作方式

- 先确认需求和规格，再写代码。
- 后续所有 Superpowers plans/specs、OpenSpec proposal/design/tasks/spec delta 默认使用中文撰写；除非用户明确要求英文，不要新增英文规划文档。
- 产品范围以 `docs/product-mvp.md` 和 `openspec/specs/maimai-cookbook/spec.md` 为准。
- 每次新增功能优先创建 OpenSpec change，包含 `proposal.md`、`design.md`、`tasks.md` 和 spec delta。
- 实施前优先使用 Superpowers 计划，按小任务推进。
- 不要把 mock 数据散落在组件里；必须通过 repository 接口访问数据。
- 第一版先本地 mock，字段必须对齐未来 Supabase schema。
- 不要提前实现非 MVP：随机一道、多图、动态标签、全局新增做饭记录、全部做饭记录页。

## 技术栈方向

- Frontend: Vue 3 + TypeScript + Vite
- Routing: Vue Router
- State: Pinia
- Tests: Vitest + Vue Test Utils
- Styling: CSS Modules 或普通 scoped CSS，先不引入大型 UI 库
- Backend later: Supabase Postgres + Supabase Storage

## Supabase Migration 规范

- 数据库结构变更以仓库内 `supabase/migrations/` 的 SQL 文件为准。
- 在 Supabase 后台执行 SQL 前，必须先在仓库新增或更新对应 migration 文件。
- 已经在 Supabase 执行过的 migration 不回头修改；后续字段、索引、约束、策略变化都新增 migration 文件。
- 用户可手动把 migration SQL 复制到 Supabase SQL Editor 执行；执行结果需要回填到对话或验收记录中。
- 如果用户直接在 Supabase 后台改了表结构，需要补一个 migration 文件记录该变化，避免仓库和数据库分叉。
- migration 文件命名使用时间戳前缀和简短说明，例如 `202604290001_initial_schema.sql`、`202605010001_add_recipe_difficulty.sql`。
- 修改 schema 时，同步检查 TypeScript 类型、repository mapper、OpenSpec/tasks 和相关测试。

## UI 设计方向

- 视觉气质：温暖纸质厨房手记。
- 关键词：米纸背景、番茄红、橄榄绿、温和阴影、圆角卡片、便签感、个人笔记感。
- 适合的细节：纸张纹理、拍立得式图片、轻微卡片浮起、搜索结果淡入、表单像填写手账。
- 不适合的方向：暗黑霓虹、玻璃拟态、赛博风、强 3D、粒子背景、过度滚动动画、通用 SaaS 紫色渐变。
- 动效原则：轻、慢、有用途；优先 CSS transition，不为炫技引入动画库。
- 图片占位：后续真实实现时尽量像厨房照片或便签相框，不要只用普通渐变块。

## MVP 数据原则

- `recipes` 是菜谱档案。
- `cooking_logs` 是做饭记录，必须通过 `recipe_id` 关联菜谱。
- 做饭记录不能脱离菜谱创建。
- `want_to_make` 和 `familiarity` 独立，做过的菜也可以继续想做。
- 菜谱只要求 `name` 必填。
- 记录一次页面中的菜名只读。
- 菜谱封面和做饭记录照片第一版都最多 1 张。
