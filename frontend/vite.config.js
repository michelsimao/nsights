import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const here = path.dirname(fileURLToPath(import.meta.url));
// O Design System vive na raiz do repo, intocado; o app o lê por este alias.
const dsRoot = path.resolve(here, '..');

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@ds': dsRoot },
    dedupe: ['react', 'react-dom'],
  },
  server: {
    port: 5173,
    fs: { allow: [dsRoot] },
    proxy: {
      '/api': process.env.VITE_API_PROXY ?? 'http://localhost:8000',
    },
  },
});
