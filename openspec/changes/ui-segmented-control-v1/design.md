# Design: UI Segmented Control v1

## Scope

为枚举型单选提供一个可复用的分段选择控件（segmented control），并在“记录一次”页先落地到 `CookingResult`。

## Use Cases

- 枚举单选，选项数量 3–6 个较合适
- 移动端优先：允许自动换行（两行以内优先）

## Interaction

- **Default**：米白底，细描边，内部为一组胶囊按钮
- **Hover**：轻微阴影/边框强化（允许轻微上浮，幅度与按钮一致）
- **Active**：阴影收敛
- **Selected**：更实的底色（偏橄榄/金色系），文字加深，边框更清晰
- **Focus-visible**：与按钮/输入一致的温和金色 focus ring
- **Disabled**（若未来需要）：整体降低不透明度，禁止交互

## Accessibility

- 使用 `role="radiogroup"` + `role="radio"` / `aria-checked` 表达单选语义
- 保持键盘可聚焦（`:focus-visible` 清晰）

## Implementation Notes

- 组件以 `v-model`（`modelValue` + `update:modelValue`）对外
- 选项以 `{ value, label, testId? }` 传入
- 允许 value 为 `''` 表示“未选择/不评价”

## Non-goals

- 不实现复杂键盘方向键导航（MVP 先保证可聚焦与可点击）
- 不引入 UI 库

