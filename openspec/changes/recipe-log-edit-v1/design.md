# 设计说明：recipe-log-edit-v1

## 范围

在不扩大 MVP 业务边界的前提下，补齐“编辑已创建数据”能力：

- 编辑菜谱
- 编辑做饭记录

不新增“全局做饭记录列表”“脱离菜谱的记录入口”“多图上传”。

## 路由设计

- 菜谱编辑：`/recipes/:id/edit`
- 做饭记录编辑：`/recipes/:id/logs/:logId/edit`

说明：

- 做饭记录编辑路由继续挂在菜谱路由下，保持“记录从属于菜谱”的心智模型。
- 详情页中的做饭记录列表项改为可点击，进入对应编辑页。

## 数据层设计

为 repository 接口补齐更新能力，避免组件直接接触底层数据源：

- `RecipeRepository.update(id, input)`
- `CookingLogRepository.getById(id)`
- `CookingLogRepository.update(id, input)`

mock 与 supabase 双实现同步补齐。

## 页面交互

### 编辑菜谱页

- 进入时读取既有菜谱，表单预填。
- 保存时调用 `recipeRepository.update`。
- 成功后返回菜谱详情页。

### 编辑做饭记录页

- 根据 `logId` 加载记录，并校验其 `recipeId` 与路由 `:id` 一致。
- 表单字段与“记录一次”一致，但作为编辑态预填。
- 保存时调用 `cookingLogRepository.update`。
- 成功后返回菜谱详情页。

## Supabase 影响

本次无需新增 migration：

- 已有字段满足编辑需求。
- `recipes` 与 `cooking_logs` 已有 `update` policy。

后续如需“记录编辑时间”，可单独提 change 增 `cooking_logs.updated_at`。

## 测试策略

- repository 单测：补充 update 场景。
- 视图单测：新增编辑页预填与保存跳转场景。
- 详情页单测：断言记录项可跳转到编辑路由。
