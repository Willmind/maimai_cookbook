# 设计说明：ui-page-transitions-and-list-loading-v1

## 1) 列表页整块 loading

### 适用页面
- 首页 `HomeView`
- 全部菜谱 `AllRecipesView`

### 交互规则
- 页面挂载后立即进入 `loading = true`。
- 异步请求结束（成功/失败）都在 `finally` 设置 `loading = false`。
- `loading = true` 时：只渲染一个 `screen`，内部展示 `PageLoadingOverlay`。
- `loading = false` 时：渲染页面原有内容。

## 2) 页面切换淡入淡出

### 适用范围
所有路由页面（`RouterView` 内的页面组件）。

### 实现要点
- 在 `App.vue` 使用 `RouterView` 的 `v-slot` 取到 `Component`，并用 `Transition` 包裹。
- `mode="out-in"`：保证切换时先淡出旧页面，再淡入新页面，避免叠加。
- 动效强度：以 `opacity` 为主，轻微 `transform`，时长保持在 180~220ms。
- `prefers-reduced-motion: reduce` 下禁用/极短动效。

