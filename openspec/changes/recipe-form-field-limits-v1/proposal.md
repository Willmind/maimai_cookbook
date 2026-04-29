# 变更提案：recipe-form-field-limits-v1

## 为什么

当前菜谱新增/编辑表单没有输入字数限制，可能导致异常长内容影响可用性和数据质量，也不利于后续与数据库约束对齐。

## 变更内容

- 为菜谱新增与编辑表单按字段添加最大输入长度：
  - `name`: 80
  - `source`: 120
  - `description`: 300
  - `ingredients`: 1000
  - `method`: 2000
  - `nextNote`: 300
- 使用共享常量保证新增与编辑页面限制一致。

## 影响范围

- 前端表单属性与测试更新。
- 不涉及 Supabase schema 变更。
