# maimai-cookbook Spec Delta

## ADDED Requirements

### Requirement: 新建菜谱支持熟悉度选择

系统 SHALL 在新建菜谱时允许用户设置熟悉度（没做过/做过/常做），并保持想做状态独立。

#### Scenario: 创建菜谱时设置熟悉度

- GIVEN 用户打开新建菜谱页
- WHEN 用户选择 `没做过`、`做过` 或 `常做`
- AND 提交表单
- THEN 系统按选择值保存 `familiarity`
- AND 不影响 `want_to_make` 的独立开关行为
