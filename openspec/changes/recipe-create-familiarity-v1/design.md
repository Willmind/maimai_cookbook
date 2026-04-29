# 设计说明：recipe-create-familiarity-v1

## 范围

仅增强“新建菜谱”页面的状态输入能力，不改后端 schema、不改路由结构。

## 交互设计

在 `NewRecipeView` 中新增分段选择控件（复用现有 `SegmentedControl`）：

- label：`熟悉度`
- 选项：
  - `没做过` -> `new`
  - `做过` -> `done`
  - `常做` -> `frequent`
- 默认选中 `没做过`

“默认加入想做清单”复选框保留，继续表示 `want_to_make`，与 `familiarity` 独立。

## 数据提交

新建提交时调用 `recipeRepository.create` 增加 `familiarity` 入参。

## 验证策略

- 保留原有“只填菜名”创建测试，断言默认 `familiarity = new` 不变。
- 新增“可选择 familiarity 并成功创建”的测试。

## Supabase 影响

无 migration：

- `recipes.familiarity` 字段已存在
- check constraint 已覆盖 `new/done/frequent`
