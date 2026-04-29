# Supabase 无登录集成设计

## 目标

把麦麦手记从本地 mock 数据切换到真实 Supabase 持久化，同时保持个人应用、无登录的 MVP 范围。第一版 Supabase 集成应保留当前 Vue 页面行为和 repository 边界，再逐步加入真实数据库读写和单图 Storage 上传。

## 范围

包含：

- 为 `recipes` 和 `cooking_logs` 创建 Supabase 表。
- 为菜谱封面和做饭记录照片创建 Supabase Storage bucket。
- 支持通过环境变量选择数据源：mock 或 Supabase。
- 在现有 repository interface 后面实现 Supabase repository。
- 为菜谱封面和做饭记录照片实现真实单图上传、更换、删除。
- 验证 schema、repository、创建/查看流程。

不包含：

- 登录、注册或 Supabase Auth。
- `user_id` 归属字段。
- 多用户 RLS 策略设计。
- 公开分享或协作。
- 菜谱或做饭记录多图上传。

## 推荐方案

使用“无登录 Supabase + repository 可切换”的方案：

- `VITE_DATA_SOURCE=mock` 时继续使用本地 mock repository。
- `VITE_DATA_SOURCE=supabase` 时使用 Supabase repository。
- 视图和组件仍然从 repository 边界读取 `recipeRepository` 和 `cookingLogRepository`。

这样可以保持现有 MVP 稳定，同时小步引入真实持久化。如果 Supabase 凭证、网络或 schema 尚未准备好，也能安全回退到 mock 模式。

## 数据模型

### `recipes`

- `id uuid primary key default gen_random_uuid()`
- `name text not null`
- `source text`
- `description text`
- `cover_image_path text`
- `ingredients text`
- `method text`
- `next_note text`
- `familiarity text not null default 'new'`
- `want_to_make boolean not null default true`
- `tags text[] not null default '{}'`
- `created_at timestamptz not null default now()`
- `updated_at timestamptz not null default now()`

约束：

- `familiarity in ('new', 'done', 'frequent')`
- 第一版不强制菜名唯一。

### `cooking_logs`

- `id uuid primary key default gen_random_uuid()`
- `recipe_id uuid not null references recipes(id) on delete cascade`
- `cooked_at date not null default current_date`
- `result text`
- `note text`
- `changes text`
- `next_note text`
- `photo_path text`
- `created_at timestamptz not null default now()`

约束：

- `result is null or result in ('good', 'ok', 'failed')`
- 做饭记录必须关联一个已存在的菜谱。

## Storage

创建两个 public bucket 供无登录 MVP 使用：

- `recipe-covers`
- `cooking-log-photos`

文件路径应尽量避免冲突：

- 菜谱封面：`recipes/{recipeId}/{timestamp}-{safeFileName}`
- 做饭记录照片：`cooking-logs/{logId}/{timestamp}-{safeFileName}`

因为当前应用不做登录，所以 bucket 在此阶段使用 public。正式公网部署前，需要重新评估 Supabase Auth 和 RLS。

## 前端架构

新增 Supabase client 模块：

- 读取 `VITE_SUPABASE_URL`。
- 读取 `VITE_SUPABASE_ANON_KEY`。
- 当 Supabase 模式开启但缺少凭证时，抛出清晰的配置错误。

新增 Supabase repository：

- `createSupabaseRecipeRepository`
- `createSupabaseCookingLogRepository`

保持显式数据映射：

- Supabase row 使用 snake_case。
- Vue domain type 使用 camelCase。
- mapper 函数负责 row/input 与 domain type 之间的转换。

## 图片流程

当前 `SingleImageUpload` 组件已经有合适状态：empty、uploading、uploaded、failed。Supabase 阶段应把 mock 按钮行为替换为真实文件选择和上传编排。

创建流程：

1. 用户选择一张图片。
2. UI 进入 uploading。
3. 上传成功后，把 Supabase Storage path 存入本地表单状态。
4. 保存菜谱或做饭记录时写入 `cover_image_path` 或 `photo_path`。

更换/删除流程：

- 更换图片时先上传新图片，成功后再移除旧 Storage object。
- 删除图片时移除当前 Storage object，并清空本地表单状态。

## 安全说明

这是有意控制范围的无登录个人 MVP。这意味着：

- 适合本地开发和个人私用。
- 不适合作为公开多用户应用直接部署。
- 公开 Storage bucket 和宽松表访问策略在公网部署前必须重新设计。

## 验收标准

Supabase 集成完成时应满足：

- `openspec validate --all` 通过。
- `npm test` 通过。
- `npm run build` 通过。
- `VITE_DATA_SOURCE=mock` 时，当前 MVP 行为仍然可用。
- `VITE_DATA_SOURCE=supabase` 时，用户可以创建菜谱、查看菜谱、创建做饭记录，并在菜谱详情看到记录。
- 菜谱封面可以上传、更换、删除、展示。
- 做饭记录照片可以上传、更换、删除、展示。
