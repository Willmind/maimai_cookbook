# 设计说明：css-architecture-split-v1

## 目标

在保持 UI 视觉与交互表现不变的前提下，降低样式耦合，建立可持续扩展的 CSS 组织方式。

## 分层原则

### base 层（`src/styles/base.css`）

- 保留：
  - 设计 token（颜色、状态、阴影、圆角等）
  - reset / 全局元素基础规则（如 `body`、`a`、`button`）
  - 跨页面布局骨架规则
  - motion 兜底策略（如 `prefers-reduced-motion`）
- 不再新增大段组件专属样式。

### components 层（`src/styles/components/*.css`）

- 存放可复用组件样式与交互态。
- 本次新增：
  - `actions.css`
  - `cards.css`

### pages 层（后续）

- 存放仅单页使用且复用价值低的页面样式。
- 本变更先不强制拆页面样式，避免一次性迁移过大。

## 导入策略

- 统一由 `base.css` 顶部 `@import` 引入组件样式文件。
- `main.ts` 仍只引入 `base.css`，避免入口分散。

## 执行策略

采用“分批迁移 + 每批验证”：

1. 第一批：actions + cards（本次完成）。
2. 第二批：forms + upload（后续 change/任务）。
3. 第三批：pages 拆分（按页面活跃度分批）。

## 风险与控制

- 风险：迁移时选择器顺序变化导致覆盖关系变化。
- 控制：
  - 保持原选择器与声明内容不变，只迁移位置。
  - 迁移后执行测试与构建。
  - 每批次改动规模受控，避免大爆炸重构。
