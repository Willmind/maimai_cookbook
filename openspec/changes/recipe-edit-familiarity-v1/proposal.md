# 变更提案：recipe-edit-familiarity-v1

## 为什么

当前菜谱详情编辑页允许修改菜谱字段（名称、简介、食材、做法等），但缺少对 `familiarity`（没做过/做过/常做）的显式编辑入口。

用户在编辑菜谱时希望同步修正该菜谱的熟悉度状态。

## 变更内容

- 在 `EditRecipeView` 增加 `familiarity` 三态选择控件（复用现有 `SegmentedControl`）。
- 保存时将用户选择的 `familiarity` 一起更新到 `recipes.familiarity`。

## 影响范围

- 仅涉及编辑页展示层与保存 payload。
- 不需要 Supabase migration（字段已存在且允许 update）。
