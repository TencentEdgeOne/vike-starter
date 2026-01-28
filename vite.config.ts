import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import vike from 'vike/plugin'
import edgeone from '@edgeone/vite'

export default defineConfig({
  plugins: [
    react(), vike(), edgeone()]
})

