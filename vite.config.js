import { resolve } from 'path'
import { defineConfig } from 'vite'
import vsharp from 'vite-plugin-vsharp';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      }, external: [
        "sharp"
      ]
    },
  },
  plugins: [
    vsharp({
      scale: 0.8
    }),
  ],
})
