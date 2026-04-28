# Change Proposal: UI Segmented Control v1

## Why

在“手账式厨房记录”的 UI 气质里，枚举型单选（如做饭结果）更适合用可直接点选的分段按钮，而不是下拉框。这样在移动端更快、更直觉，也更符合“轻量、可扫读”的验收目标。

## What Changes

- 引入一套可复用的分段选择控件（segmented control）规范与实现，用于枚举单选。
- 将 `src/views/NewCookingLogView.vue` 的“这次做得怎么样？”从 `<select>` 替换为分段按钮组（不评价 / 好吃 / 一般 / 翻车）。

## Impact

- 新增一个轻量 UI 组件（不引入 UI 库）。
- 全局样式增加分段控件的基础样式与交互态，复用现有 token（米纸/番茄/橄榄/金色）。
- 不改变数据模型：仍然写入 `CookingLog.result`（`good|ok|failed|undefined`）。

