# maimai-cookbook Spec Delta

## MODIFIED Requirements

### Requirement: 详情/编辑/记录页面在数据加载完成前不展示“未找到”

系统 SHALL 在以下页面执行异步数据请求时，区分“加载中”与“未找到”：

- `RecipeDetailView`
- `EditRecipeView`
- `NewCookingLogView`
- `EditCookingLogView`

#### Scenario: 用户点击菜谱详情
- GIVEN 用户进入菜谱详情路由
- WHEN 页面发起 `recipeRepository.getById` 与（可选的）`cookingLogRepository.listByRecipeId` 请求
- THEN 在请求未完成前展示 `PageLoadingOverlay`
- AND THEN 当请求完成且菜谱存在时展示菜谱详情与做饭记录
- AND THEN 当请求完成且菜谱不存在时展示“没有找到…”文案

## ADDED Notes
- 系统复用统一组件 `src/components/PageLoadingOverlay.vue` 提供页面级反馈。

