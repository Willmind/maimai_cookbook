# Design: UI Button Styles v1

## Scope

本变更只定义与实现“按钮”在全站的基础视觉与交互态，沿用现有类名，不引入新的 `.btn` API。

## Button Tokens (existing CSS vars)

使用 `src/styles/base.css` 已存在的 token：

- `--tomato` / `--olive` / `--gold`
- `--ink` / `--muted`
- `--line`
- `--white`

## Button Types

### Primary (`.primary-action`)

- 用途：最主要的提交/创建动作，以及顶栏主操作。
- 默认：番茄红填充 + 纸白文字。
- Hover：轻微上浮、阴影增强、底色轻微加深。
- Active：回落（接近默认位置）、阴影收敛。
- Focus-visible：清晰但温和的外圈（偏金色/橄榄，与纸质气质一致）。

### Secondary (`.secondary-action`)

- 用途：次要动作、工具按钮（例如上传组件的操作）。
- 默认：描边 + 米纸白底。
- Hover：边框加深、背景更实、轻微上浮与柔和阴影。
- Active：回落、阴影收敛。
- Focus-visible：与 primary 一致的外圈规范。

### Ghost (`.ghost-action`)

- 用途：次级链接式动作（例如“模拟上传失败”等开发辅助按钮）。
- 默认：透明背景 + 下划线。
- Hover：文字更深、下划线更明显（不做上浮，避免抢层级）。
- Focus-visible：外圈或下划线强化，确保键盘可达。

### Small (`.small-action`)

- 用途：配合 `.secondary-action` 等在局部控件中减小尺寸。
- 规则：仅调整 padding / font-size，不改变配色。

## Accessibility

- 所有按钮（含 `RouterLink` 渲染的 `a`）统一：
  - `cursor: pointer`
  - 可见的 `:focus-visible` 样式
  - `prefers-reduced-motion` 下减少位移动效
- `disabled`：
  - 对 `button:disabled` 生效（降低不透明度、禁止交互反馈）。
  - 对链接型按钮不强制提供禁用态（如未来需要可引入 `.is-disabled` 或 `aria-disabled` 约定）。

## Non-goals

- 不引入组件库或新的按钮组件封装。
- 不进行跨页 UI 重构，仅在全局 CSS 中统一行为。

