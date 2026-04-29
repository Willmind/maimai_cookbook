# 任务清单：recipe-edit-familiarity-v1

## 1. Spec 与设计

- [x] 新增 proposal / design / tasks / spec delta（中文）。

## 2. 实现

- [x] 在 `EditRecipeView` 添加熟悉度（familiarity）三态选择控件。
- [x] 保存时将 `familiarity` 一起更新到 `recipes`。
- [x] 补充单测：切换熟悉度并保存。

## 3. 验证

- [x] 运行 `openspec validate --all`。
- [x] 运行单元测试并通过。
- [x] 运行构建并通过。
