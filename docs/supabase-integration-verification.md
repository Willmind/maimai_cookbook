# Supabase 集成验收记录

本文记录无登录 Supabase 集成阶段的最终验收结果。

## 自动化验证

- `openspec validate --all`：通过，`9 passed, 0 failed`。
- `npm test`：通过，`15 test files passed / 39 tests passed`。
- `npm run build`：通过，`vue-tsc -b` 与 `vite build` 成功。

## Supabase 后台配置

- 已执行 `supabase/migrations/202604290001_initial_schema.sql`，创建 `recipes` 和 `cooking_logs`。
- 已创建 public bucket：`recipe-covers`。
- 已创建 public bucket：`cooking-log-photos`。
- 已执行 `supabase/migrations/202604290002_storage_policies.sql`，允许无登录个人 MVP 阶段的 Storage 上传、读取、替换和删除。

## 手动验收结果

在 `VITE_DATA_SOURCE=supabase` 下已验证：

- 可以创建菜谱。
- 创建后可以进入菜谱详情。
- 可以从菜谱详情记录一次做饭。
- 做饭记录可以保存并回到菜谱详情展示。
- 菜谱封面可以上传并展示。
- 做饭记录照片可以上传并展示。
- 图片上传前压缩有效，同一张测试图从约 2 秒降到约 861ms。

## 已知后续优化

验收过程中发现的一些非阻塞体验问题，后续单独整理为优化清单。本阶段不把这些问题混入 Supabase 集成收尾。

