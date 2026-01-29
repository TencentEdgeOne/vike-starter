# Vike Starter

This is a [Vike](https://vike.dev) + [React](https://react.dev) project demonstrating server-side rendering, HTML streaming, and dynamic routing. This template showcases Vike file-based routing, an EdgeOne Pages adapter, and more.

## 📚 Features Demonstrated

This project includes several example pages that demonstrate different Vike capabilities:

### Pages

- **`/`** - Homepage with hero layout, navigation pills, and server-rendered timing info
- **`/ssg`** - Static site generation example with prerendered HTML and build-time data
- **`/posts/@category/@slug`** - Dynamic routing example with two-level URL parameters (e.g. `/posts/tech/hello-vike`)
- **`/stream`** - Streaming HTML example using React Suspense and a simulated slow section

### Key Features

- ✨ **Vike + React SSR** - File-based routing with server-side rendering
- 🔄 **HTML streaming** - Streaming response demo using React Suspense
- 🛣️ **Dynamic routing** - Nested URL parameters with `@category/@slug` pattern
- 🎨 **Modern UI** - Tailwind CSS, animated spotlight hero, and glowing cards

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command         | Action                                      |
| :-------------- | :------------------------------------------ |
| `npm install`   | Installs dependencies                       |
| `npm run dev`   | Starts local dev server at `localhost:3000` |
| `npm run build` | Build your production app to `./dist/`      |
| `npm run start` | Start the production server (Node/Express)  |

Vike looks for `+Page.tsx` and other route files in the `pages/` directory. Each page is exposed as a route based on its file name and Vike conventions.

There's nothing special about `components/`, but that's where we like to put shared React components like the hero section.

Any static assets, like images, can be placed in the `public/` directory.

## 🛠️ Technologies Used

- [Vike](https://vike.dev) - File-based routing and SSR framework
- [React](https://react.dev) - UI library
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [TypeScript](https://www.typescriptlang.org) - Typed JavaScript
- [Vite](https://vitejs.dev) - Dev server and bundler
- [EdgeOne Pages](https://edgeone.ai/pages) - Deployment platform

## 📖 Learn More

- [Vike Documentation](https://vike.dev)
- [React Documentation](https://react.dev)
- [EdgeOne Pages Documentation](https://edgeone.ai/pages)

## Deploy

Deploy this project to EdgeOne Pages with one click:

[![Deploy with EdgeOne Pages](https://cdnstatic.tencentcs.com/edgeone/pages/deploy.svg)](https://edgeone.ai/pages/new?from=github&template=vike-template)

More Templates: [EdgeOne Pages Templates](https://edgeone.ai/pages/templates)
