# Change Proposal: UI Status Tokens v1

## Why

当前项目里“选中态、提示态、错误态”等颜色在多个位置以 `rgba(...)` 形式散落，难以在 UI 验收阶段统一口径，也不利于后续迭代保持一致的手账气质。

## What Changes

- 在 `src/styles/base.css` 的 `:root` 中新增一组全局语义状态 token：
  - `neutral / selected / success / warning / danger / info`
- 将已存在的典型状态样式改为引用 token（优先覆盖）：
  - 选中态：`.filter-chip.active`、`.segmented-item.selected`、`.tag`
  - 危险/错误提示：`.error-note`

## Impact

- 仅 CSS token 与样式引用调整，不影响业务逻辑与数据结构。
- 让后续新增 UI（例如成功提示、info 提示）能直接复用同一套状态色。

