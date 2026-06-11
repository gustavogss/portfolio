import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  return {
    plugins: [
      react(),
      tailwindcss(),
      visualizer({
        open: false,
        filename: 'dist/stats.html',
        gzipSize: true,
        brotliSize: true,
      }),
    ],

    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },

    build: {
      target: 'esnext',
      minify: 'esbuild',
      cssMinify: true,

      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('firebase')) return 'vendor-firebase';

              if (
                id.includes('html2pdf') ||
                id.includes('jspdf') ||
                id.includes('html2canvas')
              ) {
                return 'vendor-pdf';
              }

              if (
                id.includes('motion') ||
                id.includes('lucide-react')
              ) {
                return 'vendor-ui';
              }

              if (id.includes('react')) {
                return 'vendor-react';
              }

              return 'vendor';
            }
          },
        },
      },

      chunkSizeWarningLimit: 1000,
    },

    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});