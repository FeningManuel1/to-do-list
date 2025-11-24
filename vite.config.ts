import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const base = '/to-do-list/'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    {
      name: 'html-transform',
      transformIndexHtml(html) {
        return html.replace(
          /href="\.\/favicon-32x32\.png"/,
          `href="${base}favicon-32x32.png"`
        )
      }
    }
  ],
    base: base,
})
