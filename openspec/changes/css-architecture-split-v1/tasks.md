# 任务清单：css-architecture-split-v1

## 1. Spec 与设计

- [x] 新增 proposal / design / tasks / spec delta（中文）。

## 2. 第一批拆分（零视觉变化）

- [x] 新增 `src/styles/components/actions.css`。
- [x] 新增 `src/styles/components/cards.css`。
- [x] 从 `src/styles/base.css` 迁移对应选择器到组件文件。
- [x] 在 `base.css` 顶部通过 `@import` 引入组件样式。

## 3. 第二批拆分（零视觉变化）

- [x] 新增 `src/styles/components/forms.css`。
- [x] 新增 `src/styles/components/upload.css`。
- [x] 从 `src/styles/base.css` 迁移表单、分段控件、上传框相关样式。
- [x] 在 `base.css` 顶部通过 `@import` 引入新增组件样式。

## 4. 验证

- [x] 运行 `openspec validate --all`。
- [x] 运行单元测试并通过。
- [x] 运行构建并通过。
