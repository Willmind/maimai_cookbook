# 任务清单：ui-page-level-loading-v1

## 1. Spec 与设计

- [x] 新增 proposal / design / tasks / spec delta（中文）。

## 2. 实现

- [x] 新增 `src/components/PageLoadingOverlay.vue`。
- [x] 在以下页面引入 loading 三态逻辑，并修复“未加载就显示 not found”问题：
  - `src/views/RecipeDetailView.vue`
  - `src/views/EditRecipeView.vue`
  - `src/views/NewCookingLogView.vue`
  - `src/views/EditCookingLogView.vue`

## 3. 验证

- [x] 运行 `openspec validate --all`。
- [x] 运行单元测试（`vitest`）并通过。
- [x] 检查 lints 无报错。

