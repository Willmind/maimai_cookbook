# Design: UI Upload Box Polaroid v2 (Minimal)

## Scope

把 `SingleImageUpload` 的核心交互收敛为“一个拍立得框”，并用最少元素覆盖四种状态：

- `empty`
- `uploading`
- `uploaded`
- `failed`

保持事件接口不变（choose/replace/delete/retry/remove）。

## Interaction

### Empty

- 相框中央：`＋`
- 点击相框/加号：触发 `choose`
- 不显示额外说明文案

### Uploading

- 相框中央：缩略图占位
- 相框底部：细进度条（复用 `.progress` 视觉，但更薄）

### Uploaded

- 相框中央：缩略图（mock）
- 右上角：两个小图标按钮（刷新/删除），使用 `src/assets/icons` 下的 SVG 资源（`?url` 导入为 `<img>`），不引入图标库

### Failed

- 相框中央：失败提示（很轻的 danger tone）
- 相框底部或中央：重试按钮（retry）+ 可选移除（remove）

## Visual Language

- 拍立得白边（上窄下宽），下方留白仅作为视觉语言，不承载文字
- 状态色复用全局 `--state-*` tokens（danger 用于失败）

## Non-goals

- 不实现真实文件选择、拖拽或 Storage 上传
- 不支持多图

