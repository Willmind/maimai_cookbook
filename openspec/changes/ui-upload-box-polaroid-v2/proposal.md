# Change Proposal: UI Upload Box Polaroid v2 (Minimal)

## Why

`SingleImageUpload` 在 MVP 阶段应该像“手账里贴一张拍立得”，交互尽量直觉、轻量。v1 的左右结构和较多文案对本项目来说偏复杂。

## What Changes

- 将 `SingleImageUpload` 统一为极简拍立得交互：
  - 始终只呈现一个拍立得相框
  - 空态相框中央为 `＋`，点击即可触发 `choose`
  - 已上传时相框展示缩略图，占位操作以小按钮/角标呈现（换/删）
  - 上传中/失败态在相框内呈现最小必要反馈（进度条/重试）
- 不在相框内部显示解释性文案（只保留上方字段 label 与“最多 1 张”）。

## Impact

- UI/样式与测试更新，不改变事件 API 和业务逻辑。

