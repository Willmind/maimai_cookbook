# 设计说明：recipe-form-field-limits-v1

## 范围

仅覆盖菜谱相关表单：

- 新建菜谱页 `NewRecipeView`
- 编辑菜谱页 `EditRecipeView`

## 规则

按字段设置 `maxlength`：

- 菜名（`name`）：80
- 来源/灵感（`source`）：120
- 简介（`description`）：300
- 食材（`ingredients`）：1000
- 做法（`method`）：2000
- 小贴士/下次注意（`nextNote`）：300

## 实现方式

- 新增共享常量文件，集中定义长度限制。
- 新建/编辑页面通过同一常量绑定 `maxlength`，避免后续维护分叉。

## 非目标

- 不增加数据库层 check constraint。
- 不增加实时字数计数器（本次先做输入上限）。
