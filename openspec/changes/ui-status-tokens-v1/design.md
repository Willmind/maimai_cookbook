# Design: UI Status Tokens v1

## Scope

定义一组全局“语义状态”颜色 token，并将现有 UI 的关键状态（选中态、错误态）切到 token。

## Tokens

所有 token 定义在 `src/styles/base.css :root`，命名为：

### Neutral

- `--state-neutral-bg`
- `--state-neutral-border`
- `--state-neutral-fg`

### Selected

- `--state-selected-bg`
- `--state-selected-border`
- `--state-selected-fg`

### Success / Warning / Danger / Info

每类包含：

- `--state-<name>-bg`
- `--state-<name>-border`
- `--state-<name>-fg`

## Mapping to current palette

基于现有项目主色：

- selected/success：偏 `--olive`（厨房记号笔的感觉）
- warning：偏 `--gold`
- danger：偏 `--tomato`
- info：偏 `--ink`/`--muted` 的冷静中性色（不引入新蓝色系）

## Adoption (initial)

第一批替换为 token 的组件/样式：

- `.tag` 使用 `--state-selected-*`（目前 tag 在产品语境里更像“已选中/标记”）
- `.filter-chip.active` 使用 `--state-selected-*`
- `.segmented-item.selected` 使用 `--state-selected-*`
- `.error-note` 使用 `--state-danger-*`

## Non-goals

- 不强制一次性替换所有 `rgba(...)`，先覆盖“状态语义”部分，逐步收敛。
- 不引入全新色相（如蓝色 info），保持米纸厨房手记调性。

