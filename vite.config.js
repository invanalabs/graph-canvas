// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'graph-canvas',
      fileName: 'graph-canvas',
    },
    rollupOptions: {
      external: ['vue'],
      input: {
        main: resolve(__dirname, 'src/index.ts')
      },
      output: {
        dir: 'dist'
      }
    }
  },
  plugins: [
    {
      name: 'ignore-stories',
      resolveId(id) {
        if (id.includes('.stories.') || id.includes('/stories/')) {
          return false;
        }
      }
    },
    {
      name: 'raw-loader',
      transform(code, id) {
        if (id.endsWith('?raw')) {
          return `export default ${JSON.stringify(code)}`;
        }
      }
    }
  ]
})

