# maimai-cookbook Spec Delta

## ADDED Requirements

### Requirement: 编辑菜谱支持熟悉度变更

系统 SHALL 在编辑菜谱页面允许用户修改 `familiarity`（没做过/做过/常做）。

#### Scenario: 修改 familiarity 并保存

- GIVEN 用户打开某菜谱的编辑页
- WHEN 用户选择熟悉度为 `做过`
- AND 点击保存
- THEN 系统更新该菜谱的 `familiarity` 为 `done`
