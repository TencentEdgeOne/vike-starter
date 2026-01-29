# Vike Starter

这是一个基于 [Vike](https://vike.dev) 和 [React](https://react.dev) 的示例项目，用来展示服务端渲染（SSR）、HTML 流式传输（Streaming）以及 API 路由能力。这个模板演示了 Vike 的文件路由、与 EdgeOne Pages 的适配等特性。

## 📚 示例特性一览

该项目包含若干示例页面，用来演示不同的 Vike 能力：

### Pages

- **`/`** - 首页，包含 Hero 区、导航胶囊按钮，以及服务端渲染的耗时信息
- **`/ssg`** - 静态站点生成（SSG）示例，页面在构建时预渲染，并展示构建时间
- **`/interface`** - 交互示例页面，包含带类型定义的 `/api/hello` API 路由和服务端数据获取
- **`/stream`** - HTML 流式传输示例，使用 React Suspense 和模拟的慢路径区块

### 主要特性

- ✨ **Vike + React SSR** - 基于文件路由的服务端渲染
- 🔄 **HTML Streaming** - 使用 React Suspense 的流式响应演示
- 🛣️ **API Routes** - 使用共享 TypeScript 类型的简单 JSON 接口
- 🎨 **现代化 UI** - 使用 Tailwind CSS、渐变聚光灯背景和发光卡片

## 🧞 常用命令

以下所有命令都需要在项目根目录的终端中执行：

| Command         | 说明                                      |
| :-------------- | :---------------------------------------- |
| `npm install`   | 安装依赖                                  |
| `npm run dev`   | 启动本地开发服务器，地址 `localhost:3000` |
| `npm run build` | 构建生产环境应用到 `./dist/`              |
| `npm run start` | 启动生产环境服务器（Node/Express）        |

Vike 会在 `pages/` 目录中查找 `+Page.tsx` 等路由相关文件。每个页面会根据文件名和 Vike 约定暴露为对应路由。

`components/` 目录本身没有特殊约定，我们在这里放了可复用的 React 组件（例如 Hero 区）。

任何静态资源（如图片）可以放在 `public/` 目录（如果你创建了该目录）。

## 🛠️ 技术栈

- [Vike](https://vike.dev) - 文件路由与 SSR 框架
- [React](https://react.dev) - UI 库
- [Tailwind CSS](https://tailwindcss.com) - 样式方案
- [TypeScript](https://www.typescriptlang.org) - 类型化 JavaScript
- [Vite](https://vitejs.dev) - 开发服务器与打包工具
- [EdgeOne Pages](https://edgeone.ai/pages) - 部署平台

## 📖 了解更多

- [Vike 文档](https://vike.dev)
- [React 文档](https://react.dev)
- [EdgeOne Pages 文档](https://edgeone.ai/pages)

## Deploy

一键将该项目部署到 EdgeOne Pages：

[![Deploy with EdgeOne Pages](https://cdnstatic.tencentcs.com/edgeone/pages/deploy.svg)](https://console.cloud.tencent.com/edgeone/pages/new?from=childtom&template=vike-template)

更多模板： [EdgeOne Pages Templates](https://edgeone.ai/pages/templates)
