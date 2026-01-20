import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ''); 
  const apiTarget = env.VITE_API || 'http://localhost:8080';

  return {
    plugins: [react()],
    base: '/',
    server: {
      host: true,          
      strictPort: true,
      proxy: {
        '/api': {
          target: apiTarget,
          changeOrigin: true,
          secure: false,
        },
        '/hello': {
          target: apiTarget,
          changeOrigin: true,
          secure: false,
        },
      },
    },
    build: { outDir: 'dist' },
  };
});
