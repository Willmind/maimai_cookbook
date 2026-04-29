# maimai-cookbook Spec Delta

## ADDED Requirements

### Requirement: 首页与全部菜谱在请求期间展示整块 loading
系统 SHALL 在以下页面加载数据期间展示整块 loading：
- 首页 `HomeView`
- 全部菜谱 `AllRecipesView`

#### Scenario: 用户打开首页
- GIVEN 用户进入首页
- WHEN 页面发起 `recipeRepository.list` 与 `cookingLogRepository.list`
- THEN 在请求未完成前展示 `PageLoadingOverlay`
- AND THEN 请求完成后展示首页内容

#### Scenario: 用户打开全部菜谱
- GIVEN 用户进入全部菜谱页面
- WHEN 页面发起 `recipeRepository.list`
- THEN 在请求未完成前展示 `PageLoadingOverlay`
- AND THEN 请求完成后展示菜谱列表与筛选

### Requirement: 路由页面切换淡入淡出
系统 SHALL 在路由页面切换时提供轻量淡入淡出过渡，并尊重 `prefers-reduced-motion`。

#### Scenario: 用户在页面间切换
- GIVEN 用户从任意页面导航到另一个页面
- WHEN 新页面开始渲染
- THEN 系统以淡入淡出形式完成页面切换
- AND 在 `prefers-reduced-motion: reduce` 时禁用或极短动效

