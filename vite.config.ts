import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Keep the lazy-loaded Stack icons out of the initial JavaScript bundle.
    assetsInlineLimit: (filePath) => filePath.replaceAll('\\', '/').includes('/src/assets/SKILL_logo/') ? false : undefined,
  },
})
