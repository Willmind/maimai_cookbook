## ADDED Requirements

### Requirement: 无登录 Supabase 持久化

系统 SHALL 在个人 MVP 中支持无登录 Supabase 持久化。

#### Scenario: 选择 Supabase 数据源

- GIVEN 应用配置了 `VITE_DATA_SOURCE=supabase`
- AND 已配置 Supabase URL 和 anon key
- WHEN 应用读写菜谱和做饭记录
- THEN 系统使用 Supabase-backed repository
- AND Vue view 不需要感知 Supabase client 细节

#### Scenario: 保留 mock fallback

- GIVEN 应用配置了 `VITE_DATA_SOURCE=mock`
- WHEN 应用读写菜谱和做饭记录
- THEN 系统使用本地 mock repository
- AND 保留现有 mock MVP 行为

### Requirement: Supabase 菜谱 schema

系统 SHALL 使用 Supabase `recipes` 表存储与 MVP 字段对齐的菜谱。

#### Scenario: 在 Supabase 中创建菜谱

- GIVEN Supabase 模式已开启
- WHEN 用户只填写菜名并创建菜谱
- THEN 系统在 `recipes` 表中存储该菜谱
- AND 默认 `want_to_make` 为 true
- AND 默认 `familiarity` 为 `new`

#### Scenario: 存储菜谱可选详情

- GIVEN Supabase 模式已开启
- WHEN 用户创建菜谱并填写可选详情
- THEN 系统存储来源、简介、封面图片路径、食材、做法、下次注意、熟悉度、想做状态和标签

### Requirement: Supabase 做饭记录 schema

系统 SHALL 使用 Supabase `cooking_logs` 表存储关联菜谱的做饭记录。

#### Scenario: 在 Supabase 中创建关联做饭记录

- GIVEN Supabase 模式已开启
- AND 菜谱已经存在
- WHEN 用户为该菜谱记录一次做饭
- THEN 系统在 `cooking_logs` 表中存储一行记录
- AND 通过 `recipe_id` 关联该菜谱

#### Scenario: 阻止脱离菜谱的 Supabase 做饭记录

- GIVEN Supabase 模式已开启
- WHEN 创建做饭记录时没有已存在菜谱
- THEN 数据库关系阻止保存脱离菜谱的做饭记录

### Requirement: Supabase Storage 图片

系统 SHALL 使用 Supabase Storage 存储 MVP 的单图字段。

#### Scenario: 上传菜谱封面

- GIVEN Supabase 模式已开启
- WHEN 用户上传一张菜谱封面
- THEN 系统把文件存储到菜谱封面 bucket
- AND 把 Storage path 保存到菜谱

#### Scenario: 上传做饭记录照片

- GIVEN Supabase 模式已开启
- WHEN 用户上传一张做饭记录照片
- THEN 系统把文件存储到做饭记录照片 bucket
- AND 把 Storage path 保存到做饭记录

#### Scenario: 更换或删除已存储图片

- GIVEN Storage 中已经存在菜谱封面或做饭记录照片
- WHEN 用户更换或删除该图片
- THEN 系统更新本地表单状态
- AND 在安全时机移除不再使用的 Storage object
