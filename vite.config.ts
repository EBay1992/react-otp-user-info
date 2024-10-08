import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isDevelopment = mode === "development";

  return (
    {
      plugins: [react()],
      server: {
        port: 3000, // Default Port
        headers: {
          'API-Key': env.VITE_API_KEY,
        },
        proxy: isDevelopment ? {  // Proxy only in Development
          "/api": {
            target: env.VITE_API_URL,
            changeOrigin: true,
          },
        } : {},
        cors: true, // Disable CORS handling by Vite
      },
      resolve: {
        alias: {
          '@src': resolve(__dirname, 'src'),
          '@components': resolve(__dirname, 'src/components'),
          '@features': resolve(__dirname, 'src/features'),
          '@hooks': resolve(__dirname, 'src/hooks'),
          '@utils': resolve(__dirname, 'src/utils'),
          '@api': resolve(__dirname, 'src/api'),
        },
      },
    }
  );
});
