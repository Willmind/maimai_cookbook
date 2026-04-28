# Design: UI Input Styles v1

## Scope

统一输入控件的基础交互态，覆盖：

- `input`
- `textarea`
- `select`

不引入新的表单控件组件或额外类名体系，直接在 `src/styles/base.css` 中统一。

## Interaction States

### Default

- 米白底 + 细描边（保持现有风格）
- 文本颜色使用 `--ink`，placeholder/辅助文案不在本变更中强制改动

### Hover (mouse)

- **不做上浮位移**（避免输入时抖动）
- 边框略加深
- 轻微外阴影（纸面抬起一点点的感觉）

### Active (mouse down)

- 阴影收敛（幅度很小）
- 不改变布局

### Focus-visible (keyboard + focus)

- 可见且温和的 focus ring，配色与按钮一致（偏金色）
- 同时边框加深，保证在米纸背景上清晰

### Disabled

- `opacity` 降低
- `cursor: not-allowed`
- 禁止 hover/active 的视觉强化

## Accessibility

- 使用 `:focus-visible`，避免鼠标点击时出现过强的焦点提示，同时保证键盘用户可见。
- 不改变现有的可读性与布局（只做描边/阴影/外圈）。

## Non-goals

- 不改动表单的 spacing、字体、布局。
- 不引入统一 `.form-control` 类或组件封装。

