# Phase 7 — MVP 验收与查漏（本地 Mock）

本文用于完成 `docs/superpowers/plans/2026-04-28-vue-mock-mvp.md` 的 Phase 7：在接入 Supabase 前，用可复现的证据对齐 MVP 验收标准，并记录缺口。

## 已完成的自动化验证（证据）

- **单元测试**

```bash
npm test
```

结果（2026-04-28）：`9 passed / 20 passed`，exit code 0。

- **类型检查 + 生产构建**

```bash
npm run build
```

结果（2026-04-28）：`vue-tsc -b` + `vite build` 成功，exit code 0。

- **开发服务器启动**

```bash
npm run dev -- --host 127.0.0.1 --port 5173
```

说明：若端口被占用，Vite 会自动切换端口；本次启动后显示 `Local: http://127.0.0.1:5174/`。

## MVP 验收标准对齐（`docs/product-mvp.md` 第 9 节）

- **只填写菜名，也可以成功创建菜谱**：✅
  - 证据：`src/views/NewRecipeView.test.ts` 覆盖“只填菜名可创建并跳转详情”。

- **新建菜谱默认加入想做清单，用户可以取消**：✅
  - 证据：`src/views/NewRecipeView.test.ts` 断言默认 `wantToMake = true`；
  - 交互：`src/views/NewRecipeView.vue` 中 `wantToMake` 绑定复选框，可取消。

- **没有菜谱时，不能记录一次做饭**：✅
  - 证据：`src/views/NewCookingLogView.vue` 若 `recipe` 未加载到则显示“没有找到这道菜，暂时不能记录一次。”且不渲染表单。

- **用户只能从菜谱详情进入记录一次**：✅（按“无全局入口”的口径验收）
  - 证据（UI 入口）：`src/views/RecipeDetailView.vue` 提供“记一次”按钮，路由为 `/recipes/:id/logs/new`。
  - 证据（无全局入口）：`src/App.vue` 顶栏只有“全部菜谱 / 记一道菜”，没有“全局记一次/新增做饭记录”的入口。
  - 备注：未做“禁止手动直达 URL”的路由级强约束；按当前验收口径不需要。

- **记录一次页面中的菜名是只读的**：✅
  - 证据：`src/views/NewCookingLogView.test.ts` 校验 `readonly` 属性与值；
  - UI：`src/views/NewCookingLogView.vue` 使用 `<input readonly />`。

- **首页最近做过展示的是做饭记录，不是菜谱**：✅
  - 证据：`src/views/HomeView.test.ts` 覆盖“最近做过”包含做饭记录文案（例如记录 note）。

- **首页想做展示的是菜谱，不是做饭记录**：✅
  - 证据：`src/views/HomeView.test.ts` 覆盖“想做”区域包含菜谱。

- **全部菜谱页可以通过搜索和 5 个轻量筛选找到菜谱**：✅
  - 证据：`src/views/AllRecipesView.test.ts` 覆盖筛选 chips 与筛选行为；
  - UI：`src/views/AllRecipesView.vue` 有搜索框 + 5 个 filter。

- **搜索结果先展示菜谱，再展示做饭记录**：✅
  - 证据：`src/views/HomeView.test.ts` 校验“菜谱”出现在“做饭记录”之前；`src/features/search/search.test.ts` 也验证了排序逻辑。

- **菜谱详情可看到来源、简介、想做状态、熟悉度、食材、做法、下次注意和做饭记录**：✅
  - 证据：`src/views/RecipeDetailView.test.ts` 覆盖详情渲染与记录列表存在；
  - UI：`src/views/RecipeDetailView.vue` 包含 source/description/标签（熟悉度、想做）、ingredients/method、nextNote（note band）、做饭记录时间线。

- **做饭记录有照片时显示缩略图，没有照片时不显示空图框**：✅
  - 证据：`src/views/RecipeDetailView.vue` 中 `v-if="log.photoPath"` 才渲染 `.timeline-photo`，不会出现空占位。

- **菜谱封面和做饭记录照片都只允许 1 张，并支持更换和删除**：✅（UI 状态机层面）
  - 证据：`src/components/SingleImageUpload.test.ts`、`src/views/NewRecipeView.test.ts`、`src/views/NewCookingLogView.test.ts` 覆盖“最多 1 张 / 上传成功 / 删除回空态”等状态。
  - 备注：Phase 6/7 不接 Supabase Storage，当前为本地 UI 状态模拟。

## 响应式人工走查清单（桌面 + 390×844）

> 说明：自动化环境未稳定完成浏览器走查，因此这里提供可快速复现的人工 checklist。
>
> 已尝试在自动化浏览器中访问本机 dev server（例如 `http://127.0.0.1:5180/`），但自动化进程无法稳定产出“页面证据级别”的走查结果（典型原因是：自动化运行环境与本机 `localhost/127.0.0.1` 网络语境隔离；同时自动化环境也无法直接读取仓库内的 `docs/product-mvp.md` 作为走查输入）。因此 Phase 7 的“浏览器验收”暂以人工 checklist 作为证据来源。

1. **首页 `/`**
   - 搜索框、两列布局（最近做过 / 想做）在移动端应变为单列且无横向滚动条。
   - 搜索结果出现后：两组（菜谱/做饭记录）顺序正确，卡片不溢出。
2. **全部菜谱 `/recipes`**
   - filter chips 在移动端可换行，不遮挡点击；列表卡片无溢出。
3. **新建菜谱 `/recipes/new`**
   - 表单在移动端滚动正常，主按钮始终可点；上传组件按钮布局不挤压。
4. **菜谱详情 `/recipes/:id`**
   - 头图区域与按钮行在窄屏不重叠；时间线卡片在窄屏不溢出。
5. **记录一次 `/recipes/:id/logs/new`**
   - “这次做的是”只读输入框在移动端不溢出；保存按钮可点。

## 本阶段记录的 gap（接 Supabase 前）

- （无）“只能从详情页进入记录一次”的路由级强约束：已确认验收口径为“无全局入口”，因此不作为 gap。
- **端口占用提示**：开发时端口可能自动切换，建议在 README 或开发流程里写明。

