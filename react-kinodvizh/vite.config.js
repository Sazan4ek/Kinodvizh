import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    preview: {
      host: true,
      strictPort: true,
      port: 5173,
      watch: {
        usePolling: true,
      },
      allowedHosts: true
    },
    define: {
      'process.env': env
    },
  };
});
