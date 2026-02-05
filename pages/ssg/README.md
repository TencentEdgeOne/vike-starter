# SSG 页面（Vue 实现）

- **内容与交互**：由 Vue 实现（`SsgPage.vue`）。
- **为什么有 `+Page.tsx`**：当前项目用 Vike + React 作为默认框架，根布局和路由是 React。Vike 要求每个路由有一个「页面组件」；在未为 `/ssg` 单独配置 Vue 渲染器的情况下，这个组件只能是 React。因此 `+Page.tsx` 只做两件事：
  1. 把构建时/服务端渲染好的 Vue HTML 挂到 `#ssg-vue-root`；
  2. 在客户端执行 Vue 的 hydration（`mountSsgVue.ts`）。

这样 SSG 的**可见内容与逻辑**全部在 Vue（`SsgPage.vue`、`ssgCards.ts` 等），React 仅作为壳层，不参与业务 UI。

若希望「整站 /ssg 完全不用 React」，需要为 `/ssg` 配置独立的 Vue renderer（多 renderer 结构），并单独做 Vue 的 layout/入口，当前模板未采用该方案。
