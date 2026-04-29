# 设计：无登录接入 Supabase

## 架构

应用继续保留当前数据边界：

- View 调用 `RecipeRepository` 和 `CookingLogRepository`。
- Repository 选择逻辑集中在 `src/data/repositories/index.ts`。
- Mock repository 保留为本地 fallback。
- 当 `VITE_DATA_SOURCE=supabase` 时选择 Supabase repository。

这样可以避免重写页面逻辑，也能把 Supabase 细节隔离在数据层。

## 数据源选择

使用环境变量：

- `VITE_DATA_SOURCE=mock | supabase`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

当开启 Supabase 模式但缺少 URL 或 anon key 时，应用应给出清晰配置错误，不要静默 fallback。

## Schema

创建两张表：

- `recipes`
- `cooking_logs`

`cooking_logs.recipe_id` 引用 `recipes.id`，删除菜谱时级联删除对应做饭记录。`familiarity` 和 `result` 使用 check constraint 限制为 MVP 枚举值。

## Storage

创建两个 bucket：

- `recipe-covers`
- `cooking-log-photos`

无登录 MVP 可以先使用 public bucket。这适合个人私用和本地开发，但在补 Auth/RLS 前，不应把它当成生产级公开安全方案。

## 数据映射

Supabase row 使用 snake_case 字段，Vue domain type 使用 camelCase 字段。Supabase repository 应提供显式 mapper 函数，让应用其它部分不感知数据库字段命名。

## 测试

单元测试默认继续使用 mock repository。Supabase repository 测试优先覆盖 mapper 和 repository contract，不强依赖真实 Supabase 项目。真实 Supabase 创建、查看、图片上传流程通过手动集成验收确认。
