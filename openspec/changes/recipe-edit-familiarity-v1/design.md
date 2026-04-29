# 设计说明：recipe-edit-familiarity-v1

## 范围

仅增强 `EditRecipeView`。

## 交互设计

在编辑表单中新增分段选择控件：

- label：`熟悉度`
- 选项：
  - `new`：没做过
  - `done`：做过
  - `frequent`：常做
- 默认值：读取当前菜谱 `recipes.familiarity`

## 数据提交

点击保存后：

- 调用 `recipeRepository.update(id, ...)`
- 在 update 入参中带上 `familiarity: familiarity.value`

## Supabase 影响

无需 migration：

- `recipes.familiarity` 字段已存在
- check constraint 已覆盖 `new/done/frequent`
