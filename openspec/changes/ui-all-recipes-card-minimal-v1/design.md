# Design: UI All Recipes Card Minimal v1

## Scope

仅调整全部菜谱页卡片的显示信息，不调整筛选器、搜索或跳转行为。

## Display Rules

在 `AllRecipesView` 的每个菜谱卡片中仅展示：

1. 缩略图（有图显示图片，无图显示既有占位）
2. 菜名（标题）
3. 简介（`description`；为空时显示兜底文案）

不展示：

- 熟悉度文本
- 想做状态文本
- 标签 chips

## Non-goals

- 不修改数据模型或 repository。
- 不修改“想做/没做过/做过/常做”筛选功能。
