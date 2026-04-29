# maimai-cookbook Spec Delta

## ADDED Requirements

### Requirement: 表单页提供取消按钮并返回上一页
系统 SHALL 在以下页面底部按钮区域提供“取消”按钮，且“取消”按钮位于“保存”按钮左侧：
- 新建菜谱：`NewRecipeView`
- 编辑菜谱：`EditRecipeView`
- 新建做饭记录：`NewCookingLogView`
- 编辑做饭记录：`EditCookingLogView`

#### Scenario: 用户取消编辑/新建
- GIVEN 用户在上述任意表单页
- WHEN 用户点击“取消”
- THEN 系统返回上一页

## ADDED Notes
（无）

