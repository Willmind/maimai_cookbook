# maimai-cookbook Spec Delta

## ADDED Requirements

### Requirement: 菜谱可编辑

系统 SHALL 支持用户编辑已存在的菜谱。

#### Scenario: 从菜谱详情进入编辑并保存

- GIVEN 用户打开某个菜谱详情页
- WHEN 用户点击 `编辑菜谱`
- AND 修改字段后保存
- THEN 系统更新该菜谱
- AND 返回该菜谱详情页

### Requirement: 做饭记录可编辑

系统 SHALL 支持用户编辑某道菜下的既有做饭记录。

#### Scenario: 从做饭记录列表进入编辑并保存

- GIVEN 用户打开某个菜谱详情页，且该菜有做饭记录
- WHEN 用户点击其中一条做饭记录
- AND 修改字段后保存
- THEN 系统更新该做饭记录
- AND 返回该菜谱详情页
