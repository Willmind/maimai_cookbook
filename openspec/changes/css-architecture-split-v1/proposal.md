# 变更提案：css-architecture-split-v1

## 为什么

`src/styles/base.css` 已超过 1000 行，当前同时承载 token、基础样式、组件样式、页面样式与交互态。随着功能继续迭代，单文件维护成本和样式回归风险会持续上升。

## 变更内容

- 建立样式分层与拆分规则：
  - `base.css` 仅承载全局 token、reset 与跨域基础规则。
  - 组件级样式迁移到 `src/styles/components/`。
  - 页面级样式后续迁移到 `src/styles/pages/`。
- 第一批拆分（本次落地）：
  - 抽离 `actions.css`（按钮与动作交互）
  - 抽离 `cards.css`（卡片、标签、筛选 chip、时间线卡片）
  - 在 `base.css` 通过 `@import` 统一引入。

## 影响范围

- 仅涉及样式文件组织，不改变业务逻辑、路由、数据结构。
- 对视觉结果目标为“零变化”，主要收益是后续可维护性。
