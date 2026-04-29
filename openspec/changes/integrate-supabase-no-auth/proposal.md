# 变更提案：无登录接入 Supabase

## 为什么

Vue mock MVP 已经完成基础验证，可以从本地 mock 状态进入真实持久化阶段。当前应用定位仍是个人应用，用户明确不需要登录，所以 Supabase 集成应先保持无登录范围，避免过早引入 Auth、`user_id` 和多用户 RLS 的复杂度。

## 改什么

- 为 `recipes` 和 `cooking_logs` 增加 Supabase schema。
- 为菜谱封面和做饭记录照片增加 Supabase Storage bucket。
- 增加 Supabase 配置和数据源选择环境变量。
- 在现有 repository interface 后面实现 Supabase repository。
- 保留 mock repository 作为本地 fallback。
- 把图片 mock UI 行为替换为真实单图上传、更换、删除流程。

## 影响

- 增加真实持久化，同时保留当前页面级 API。
- Supabase 模式需要 Supabase project URL 和 anon key。
- 不增加 Auth、`user_id`、多用户 RLS 或公开分享。
- 如果未来要公网部署，需要另开安全设计，补 Auth/RLS。
