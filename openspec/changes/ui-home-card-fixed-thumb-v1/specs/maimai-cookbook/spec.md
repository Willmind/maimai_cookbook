# maimai-cookbook Spec Delta

## ADDED Requirements

### Requirement: Home 页卡片的固定缩略图与稳定文本展示

系统 SHALL 在首页的“搜索结果（菜谱/做饭记录）”“做饭记录流”“等着开火”区域使用固定缩略图尺寸，并稳定文本展示，避免因为图片比例不同导致卡片高度不一致。

#### Scenario: 用户在首页浏览搜索结果或列表

- GIVEN 用户打开首页
- WHEN 用户查看搜索结果分组或卡片列表
- THEN 缩略图固定为方图 `96x96`
- AND 标题单行省略
- AND 说明/内容使用双行省略（受 `.muted` 文本规则约束）

