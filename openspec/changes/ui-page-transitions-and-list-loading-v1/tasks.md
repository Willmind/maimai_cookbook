# 任务清单：ui-page-transitions-and-list-loading-v1

## 1. Spec 与设计

- [x] 新增 proposal / design / tasks / spec delta（中文）。

## 2. 实现

- [x] 为 `HomeView` 增加整块 loading（复用 `PageLoadingOverlay`）。
- [x] 为 `AllRecipesView` 增加整块 loading（复用 `PageLoadingOverlay`）。
- [x] 在 `App.vue` 给路由页面增加淡入淡出过渡（并添加对应全局 CSS）。

## 3. 验证

- [x] 运行 `openspec validate --all`。
- [x] 运行单元测试（`npm test`）并通过。
- [x] 检查 lints 无报错。

