# 变更提案：ui-form-cancel-back-floating-v1

## 为什么
当前“新建/编辑菜谱”和“新建/编辑做饭记录”页面底部只有“保存”按钮，缺少“取消/返回上一页”的显式入口。
同时，非首页页面缺少一个像 iOS 返回键那样的悬浮“返回”按钮，用户需要依赖浏览器返回或右上角返回，体验不够直观。

## 变更内容
- 在以下页面的底部按钮区域增加“取消”按钮（位于保存按钮左侧）：
  - `NewRecipeView` / `EditRecipeView`
  - `NewCookingLogView` / `EditCookingLogView`
  - 行为：点击取消返回上一页。

## 影响范围
- 前端页面与组件：新增/修改页面按钮与悬浮按钮。
- 新增 OpenSpec change 文档并走验证流程。

