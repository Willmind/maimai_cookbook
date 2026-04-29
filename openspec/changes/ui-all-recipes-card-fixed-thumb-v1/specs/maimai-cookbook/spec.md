# maimai-cookbook Spec Delta

## ADDED Requirements

### Requirement: 全部菜谱卡片缩略图和文本布局保持稳定

系统 SHALL 在全部菜谱列表中使用固定缩略图尺寸与稳定文本截断规则，保证卡片视觉一致。

#### Scenario: 用户浏览全部菜谱列表

- GIVEN 用户打开全部菜谱页面
- WHEN 菜谱卡片渲染
- THEN 缩略图使用统一固定尺寸
- AND 标题与简介按约定行数截断
- AND 不因原始图片尺寸差异导致卡片布局抖动
