import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import fs from 'fs'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss()
  ],
  server: {
    host: 'app.arch-pc.ru',
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'ssl/app.arch-pc.ru/app.arch-pc.ru-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'ssl/app.arch-pc.ru/app.arch-pc.ru.pem'))
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
