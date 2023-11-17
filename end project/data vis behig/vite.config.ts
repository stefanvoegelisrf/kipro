import { defineConfig } from 'vite';

export default defineConfig({
    base: './',
    server: {
        open: true,
        proxy: {
            '/api': {
              target: 'https://opentransportdata.swiss/de/api/3/action/',
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/api/, ''),
            },
          },
    },
    build: {
        outDir: 'dist'
    }
});