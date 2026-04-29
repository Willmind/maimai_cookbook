# 变更提案：ui-page-transitions-and-list-loading-v1

## 为什么
首页与全部菜谱页面在数据请求期间会先展示空列表（0 条、无卡片），用户容易误判为“没有数据”或“加载失败”。

同时，页面切换时缺少渐进渐出的过渡效果，导航反馈略显生硬。

## 变更内容
- 在以下列表型页面增加“整块 loading”：
  - 首页 `HomeView`
  - 全部菜谱 `AllRecipesView`
  - 行为：数据请求完成前，内容区显示 `PageLoadingOverlay`；请求完成后再显示页面内容。
- 在路由页面切换时增加淡入淡出过渡：
  - 在 `App.vue` 为路由页面包裹 `Transition`（轻量 opacity/translate 动效）
  - 尊重 `prefers-reduced-motion`

## 影响范围
- `src/views/HomeView.vue`、`src/views/AllRecipesView.vue`
- `src/App.vue` 与全局样式（新增过渡 CSS）
- 新增 OpenSpec change 文档与验证

