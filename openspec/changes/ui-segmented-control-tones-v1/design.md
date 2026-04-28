# Design: Segmented Control Tones v1

## Scope

为 `SegmentedControl` 增加 “tone” 概念：选中态根据语义状态色上色，复用全局 `--state-*-*` tokens。

## Option Model

`SegmentedControl` option 增加可选字段：

- `tone?: 'neutral' | 'selected' | 'success' | 'warning' | 'danger' | 'info'`

规则：

- 未提供 tone 时，默认使用 `selected`（与现有行为一致）
- tone 只影响 **selected** 状态（未选中保持中性白底）

## Styling Rules

当 `.segmented-item.selected` 且带 tone 类名时：

- `tone-neutral` → `--state-neutral-*`
- `tone-success` → `--state-success-*`
- `tone-warning` → `--state-warning-*`
- `tone-danger` → `--state-danger-*`
- `tone-info` → `--state-info-*`
- `tone-selected` → `--state-selected-*`

## Adoption

先在 cooking result 落地 4 色映射：

- 不评价：neutral
- 好吃：success
- 一般：warning
- 翻车：danger

## Non-goals

- 不改变未选中态的颜色（避免彩色噪音）。
- 不增加复杂动画。

