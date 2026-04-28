# Change Proposal: UI Button Styles v1

## Why

UI 验收阶段需要一套全局一致的按钮交互反馈（hover / active / focus / disabled），以便在不引入大型 UI 库的前提下，保证可用性与“温暖纸质厨房手记”的风格一致。

## What Changes

- 在现有按钮类名体系基础上统一样式与交互态：
  - `.primary-action`
  - `.secondary-action`
  - `.ghost-action`
  - `.small-action`
- 为右上角主要操作区（`src/App.vue`）的按钮补齐 hover 等交互态（通过全局样式实现，避免逐页重复）。

## Impact

- 仅涉及 CSS（`src/styles/base.css`）与规范文档，不改变数据/路由/业务逻辑。
- 为后续 UI 规范与验收提供可复用的基础控件风格。

