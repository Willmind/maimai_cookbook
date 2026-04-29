# 设计说明：ui-page-level-loading-v1

## 核心目标
用户点击进入页面后，在数据请求完成之前：
1. 不展示“没有找到…”的误导性文案
2. 给出明确的“加载中…”反馈
3. 请求完成后再展示详情/表单或“未找到”

## 方案概述
引入 `src/components/PageLoadingOverlay.vue` 作为统一的页面级 loading 呈现。

各页面新增一个 `loading: Ref<boolean>`：
- 初始值：`true`
- 请求成功/失败都在 `finally` 中：`loading = false`

模板渲染逻辑统一为三态：
- `v-if="loading"`：显示 `PageLoadingOverlay`
- `v-else-if="recipe/log 存在"`：显示原有详情/表单
- `v-else`：显示原有“没有找到…”文案

## 可访问性
- loading 容器使用 `role="status"` 与 `aria-live="polite"`，让读屏在可感知状态变化时获得提示。
- 旋转样式遵循 `prefers-reduced-motion: reduce`，在减弱动效偏好下停止动画。

