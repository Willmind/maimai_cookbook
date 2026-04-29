# maimai-cookbook Spec Delta

## ADDED Requirements

### Requirement: 菜谱新增与编辑表单输入长度限制

系统 SHALL 为菜谱新增与编辑表单字段设置明确的最大输入长度，且两处规则保持一致。

#### Scenario: 用户在菜谱表单输入超长内容

- GIVEN 用户在新建或编辑菜谱页面输入文本
- WHEN 输入达到字段最大长度
- THEN 表单阻止继续输入超过限制的字符
- AND 新建与编辑页面使用同一套字段长度规则
