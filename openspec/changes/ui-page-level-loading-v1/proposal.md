# 变更提案：ui-page-level-loading-v1

## 为什么
当前多个“详情/编辑/记录”页面依赖异步 repository 请求（`getById` / `listByRecipeId`）。
由于初始渲染时 `recipe/log` 为空，页面会先落入“没有找到这道菜/记录”的分支，随后请求完成才切换到正确内容，造成可感知的闪动与困惑。

## 变更内容
- 新增一个可复用的页面级 loading 组件 `PageLoadingOverlay`。
- 在以下页面引入 loading 三态逻辑：请求中显示 loading，加载完成显示详情/表单或“未找到”。
  - `RecipeDetailView`
  - `EditRecipeView`
  - `NewCookingLogView`
  - `EditCookingLogView`

## 影响范围
- 前端页面与组件：新增 `src/components/PageLoadingOverlay.vue`，并更新上述页面模板/脚本。
- 行为逻辑不变：数据仍由 repository 获取与渲染，仅修正 UI 状态时序。
- 覆盖范围：调整与验证现有单测通过。

