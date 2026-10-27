import { defineConfig } from 'vite';
export default defineConfig({ base: '/elysia-experience/', server: { host: '127.0.0.1', port: 5173, strictPort: true }, build: { rollupOptions: { onwarn(warning, warn) { if (warning.code === 'MODULE_LEVEL_DIRECTIVE' && warning.message.includes('use client')) return; warn(warning); } } } });
