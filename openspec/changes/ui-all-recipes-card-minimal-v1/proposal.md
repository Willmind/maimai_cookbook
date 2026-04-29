# Change Proposal: UI All Recipes Card Minimal v1

## Why

全部菜谱页面当前卡片在列表层展示了较多状态与标签信息，导致信息密度偏高。MVP 阶段该列表的首要目标是快速浏览与定位菜谱，卡片应更简洁。

## What Changes

- 将全部菜谱列表卡片展示收敛为三项：
  - 标题
  - 简介
  - 缩略图
- 移除卡片内标签和状态文本展示（如熟悉度、想做、标签 chips）。

## Impact

- 仅涉及 `AllRecipesView` 展示层与测试，不改筛选逻辑和数据结构。
