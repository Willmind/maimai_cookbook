# Supabase Storage 设置

本文记录麦麦手记无登录个人 MVP 阶段的 Storage bucket 设置。Supabase 后台是执行位置，仓库文档是约定来源。

## Buckets

已创建两个 public bucket：

- `recipe-covers`：菜谱封面图。
- `cooking-log-photos`：做饭记录成品照片。

当前阶段不限制文件大小和 MIME type，沿用 Supabase 默认设置。后续如果需要收紧上传规则，应新增文档更新和对应实现任务。

## RLS Policies

public bucket 只解决“公开读取”问题；上传、替换和删除仍需要 `storage.objects` 的 RLS policy。

已新增 migration：

- `supabase/migrations/202604290002_storage_policies.sql`

该 migration 允许 `anon` 角色对 `recipe-covers` 和 `cooking-log-photos` 里的对象执行 select、insert、update、delete。当前阶段这是无登录个人 MVP 的取舍；公网部署前应改为 Auth/RLS 限制。

## 路径规则

第一版只支持单图，但仍使用稳定路径规则，避免不同文件互相覆盖。

当前路径：

- 菜谱封面：`recipes/draft/{timestamp}-{safeFileName}`
- 做饭记录照片：`cooking-logs/{recipeId}/{timestamp}-{safeFileName}`

`safeFileName` 由前端在上传前生成，避免空格、中文标点或特殊字符造成 URL 问题。

说明：新建菜谱时还没有 `recipeId`，所以第一版先使用 `recipes/draft/`。如果后续增加编辑页或更完整的图片管理，可以新增 migration/任务，把封面文件迁移或重传到 `recipes/{recipeId}/`。

## 上传前压缩

前端上传前会尝试压缩图片：

- 最长边限制为 `1600px`。
- 输出格式为 `image/jpeg`。
- JPEG quality 为 `0.82`。
- 压缩后的文件名统一使用 `.jpg`。
- 如果浏览器压缩失败，会回退上传原图，避免阻断记录流程。

## Public Bucket 取舍

当前应用不做登录，是个人 MVP。public bucket 的好处是：

- 前端展示图片最简单，可以直接使用 public URL。
- 不需要先接 Supabase Auth 或 signed URL。
- 方便先把菜谱和做饭记录的完整数据链路跑通。

风险是：

- public bucket 中的对象可被知道 URL 的人读取。
- 不适合作为公网多用户产品的最终安全方案。

如果未来要公开部署，应重新设计 Auth、RLS、Storage policy，并考虑改为私有 bucket + signed URL。
