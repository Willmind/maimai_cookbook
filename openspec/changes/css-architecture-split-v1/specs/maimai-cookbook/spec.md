# maimai-cookbook Spec Delta

## ADDED Requirements

### Requirement: CSS 文件应按职责分层组织

系统 SHALL 使用可维护的样式分层结构，避免将 token、基础样式、组件样式和页面样式长期堆叠在单一超大文件中。

#### Scenario: 样式重构不改变功能行为

- GIVEN 样式文件进行结构拆分（如从 `base.css` 迁移到 `components/*.css`）
- WHEN 迁移完成并被主样式入口引入
- THEN 页面视觉与交互行为保持一致
- AND 后续新增样式按职责落在对应分层文件中
