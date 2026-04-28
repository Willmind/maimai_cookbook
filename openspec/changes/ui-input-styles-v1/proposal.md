# Change Proposal: UI Input Styles v1

## Why

UI 规范与验收阶段需要统一输入控件（`input / textarea / select`）的交互反馈，避免不同页面“像不同应用”，同时提升可达性（键盘 focus 可见）。

## What Changes

- 在全局样式中统一表单控件的状态：
  - hover：边框/阴影轻微强化（不位移）
  - active：阴影收敛（幅度小）
  - focus-visible：温和的外圈（与按钮规范同色系）
  - disabled：降低不透明度、禁止交互反馈
- 覆盖范围：`input`、`textarea`、`select`（包含表单页 `.field` 下的控件，以及搜索框等独立控件）。

## Impact

- 仅涉及 `src/styles/base.css` 与 OpenSpec 文档，不改变业务逻辑。

