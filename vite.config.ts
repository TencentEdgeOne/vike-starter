import path from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import vue from '@vitejs/plugin-vue'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from 'vite'
import vike from 'vike/plugin'
import edgeone from '@edgeone/vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    react(),
    vue(),
    svelte(),
    vike(),
    edgeone({ serverWrapper: 'vike' })
  ],
  resolve: {
    alias: [
      // Subpath first so "vue/server-renderer" doesn't become vueFile + "/server-renderer"
      {
        find: 'vue/server-renderer',
        replacement: path.resolve(__dirname, 'node_modules/@vue/server-renderer/dist/server-renderer.esm-bundler.js')
      },
      {
        find: 'vue',
        replacement: path.resolve(__dirname, 'node_modules/vue/dist/vue.runtime.esm-bundler.js')
      },
      {
        find: '@vue/server-renderer',
        replacement: path.resolve(__dirname, 'node_modules/@vue/server-renderer/dist/server-renderer.esm-bundler.js')
      }
    ]
  },
  ssr: {
    noExternal: ['vue', '@vue/server-renderer', 'svelte']
  }
})

