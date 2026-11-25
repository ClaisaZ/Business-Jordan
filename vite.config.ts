import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// Milestone C - CDN: in production builds, JS/CSS/images load from jsDelivr
// (served from this public GitHub repo at the "milestone-c" tag).
// In dev (npm run dev), assets still load locally from "/".
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build'
    ? 'https://cdn.jsdelivr.net/gh/ClaisaZ/Business-Jordan@milestone-c/dist/'
    : '/',
}))
