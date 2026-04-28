# Change Proposal: Segmented Control Tones v1

## Why

对于“做饭结果”这类带情绪/结果语义的枚举，选中态如果只有一种颜色会降低扫读效率。希望在不破坏手账气质的前提下，让不同选项在“被选中时”呈现不同语义状态色（neutral/success/warning/danger）。

## What Changes

- 扩展 `SegmentedControl`：每个 option 可声明一个 `tone`（neutral/selected/success/warning/danger/info）。
- 全局样式支持 `segmented-item` 在 **selected** 时按 tone 使用对应的 `--state-*-*` token。
- 在 `NewCookingLogView` 将 cooking result 的四个选项映射到四种 tone：
  - 不评价→neutral
  - 好吃→success
  - 一般→warning
  - 翻车→danger

## Impact

- 不改变数据结构，只影响 UI 表达与可读性。

