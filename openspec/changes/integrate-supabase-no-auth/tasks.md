# 任务：无登录接入 Supabase

## 1. Supabase Schema

- [x] 创建 `recipes` SQL migration。
- [x] 创建 `cooking_logs` SQL migration。
- [x] 为菜谱熟悉度和做饭结果增加枚举 check constraint。
- [x] 为 `recipes.updated_at` 增加自动更新时间处理。
- [x] 记录无登录/RLS 假设：当前仅用于个人本地 MVP。

## 2. Supabase Storage

- [x] 创建 `recipe-covers` bucket。
- [x] 创建 `cooking-log-photos` bucket。
- [x] 定义单图文件路径规则。
- [x] 记录无登录 MVP 使用 public bucket 的取舍。

## 3. Client And Environment

- [x] 安装 `@supabase/supabase-js`。
- [x] 新增 Supabase client 模块。
- [x] 新增 `.env.example`，包含 `VITE_DATA_SOURCE`、`VITE_SUPABASE_URL`、`VITE_SUPABASE_ANON_KEY`。
- [x] 让 repository selection 使用 `VITE_DATA_SOURCE`。

## 4. Supabase Repositories

- [x] 新增 recipe row/domain mapper。
- [x] 新增 cooking log row/domain mapper。
- [x] 实现 Supabase recipe repository。
- [x] 实现 Supabase cooking log repository。
- [x] 保持 mock repository 作为默认本地 fallback。

## 5. Image Upload Flow

- [x] 把菜谱封面 mock 上传替换为真实单图选择/上传。
- [x] 把做饭记录照片 mock 上传替换为真实单图选择/上传。
- [x] 支持新图上传成功后再替换旧图。
- [x] 支持删除 Storage 文件并清空本地表单状态。
- [x] 在当前 placeholder 位置展示已存储图片 URL。

## 6. Verification

- [ ] 运行 `openspec validate --all`。
- [ ] 运行 `npm test`。
- [ ] 运行 `npm run build`。
- [ ] 验证 mock 模式仍可用。
- [ ] 验证 Supabase 模式可以创建和查看菜谱。
- [ ] 验证 Supabase 模式可以创建和查看做饭记录。
- [ ] 验证菜谱封面上传、更换、删除。
- [ ] 验证做饭记录照片上传、更换、删除。
