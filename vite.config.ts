import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig, loadEnv } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';
import { compression } from 'vite-plugin-compression2';

function sitemapPlugin() {
  return {
    name: 'generate-sitemap',
    buildStart() {
      try {
        const domain = 'https://gustavosouza.dev.br';
        const constantsPath = path.resolve(__dirname, './src/constants.ts');
        if (!fs.existsSync(constantsPath)) return;

        const content = fs.readFileSync(constantsPath, 'utf-8');
        const blogPostsMatch = content.match(/export const BLOG_POSTS: BlogPost\[\] = \[\s*([\s\S]*?)\s*\];/);
        const postIds: string[] = [];
        
        if (blogPostsMatch) {
          const postsSection = blogPostsMatch[1];
          const idMatches = [...postsSection.matchAll(/id:\s*['"`]([^'"`]+)['"`]/g)];
          idMatches.forEach(match => {
            postIds.push(match[1]);
          });
        }

        const sections = [
          'experience',
          'projects',
          'tech',
          'education',
          'certifications',
          'courses',
          'blog'
        ];

        const currentDate = new Date().toISOString().split('T')[0];

        let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
        xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

        // Home Page
        xml += `  <url>\n`;
        xml += `    <loc>${domain}/</loc>\n`;
        xml += `    <lastmod>${currentDate}</lastmod>\n`;
        xml += `    <changefreq>daily</changefreq>\n`;
        xml += `    <priority>1.0</priority>\n`;
        xml += `  </url>\n`;

        // Tab Sections
        sections.forEach(section => {
          xml += `  <url>\n`;
          xml += `    <loc>${domain}/?tab=${section}</loc>\n`;
          xml += `    <lastmod>${currentDate}</lastmod>\n`;
          xml += `    <changefreq>weekly</changefreq>\n`;
          xml += `    <priority>0.8</priority>\n`;
          xml += `  </url>\n`;
        });

        // Blog Posts
        postIds.forEach(id => {
          xml += `  <url>\n`;
          xml += `    <loc>${domain}/?post=${id}</loc>\n`;
          xml += `    <lastmod>${currentDate}</lastmod>\n`;
          xml += `    <changefreq>weekly</changefreq>\n`;
          xml += `    <priority>0.7</priority>\n`;
          xml += `  </url>\n`;
        });

        xml += `</urlset>\n`;

        const publicDir = path.resolve(__dirname, './public');
        if (!fs.existsSync(publicDir)) {
          fs.mkdirSync(publicDir, { recursive: true });
        }
        fs.writeFileSync(path.resolve(publicDir, 'sitemap.xml'), xml, 'utf-8');
        console.log('✓ Dynamic sitemap.xml generated in public/');
      } catch (err) {
        console.error('Error generating sitemap:', err);
      }
    }
  };
}

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  const isAnalyze = process.env.ANALYZE === 'true';

  return {
    plugins: [
      react(),
      tailwindcss(),
      sitemapPlugin(),
      compression({
        algorithms: ['gzip', 'brotliCompress'],
        threshold: 1400,
        deleteOriginalAssets: false,
      }),
      isAnalyze && visualizer({
        open: false,
        filename: 'dist/stats.html',
        gzipSize: true,
        brotliSize: true,
      }),
    ].filter(Boolean),
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
              if (id.includes('html2pdf') || id.includes('jspdf') || id.includes('html2canvas')) return 'vendor-pdf';
              if (id.includes('motion') || id.includes('lucide-react')) return 'vendor-ui';
              if (id.includes('react')) return 'vendor-react';
              return 'vendor';
            }
          },
        },
      },
      chunkSizeWarningLimit: 1000,
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
